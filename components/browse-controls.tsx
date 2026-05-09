"use client";

import { useMemo, useState } from "react";
import type { Skill, Theme, VisualTemplate } from "@/lib/home-data";

type BrowseControlsProps = {
  skills: Skill[];
  themes: Theme[];
  templates: VisualTemplate[];
};

const ALL_THEMES = "全部";

export function BrowseControls({ skills, themes, templates }: BrowseControlsProps) {
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState(ALL_THEMES);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [skill.title, skill.headline, skill.category, skill.source_name]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesTheme = theme === ALL_THEMES || skill.theme_title === theme;

      return matchesQuery && matchesTheme;
    });
  }, [normalizedQuery, skills, theme]);

  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [template.title, template.theme, template.skill_mix]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesTheme = theme === ALL_THEMES || template.theme === theme;

      return matchesQuery && matchesTheme;
    });
  }, [normalizedQuery, templates, theme]);

  return (
    <section className="browse-section" aria-labelledby="browse-title">
      <div className="section-heading">
        <span className="eyebrow">Workshop Filter</span>
        <h2 id="browse-title">工坊筛选</h2>
      </div>
      <div className="browse-panel">
        <label>
          <span>搜索</span>
          <input
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Skill / 模板 / 来源"
            type="search"
            value={query}
          />
        </label>
        <div className="filter-row no-margin" aria-label="主题筛选">
          <button
            className={theme === ALL_THEMES ? "active-filter" : ""}
            onClick={() => setTheme(ALL_THEMES)}
          >
            全部
          </button>
          {themes.map((item) => (
            <button
              className={theme === item.title ? "active-filter" : ""}
              key={item.id}
              onClick={() => setTheme(item.title)}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
      <div className="browse-results">
        <div>
          <strong>{filteredSkills.length}</strong>
          <span>匹配 Skill</span>
        </div>
        <div>
          <strong>{filteredTemplates.length}</strong>
          <span>可用模板</span>
        </div>
      </div>
    </section>
  );
}
