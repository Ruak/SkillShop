# SkillShop

面向开发者和技术爱好者的 Skill 可视化浏览与协作平台。

当前重点：收集真实 Skill，组合常见网页主题，生成可在页面内浏览的前端模板效果。

## 运行

```bash
npm install
npm run db:seed
npm run dev
```

## 示例页面

- `/skills/1`
- `/templates/1`

## 当前预览模式

使用内置小浏览器窗口浏览网页效果。

- 不使用开发者代码沙盒作为主体验。
- 使用 `iframe srcDoc` 渲染生成后的完整 HTML。
- Skill 和模板详情页都应展示真实页面结构。
- 预览内容不能停留在 Hello World。
- 模板详情页保留内嵌预览。
- 内嵌预览右上角提供“跳转浏览”。
- `/templates/[id]/preview` 展示独立大屏网页。
- 真实 Skill 页介绍功能和来源，不展示网页效果。

## 数据来源

本地 SQLite 数据库由 `scripts/seed-db.js` 生成。

首期 Skill 来源：

- https://github.com/pbakaus/impeccable
- https://github.com/vercel-labs/agent-skills
- https://vercel.com/docs/agent-resources/skills

## 主要文件

- `app/page.tsx`：首页
- `app/skills/[id]/page.tsx`：Skill 效果页
- `app/templates/[id]/page.tsx`：模板效果页
- `components/browser-preview.tsx`：内置小浏览器
- `lib/preview-documents.ts`：网页预览文档生成
- `lib/home-data.ts`：数据库查询
- `scripts/seed-db.js`：本地数据种子
- `docs/design.md`：设计文档
- `docs/product-principles.md`：产品原则
