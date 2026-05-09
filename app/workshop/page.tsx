import { getHomeData } from "@/lib/home-data";
import { BrowseControls } from "@/components/browse-controls";
import { ShopIcon } from "@/components/shop-icon";

const flowSteps = ["想法", "Skill 路径", "模板", "任务", "交付"];
const studioLanes = ["视觉入口", "案例墙", "动效浏览"];

export default function WorkshopPage() {
  const { projects, skills, themes, visualTemplates } = getHomeData();

  return (
    <main className="preview-page workshop-page">
      <nav className="preview-nav" aria-label="项目工坊导航">
        <a className="brand" href="/">
          <span className="brand-mark">
            <ShopIcon />
          </span>
          <span>SkillShop</span>
        </a>
        <a className="secondary-button" href="/">
          返回首页
        </a>
      </nav>

      <section className="workshop-hero" aria-labelledby="workshop-page-title">
        <span className="eyebrow">Project Workshop</span>
        <h1 id="workshop-page-title">样例项目</h1>
        <p>通过内置 Skill，把一个想法拆成路径、模板、任务和可浏览交付物。</p>
        <div className="workshop-flow">
          {flowSteps.map((step, index) => (
            <span key={step}>
              <b>0{index + 1}</b>
              {step}
            </span>
          ))}
        </div>
      </section>

      <BrowseControls skills={skills} templates={visualTemplates} themes={themes} />

      <section className="project-showcase" aria-label="样例项目列表">
        {projects.map((project) => {
          const isCreativeStudio = project.name.includes("作品集");

          return (
          <article
            className={`project-case ${project.template_accent}${isCreativeStudio ? " featured-studio" : ""}`}
            key={project.id}
          >
            <div className="project-case-main">
              <span className="status-pill">{project.status}</span>
              <h2>{project.name}</h2>
              <p>{project.idea}</p>
              <div className="project-skill-path" aria-label="Skill 路径">
                {project.skill_path.split(" -> ").map((skill, index) => (
                  <span key={`${project.id}-${skill}`}>
                    <b>{String(index + 1).padStart(2, "0")}</b>
                    {skill}
                  </span>
                ))}
              </div>
              <div className="project-actions">
                <a className="primary-button" href={`/templates/${project.template_id}`}>
                  内嵌预览
                </a>
                <a
                  className="secondary-button"
                  href={`/templates/${project.template_id}/preview`}
                  rel="noreferrer"
                  target="_blank"
                >
                  大屏浏览
                </a>
              </div>
            </div>

            <div className="project-case-media" aria-hidden="true">
              <div className="studio-frame">
                <span>{project.template_theme}</span>
                <strong>{project.template_title}</strong>
                <div className="studio-lanes">
                  {studioLanes.map((lane) => (
                    <i key={lane}>{lane}</i>
                  ))}
                </div>
              </div>
              <div className="studio-stack">
                <span>{project.stack}</span>
                <span>{project.deliverable}</span>
              </div>
            </div>

            <div className="project-case-panel">
              <div>
                <span>Template</span>
                <strong>{project.template_title}</strong>
              </div>
              <div>
                <span>Skill Path</span>
                <strong>{project.skill_path}</strong>
              </div>
              <div>
                <span>Next Task</span>
                <strong>{project.next_task}</strong>
              </div>
              <div>
                <span>Deliverable</span>
                <strong>{project.deliverable}</strong>
              </div>
              <div>
                <span>Owner</span>
                <strong>{project.owner}</strong>
              </div>
              <div className="progress-block compact">
                <span>{project.progress}%</span>
                <div className="progress-track">
                  <div style={{ width: `${project.progress}%` }} />
                </div>
              </div>
            </div>
          </article>
          );
        })}
      </section>
    </main>
  );
}
