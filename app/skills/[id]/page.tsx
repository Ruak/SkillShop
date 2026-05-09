import { getAllSkillIds, getSkillById } from "@/lib/home-data";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getAllSkillIds().map((skill) => ({
    id: String(skill.id)
  }));
}

export default async function SkillDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const skill = getSkillById(Number(id));

  if (!skill) {
    notFound();
  }

  const templateParts = skill.template.split(" / ");

  return (
    <main className="preview-page">
      <nav className="preview-nav" aria-label="Skill 导航">
        <a className="brand" href="/">
          <span className="brand-mark">S</span>
          <span>SkillShop</span>
        </a>
        <a className="secondary-button" href="/">
          返回首页
        </a>
      </nav>

      <section className="skill-detail-hero">
        <div>
          <span className="eyebrow">{skill.source_name}</span>
          <h1>{skill.headline}</h1>
          <div className="headline-stack">
            <span>{skill.category}</span>
            <span>{skill.visual_type}</span>
            <span>{skill.theme_title}</span>
          </div>
        </div>
        <aside className="skill-source-panel">
          <b>Source</b>
          <strong>{skill.source_name}</strong>
          <span>{skill.stats}</span>
          <a href={skill.source_url} rel="noreferrer" target="_blank">
            打开来源
          </a>
        </aside>
      </section>

      <section className="skill-function-grid" aria-label="Skill 功能">
        <article>
          <span>Core</span>
          <h2>能力映射</h2>
          <p>{skill.code}</p>
        </article>
        {templateParts.map((part, index) => (
          <article key={part}>
            <span>0{index + 1}</span>
            <h2>{part}</h2>
            <p>用于生成模板结构、视觉规则或页面体验。</p>
          </article>
        ))}
      </section>
    </main>
  );
}
