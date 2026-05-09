const Database = require("better-sqlite3");
const fs = require("node:fs");
const path = require("node:path");

const dbPath = path.join(process.cwd(), "data", "skillshop.db");
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new Database(dbPath);

db.exec(`
  pragma foreign_keys = off;

  drop table if exists visual_templates;
  drop table if exists template_skills;
  drop table if exists skill_relations;
  drop table if exists skills;
  drop table if exists themes;
  drop table if exists projects;
  drop table if exists talks;
  drop table if exists metrics;

  pragma foreign_keys = on;

  create table themes (
    id integer primary key autoincrement,
    name text not null,
    title text not null,
    accent text not null,
    template text not null,
    tags text not null,
    order_index integer not null
  );

  create table skills (
    id integer primary key autoincrement,
    title text not null,
    source_name text not null,
    source_url text not null,
    category text not null,
    headline text not null,
    visual_type text not null,
    code text not null,
    stats text not null,
    color text not null,
    template text not null,
    theme_id integer not null,
    order_index integer not null,
    foreign key (theme_id) references themes(id)
  );

  create table visual_templates (
    id integer primary key autoincrement,
    title text not null,
    theme text not null,
    layout text not null,
    skill_mix text not null,
    preview text not null,
    accent text not null,
    order_index integer not null
  );

  create table skill_relations (
    id integer primary key autoincrement,
    source_skill_id integer not null,
    target_skill_id integer not null,
    relation text not null,
    strength integer not null,
    order_index integer not null,
    foreign key (source_skill_id) references skills(id),
    foreign key (target_skill_id) references skills(id)
  );

  create table template_skills (
    id integer primary key autoincrement,
    template_id integer not null,
    skill_id integer not null,
    role text not null,
    order_index integer not null,
    foreign key (template_id) references visual_templates(id),
    foreign key (skill_id) references skills(id)
  );

  create table projects (
    id integer primary key autoincrement,
    name text not null,
    idea text not null,
    stack text not null,
    status text not null,
    progress integer not null,
    template_id integer not null,
    skill_path text not null,
    next_task text not null,
    deliverable text not null,
    owner text not null,
    order_index integer not null,
    foreign key (template_id) references visual_templates(id)
  );

  create table talks (
    id integer primary key autoincrement,
    date text not null,
    title text not null,
    speaker text not null,
    tag text not null,
    order_index integer not null
  );

  create table metrics (
    id integer primary key autoincrement,
    label text not null,
    value text not null,
    order_index integer not null
  );
`);

const insertTheme = db.prepare(`
  insert into themes (name, title, accent, template, tags, order_index)
  values (@name, @title, @accent, @template, @tags, @order_index)
`);

const themes = [
  {
    name: "AI SaaS",
    title: "AI 工作台",
    accent: "orange",
    template: "Hero / Prompt Panel / Stream Preview",
    tags: "AI,SaaS,Agent",
    order_index: 1
  },
  {
    name: "Developer Tool",
    title: "开发者工具",
    accent: "cyan",
    template: "Docs / Web Preview / Changelog",
    tags: "React,Next.js,DX",
    order_index: 2
  },
  {
    name: "Data Product",
    title: "数据仪表盘",
    accent: "green",
    template: "Metric Grid / Graph Map / Activity",
    tags: "Dashboard,Graph,Metrics",
    order_index: 3
  },
  {
    name: "Creative Studio",
    title: "作品集工作室",
    accent: "rose",
    template: "Gallery / Case Study / Motion",
    tags: "Portfolio,Motion,Visual",
    order_index: 4
  },
  {
    name: "Learning Hub",
    title: "学习社区",
    accent: "cyan",
    template: "Skill Map / Workshop / Talk",
    tags: "Learning,Community,Workshop",
    order_index: 5
  }
];

const themeIds = new Map();
for (const theme of themes) {
  const result = insertTheme.run(theme);
  themeIds.set(theme.name, Number(result.lastInsertRowid));
}

const insertSkill = db.prepare(`
  insert into skills
    (title, source_name, source_url, category, headline, visual_type, code, stats, color, template, theme_id, order_index)
  values
    (@title, @source_name, @source_url, @category, @headline, @visual_type, @code, @stats, @color, @template, @theme_id, @order_index)
`);

const skillRows = [
  {
    title: "impeccable",
    source_name: "pbakaus/impeccable",
    source_url: "https://github.com/pbakaus/impeccable",
    category: "设计系统",
    headline: "高保真设计原则",
    visual_type: "Design Atlas",
    code: "design.check(layout, color, type)",
    stats: "GitHub Skill",
    color: "rose",
    template: "空间 / 色彩 / 排版 / 响应式",
    theme_id: themeIds.get("Creative Studio"),
    order_index: 1
  },
  {
    title: "vercel-react-best-practices",
    source_name: "vercel-labs/agent-skills",
    source_url: "https://raw.githubusercontent.com/vercel-labs/agent-skills/main/skills/react-best-practices/SKILL.md",
    category: "React 性能",
    headline: "React 最佳实践",
    visual_type: "Performance Board",
    code: "server.first(<ReactPage />)",
    stats: "Vercel Skill",
    color: "cyan",
    template: "服务端组件 / 数据流 / 包体积",
    theme_id: themeIds.get("Developer Tool"),
    order_index: 2
  },
  {
    title: "vercel-web-design-guidelines",
    source_name: "vercel-labs/agent-skills",
    source_url: "https://github.com/vercel-labs/agent-skills/tree/main/skills",
    category: "网页设计",
    headline: "网页设计准则",
    visual_type: "Visual Review",
    code: "ui.audit(visual, responsive)",
    stats: "Vercel Skill",
    color: "orange",
    template: "Hero / 内容密度 / 视觉节奏",
    theme_id: themeIds.get("AI SaaS"),
    order_index: 3
  },
  {
    title: "vercel-composition-patterns",
    source_name: "vercel-labs/agent-skills",
    source_url: "https://github.com/vercel-labs/agent-skills/tree/main/skills",
    category: "组件架构",
    headline: "组合式页面结构",
    visual_type: "Layout Blocks",
    code: "compose(section, slot, state)",
    stats: "Vercel Skill",
    color: "green",
    template: "Section / Slot / State",
    theme_id: themeIds.get("Learning Hub"),
    order_index: 4
  },
  {
    title: "vercel-react-view-transitions",
    source_name: "vercel-labs/agent-skills",
    source_url: "https://github.com/vercel-labs/agent-skills/tree/main/skills",
    category: "动效体验",
    headline: "视图过渡动效",
    visual_type: "Motion Flow",
    code: "transition.navigate(route)",
    stats: "Vercel Skill",
    color: "rose",
    template: "页面切换 / 状态过渡 / 减少跳变",
    theme_id: themeIds.get("Creative Studio"),
    order_index: 5
  },
  {
    title: "deploy-to-vercel",
    source_name: "vercel-labs/agent-skills",
    source_url: "https://raw.githubusercontent.com/vercel-labs/agent-skills/main/skills/deploy-to-vercel/SKILL.md",
    category: "部署交付",
    headline: "Vercel 部署流",
    visual_type: "Deploy Console",
    code: "vercel.deploy(project)",
    stats: "Vercel Skill",
    color: "green",
    template: "预览链接 / 环境变量 / 发布状态",
    theme_id: themeIds.get("Developer Tool"),
    order_index: 6
  }
];

const skillIds = new Map();
for (const skill of skillRows) {
  const result = insertSkill.run(skill);
  skillIds.set(skill.title, Number(result.lastInsertRowid));
}

const insertVisualTemplate = db.prepare(`
  insert into visual_templates (title, theme, layout, skill_mix, preview, accent, order_index)
  values (@title, @theme, @layout, @skill_mix, @preview, @accent, @order_index)
`);

const templateRows = [
  {
    title: "AI SaaS 控制台",
    theme: "AI 工作台",
    layout: "Hero / Prompt Lab / Usage Metrics / Deploy CTA",
    skill_mix: "react-best-practices + web-design-guidelines + deploy-to-vercel",
    preview: "深色代码区 + 浅色结果区 + 运行状态",
    accent: "orange",
    order_index: 1
  },
  {
    title: "开发者文档站",
    theme: "开发者工具",
    layout: "Docs Nav / Web Preview / API Cards / Changelog",
    skill_mix: "react-best-practices + composition-patterns",
    preview: "文档导航、接口示例、网页预览",
    accent: "cyan",
    order_index: 2
  },
  {
    title: "数据产品仪表盘",
    theme: "数据仪表盘",
    layout: "Metric Grid / Graph Preview / Activity Feed",
    skill_mix: "impeccable + react-best-practices",
    preview: "指标卡、节点图、状态流",
    accent: "green",
    order_index: 3
  },
  {
    title: "创意作品集工作室",
    theme: "作品集工作室",
    layout: "Visual Hero / Case Gallery / View Transition",
    skill_mix: "impeccable + react-view-transitions",
    preview: "视觉墙、案例卡、过渡动效",
    accent: "rose",
    order_index: 4
  },
  {
    title: "学习社区工坊",
    theme: "学习社区",
    layout: "Skill Map / Workshop Board / Talk Calendar",
    skill_mix: "composition-patterns + web-design-guidelines",
    preview: "图谱、任务列、分享日程",
    accent: "cyan",
    order_index: 5
  }
];

const templateIds = new Map();
for (const template of templateRows) {
  const result = insertVisualTemplate.run(template);
  templateIds.set(template.title, Number(result.lastInsertRowid));
}

const insertRelation = db.prepare(`
  insert into skill_relations
    (source_skill_id, target_skill_id, relation, strength, order_index)
  values
    (@source_skill_id, @target_skill_id, @relation, @strength, @order_index)
`);

[
  {
    source_skill_id: skillIds.get("impeccable"),
    target_skill_id: skillIds.get("vercel-web-design-guidelines"),
    relation: "视觉校准",
    strength: 92,
    order_index: 1
  },
  {
    source_skill_id: skillIds.get("vercel-web-design-guidelines"),
    target_skill_id: skillIds.get("vercel-composition-patterns"),
    relation: "页面结构",
    strength: 86,
    order_index: 2
  },
  {
    source_skill_id: skillIds.get("vercel-composition-patterns"),
    target_skill_id: skillIds.get("vercel-react-best-practices"),
    relation: "React 落地",
    strength: 88,
    order_index: 3
  },
  {
    source_skill_id: skillIds.get("vercel-react-best-practices"),
    target_skill_id: skillIds.get("deploy-to-vercel"),
    relation: "部署路径",
    strength: 80,
    order_index: 4
  },
  {
    source_skill_id: skillIds.get("impeccable"),
    target_skill_id: skillIds.get("vercel-react-view-transitions"),
    relation: "动效精修",
    strength: 78,
    order_index: 5
  },
  {
    source_skill_id: skillIds.get("vercel-react-view-transitions"),
    target_skill_id: skillIds.get("vercel-composition-patterns"),
    relation: "状态过渡",
    strength: 74,
    order_index: 6
  }
].forEach((row) => insertRelation.run(row));

const insertTemplateSkill = db.prepare(`
  insert into template_skills (template_id, skill_id, role, order_index)
  values (@template_id, @skill_id, @role, @order_index)
`);

[
  ["AI SaaS 控制台", "vercel-react-best-practices", "性能骨架"],
  ["AI SaaS 控制台", "vercel-web-design-guidelines", "视觉入口"],
  ["AI SaaS 控制台", "deploy-to-vercel", "部署出口"],
  ["开发者文档站", "vercel-react-best-practices", "React 结构"],
  ["开发者文档站", "vercel-composition-patterns", "文档组合"],
  ["数据产品仪表盘", "impeccable", "视觉检查"],
  ["数据产品仪表盘", "vercel-react-best-practices", "服务端渲染"],
  ["创意作品集工作室", "impeccable", "视觉系统"],
  ["创意作品集工作室", "vercel-react-view-transitions", "视图过渡"],
  ["学习社区工坊", "vercel-composition-patterns", "模块组合"],
  ["学习社区工坊", "vercel-web-design-guidelines", "页面准则"]
].forEach(([templateTitle, skillTitle, role], index) => {
  insertTemplateSkill.run({
    template_id: templateIds.get(templateTitle),
    skill_id: skillIds.get(skillTitle),
    role,
    order_index: index + 1
  });
});

const insertProject = db.prepare(`
  insert into projects
    (name, idea, stack, status, progress, template_id, skill_path, next_task, deliverable, owner, order_index)
  values
    (@name, @idea, @stack, @status, @progress, @template_id, @skill_path, @next_task, @deliverable, @owner, @order_index)
`);

[
  {
    name: "AI 客服运营台",
    idea: "把客服队列、AI 回复、风险升级做成一个可演示的 SaaS 工作台。",
    stack: "AI SaaS / React / Vercel",
    status: "可预览",
    progress: 86,
    template_id: templateIds.get("AI SaaS 控制台"),
    skill_path: "web-design-guidelines -> react-best-practices -> deploy-to-vercel",
    next_task: "补充真实工单数据和升级规则",
    deliverable: "可跳转的大屏产品页",
    owner: "SkillShop Lab",
    order_index: 1
  },
  {
    name: "开发者 API 文档站",
    idea: "把 SDK 安装、接口示例、版本更新组织成一个开发者文档产品。",
    stack: "Docs / RSC / Web Preview",
    status: "开发中",
    progress: 74,
    template_id: templateIds.get("开发者文档站"),
    skill_path: "composition-patterns -> react-best-practices",
    next_task: "接入 MDX 示例和 API 分组",
    deliverable: "文档站模板 + 接口示例区",
    owner: "Frontend Guild",
    order_index: 2
  },
  {
    name: "增长数据仪表盘",
    idea: "把收入、转化、留存和异常信号做成给团队复盘的产品看板。",
    stack: "Dashboard / SQLite / Metrics",
    status: "已成型",
    progress: 81,
    template_id: templateIds.get("数据产品仪表盘"),
    skill_path: "impeccable -> react-best-practices",
    next_task: "增加指标解释和行动建议",
    deliverable: "指标看板 + 信号流",
    owner: "Data Studio",
    order_index: 3
  },
  {
    name: "创意作品集工作室",
    idea: "把个人作品、品牌案例、动效转场和视觉系统整理成可展示的作品集站点。",
    stack: "Portfolio / Motion / Case Study",
    status: "可预览",
    progress: 79,
    template_id: templateIds.get("创意作品集工作室"),
    skill_path: "impeccable -> react-view-transitions",
    next_task: "补充案例封面、项目故事和转场细节",
    deliverable: "作品集首页 + 案例墙 + 动效浏览",
    owner: "Creative Studio",
    order_index: 4
  },
  {
    name: "学习共创工坊",
    idea: "把 Skill 学习路径、项目任务和线上分享串成一个共创空间。",
    stack: "Learning Hub / Workshop / Talks",
    status: "规划中",
    progress: 58,
    template_id: templateIds.get("学习社区工坊"),
    skill_path: "composition-patterns -> web-design-guidelines",
    next_task: "设计任务状态和成员参与入口",
    deliverable: "学习路径 + 项目看板 + 分享日程",
    owner: "Community Ops",
    order_index: 5
  }
].forEach((row) => insertProject.run(row));

const insertTalk = db.prepare(`
  insert into talks (date, title, speaker, tag, order_index)
  values (@date, @title, @speaker, @tag, @order_index)
`);

[
  { date: "05.18", title: "真实 Skill 数据建模", speaker: "SkillShop Lab", tag: "直播", order_index: 1 },
  { date: "05.22", title: "模板化前端浏览", speaker: "Design Ops", tag: "录播", order_index: 2 },
  { date: "05.29", title: "Impeccable 设计检查", speaker: "Frontend Guild", tag: "分享", order_index: 3 }
].forEach((row) => insertTalk.run(row));

const insertMetric = db.prepare(`
  insert into metrics (label, value, order_index)
  values (@label, @value, @order_index)
`);

[
  { label: "真实 Skill", value: "6", order_index: 1 },
  { label: "网页模板", value: "5", order_index: 2 },
  { label: "主题分类", value: "5", order_index: 3 },
  { label: "Skill 关系", value: "6", order_index: 4 }
].forEach((row) => insertMetric.run(row));

db.close();
console.log(`Seeded ${dbPath}`);
