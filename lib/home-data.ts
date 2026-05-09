import { getDatabase } from "./database";

export type Theme = {
  id: number;
  name: string;
  title: string;
  accent: string;
  template: string;
  tags: string;
  order_index: number;
};

export type Skill = {
  id: number;
  title: string;
  source_name: string;
  source_url: string;
  category: string;
  headline: string;
  visual_type: string;
  code: string;
  stats: string;
  color: string;
  template: string;
  theme_title: string;
  order_index: number;
};

export type VisualTemplate = {
  id: number;
  title: string;
  theme: string;
  layout: string;
  skill_mix: string;
  preview: string;
  accent: string;
  order_index: number;
};

export type Project = {
  id: number;
  name: string;
  idea: string;
  stack: string;
  status: string;
  progress: number;
  template_id: number;
  skill_path: string;
  next_task: string;
  deliverable: string;
  owner: string;
  template_title: string;
  template_theme: string;
  template_accent: string;
  order_index: number;
};

export type Talk = {
  id: number;
  date: string;
  title: string;
  speaker: string;
  tag: string;
  order_index: number;
};

export type Metric = {
  id: number;
  label: string;
  value: string;
  order_index: number;
};

export type SkillRelation = {
  id: number;
  source_skill_id: number;
  target_skill_id: number;
  relation: string;
  strength: number;
  order_index: number;
  source_title: string;
  source_headline: string;
  source_color: string;
  target_title: string;
  target_headline: string;
  target_color: string;
};

export type TemplateSkill = {
  id: number;
  template_id: number;
  skill_id: number;
  role: string;
  order_index: number;
  template_title: string;
  skill_title: string;
  skill_headline: string;
};

export function getHomeData() {
  const db = getDatabase();

  const themes = db
    .prepare("select * from themes order by order_index asc")
    .all() as Theme[];

  const skills = db
    .prepare(
      `select skills.*, themes.title as theme_title
       from skills
       join themes on themes.id = skills.theme_id
       order by skills.order_index asc`
    )
    .all() as Skill[];

  const projects = db
    .prepare(
      `select
        projects.*,
        visual_templates.title as template_title,
        visual_templates.theme as template_theme,
        visual_templates.accent as template_accent
       from projects
       join visual_templates on visual_templates.id = projects.template_id
       order by projects.order_index asc`
    )
    .all() as Project[];

  const visualTemplates = db
    .prepare("select * from visual_templates order by order_index asc")
    .all() as VisualTemplate[];

  const talks = db
    .prepare("select * from talks order by order_index asc")
    .all() as Talk[];

  const metrics = db
    .prepare("select * from metrics order by order_index asc")
    .all() as Metric[];

  const skillRelations = db
    .prepare(
      `select
        skill_relations.*,
        source.title as source_title,
        source.headline as source_headline,
        source.color as source_color,
        target.title as target_title,
        target.headline as target_headline,
        target.color as target_color
       from skill_relations
       join skills source on source.id = skill_relations.source_skill_id
       join skills target on target.id = skill_relations.target_skill_id
       order by skill_relations.order_index asc`
    )
    .all() as SkillRelation[];

  const templateSkills = db
    .prepare(
      `select
        template_skills.*,
        visual_templates.title as template_title,
        skills.title as skill_title,
        skills.headline as skill_headline
       from template_skills
       join visual_templates on visual_templates.id = template_skills.template_id
       join skills on skills.id = template_skills.skill_id
       order by template_skills.order_index asc`
    )
    .all() as TemplateSkill[];

  return {
    themes,
    skills,
    visualTemplates,
    skillRelations,
    templateSkills,
    projects,
    talks,
    metrics
  };
}

export function getSkillById(id: number) {
  const db = getDatabase();

  return db
    .prepare(
      `select skills.*, themes.title as theme_title
       from skills
       join themes on themes.id = skills.theme_id
       where skills.id = ?`
    )
    .get(id) as Skill | undefined;
}

export function getVisualTemplateById(id: number) {
  const db = getDatabase();

  return db
    .prepare("select * from visual_templates where id = ?")
    .get(id) as VisualTemplate | undefined;
}

export function getAllSkillIds() {
  const db = getDatabase();

  return db.prepare("select id from skills").all() as Array<{ id: number }>;
}

export function getAllTemplateIds() {
  const db = getDatabase();

  return db.prepare("select id from visual_templates").all() as Array<{ id: number }>;
}
