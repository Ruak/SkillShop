import { getHomeData } from "@/lib/home-data";
import { ShopIcon } from "@/components/shop-icon";

export const dynamic = "force-dynamic";

const navItems = ["模板浏览", "Skills", "技能图谱", "项目工坊"];

function renderSkillHeadline(headline: string) {
  if (headline === "高保真设计原则") {
    return (
      <>
        高保真设计
        <br />
        原则
      </>
    );
  }

  return headline;
}

export default function Home() {
  const {
    themes,
    skills,
    skillRelations,
    projects,
    talks,
    metrics
  } = getHomeData();
  const heroProject = projects[0];
  const heroSkill = skills[0];
  const codeLines = [
    `project = "${heroProject.name}"`,
    "idea.toWorkshop(skill_path)",
    "template.toDelivery(page)",
    "launch.withPreview(project)"
  ];
  const graphNodes = skills.slice(0, 6);

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="SkillShop 首页">
          <span className="brand-mark">
            <ShopIcon />
          </span>
          <span>SkillShop</span>
        </a>
        <nav className="nav-links" aria-label="主导航">
          {navItems.map((item) => (
            <a key={item} href={`#${item}`}>
              {item}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <a className="ghost-button" href="#login">
            登录
          </a>
          <a className="primary-button" href="#create">
            创建 Skill
          </a>
        </div>
      </header>

      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="eyebrow">Skill Browser / Project Workshop / Launch Flow</div>
          <h1 id="hero-title">看见 Skill</h1>
          <div className="headline-stack">
            <span>GitHub 来源</span>
            <span>项目工坊</span>
            <span>可交付页面</span>
          </div>
          <div className="hero-actions">
            <a className="primary-button large" href="#模板浏览">
              模板浏览
            </a>
            <a className="secondary-button large" href="/workshop">
              项目工坊
            </a>
          </div>
          <div className="hero-metrics" aria-label="平台指标">
            {metrics.map((metric) => (
              <span key={metric.id}>
                <strong>{metric.value}</strong> {metric.label}
              </span>
            ))}
          </div>
        </div>

        <div className="hero-preview-card" aria-label="项目工坊">
          <div className="window-bar">
            <span />
            <span />
            <span />
            <b>{heroSkill.title}.skill</b>
          </div>
          <div className="hero-preview-grid">
            <div className="code-pane">
              <span className="code-line muted">source = "{heroSkill.source_name}"</span>
              {codeLines.map((line, index) => (
                <span className={index === 1 ? "code-line accent" : "code-line"} key={line}>
                  {line}
                </span>
              ))}
            </div>
            <div className="preview-pane">
              <div className="preview-toolbar">
                <span>项目工坊</span>
                <span className="live-dot">{heroProject.status}</span>
              </div>
              <div className="visual-stage">
                <div className="floating-tile tile-one">项目工坊</div>
                <div className="floating-tile tile-two">{heroProject.template_title}</div>
                <div className="floating-tile tile-three">
                  高保真设计
                  <br />
                  原则
                </div>
                <div className="pulse-ring" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="theme-section" id="模板浏览" aria-labelledby="theme-title">
        <div className="section-heading compact">
          <span className="eyebrow">Theme Templates</span>
          <h2 id="theme-title">常见主题模板</h2>
        </div>
        <div className="theme-strip">
          {themes.map((theme) => (
            <article className={`theme-card ${theme.accent}`} key={theme.id}>
              <span>{theme.name}</span>
              <h3>{theme.title}</h3>
              <p>{theme.template}</p>
              <div className="tag-row">
                {theme.tags.split(",").map((tag) => (
                  <b key={tag}>{tag}</b>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-grid" id="Skills" aria-labelledby="skills-title">
        <div className="section-heading">
          <span className="eyebrow">Skills</span>
          <h2 id="skills-title">Skills</h2>
        </div>
        <div className="skill-grid">
          {skills.map((skill) => (
            <article className={`skill-card ${skill.color}`} key={skill.id}>
              <div className="skill-summary">
                <span>{skill.visual_type}</span>
                <strong>{skill.code}</strong>
              </div>
              <div className="card-meta">
                <span>{skill.category}</span>
                <span>{skill.stats}</span>
              </div>
              <h3>{renderSkillHeadline(skill.headline)}</h3>
              <p>{skill.template}</p>
              <a className="source-link" href={`/skills/${skill.id}`}>
                查看 Skill
              </a>
              <a className="source-link" href={skill.source_url} rel="noreferrer" target="_blank">
                {skill.source_name}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="split-section" id="技能图谱" aria-labelledby="graph-title">
        <div className="graph-panel real-graph">
          <svg className="graph-lines" viewBox="0 0 620 360" aria-hidden="true">
            {skillRelations.map((relation, index) => {
              const y = 70 + index * 42;
              return <path d={`M130 ${y} C230 ${y - 28}, 360 ${y + 26}, 500 ${y}`} key={relation.id} />;
            })}
          </svg>
          {graphNodes.map((node, index) => (
            <div className={`graph-node graph-node-${index + 1} ${node.color}`} key={node.id}>
              {node.title}
            </div>
          ))}
        </div>
        <div className="panel-copy">
          <span className="eyebrow">Graph Preview</span>
          <h2 id="graph-title">真实关系路径</h2>
          <div className="relation-list" aria-label="Skill 关系">
            {skillRelations.map((relation) => (
              <span key={relation.id}>
                {relation.source_title} → {relation.target_title}
                <b>{relation.relation}</b>
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="workshop-section" id="项目工坊" aria-labelledby="workshop-title">
        <div className="section-heading">
          <span className="eyebrow">Project Workshop</span>
          <h2 id="workshop-title">从想法到落地</h2>
          <a className="secondary-button" href="/workshop">
            查看样例项目
          </a>
        </div>
        <div className="workshop-list">
          {projects.map((project) => (
            <article className="workshop-row" key={project.id}>
              <div>
                <span className="status-pill">{project.status}</span>
                <h3>{project.name}</h3>
                <p>{project.idea}</p>
                <div className="mini-stack">
                  <span>{project.template_title}</span>
                  <span>{project.owner}</span>
                  <span>{project.deliverable}</span>
                </div>
              </div>
              <div className="progress-block">
                <span>{project.progress}%</span>
                <div className="progress-track">
                  <div style={{ width: `${project.progress}%` }} />
                </div>
                <a className="source-link stacked-link" href={`/templates/${project.template_id}`}>
                  <span>预览</span>
                  <span>模板</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="talk-section" id="技术分享" aria-labelledby="talk-title">
        <div className="section-heading">
          <span className="eyebrow">Tech Talks</span>
          <h2 id="talk-title">线上技术分享</h2>
        </div>
        <div className="talk-grid">
          {talks.map((talk) => (
            <article className="talk-card" key={talk.id}>
              <time>{talk.date}</time>
              <span>{talk.tag}</span>
              <h3>{talk.title}</h3>
              <p>{talk.speaker}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
