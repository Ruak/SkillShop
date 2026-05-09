import type { Skill, VisualTemplate } from "./home-data";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function pageDocument(title: string, body: string, css: string) {
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
  <style>${baseCss()}${css}</style>
</head>
<body>${body}</body>
</html>`;
}

export function createSkillPreviewDocument(skill: Skill) {
  const parts = skill.template.split(" / ").filter(Boolean);
  const tiles = [...parts, skill.visual_type, skill.category].slice(0, 6);

  return pageDocument(
    skill.headline,
    `<main class="skill-product">
      <nav class="site-nav">
        <b class="brand-mark">SkillShop</b>
        <span>Source</span>
        <span>Pattern</span>
        <span>Preview</span>
        <a class="nav-cta">Use Skill</a>
      </nav>
      <section class="skill-landing">
        <div class="hero-copy">
          <small>${escapeHtml(skill.source_name)}</small>
          <h1>${escapeHtml(skill.headline)}</h1>
          <p>${escapeHtml(skill.category)} / ${escapeHtml(skill.visual_type)} / ${escapeHtml(skill.theme_title)}</p>
          <div class="action-row">
            <a>Open Preview</a>
            <a>View Source</a>
          </div>
        </div>
        <aside class="skill-console">
          <header><b>Skill Runtime</b><span>${escapeHtml(skill.stats)}</span></header>
          <pre>${escapeHtml(skill.code)}</pre>
          <div class="console-grid">
            <strong>Design</strong>
            <strong>Render</strong>
            <strong>Review</strong>
          </div>
        </aside>
      </section>
      <section class="proof-strip">
        <span>Real Source</span>
        <span>Visual Output</span>
        <span>Reusable Pattern</span>
        <span>Theme Ready</span>
      </section>
      <section class="capability-grid">
        ${tiles
          .map(
            (part, index) =>
              `<article><small>0${index + 1}</small><h2>${escapeHtml(part)}</h2><p>Turn this capability into a visible product surface.</p></article>`
          )
          .join("")}
      </section>
      <section class="source-panel">
        <b>Source Snapshot</b>
        <span>${escapeHtml(skill.source_url)}</span>
      </section>
    </main>`,
    `${previewProductCss("#fbf7ef")}
.skill-product { padding: var(--space-page); }
.site-nav { margin-bottom: clamp(42px, 7vw, 84px); }
.skill-landing { display: grid; grid-template-columns: minmax(0, .96fr) minmax(360px, 1.04fr); gap: var(--space-xl); align-items: center; min-height: 70vh; }
.hero-copy small { display: block; margin-bottom: 16px; color: var(--muted); font-weight: 900; text-transform: uppercase; }
.hero-copy h1 { max-width: 620px; margin: 0 0 18px; font-size: clamp(2.5rem, 4vw, 4.1rem); line-height: 1.04; }
.hero-copy p { max-width: 58ch; margin: 0; color: var(--muted); font-size: 1.18rem; font-weight: 720; line-height: 1.55; }
.action-row { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }
.action-row a { min-height: 46px; padding: 12px 16px; border: var(--stroke); border-radius: var(--radius); background: var(--ink); color: #fff; font-weight: 900; box-shadow: 5px 5px 0 var(--orange); }
.action-row a + a { background: #fff; color: var(--ink); box-shadow: 5px 5px 0 var(--cyan); }
.skill-console { overflow: hidden; border: var(--stroke); border-radius: var(--radius); background: #17130f; color: #fff7e8; box-shadow: var(--shadow); }
.skill-console header { display: flex; justify-content: space-between; gap: 16px; padding: 16px; border-bottom: var(--stroke); background: #fff0d9; color: var(--ink); font-weight: 900; }
.skill-console pre { min-height: 260px; margin: 0; padding: 26px; color: #8ee8f2; font-size: 1.05rem; line-height: 1.7; white-space: pre-wrap; }
.console-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; padding: 16px; }
.console-grid strong { min-height: 82px; padding: 14px; border: 1.5px solid rgba(255,255,255,.38); border-radius: 8px; background: rgba(255,255,255,.08); }
.proof-strip { display: flex; flex-wrap: wrap; gap: 12px; margin: var(--space-2xl) 0 var(--space-lg); }
.proof-strip span { padding: 10px 14px; border: var(--stroke); border-radius: 999px; background: #fff; font-weight: 900; }
.capability-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; }
.capability-grid article { min-height: 250px; padding: 18px; border: var(--stroke); border-radius: var(--radius); background: #fff; box-shadow: 5px 5px 0 var(--ink); }
.capability-grid article:nth-child(2n) { background: #d9fbff; }
.capability-grid article:nth-child(3n) { background: #fff0d9; }
.capability-grid small { font-weight: 900; }
.capability-grid h2 { margin: 54px 0 12px; font-size: clamp(1.45rem, 2.4vw, 2.35rem); line-height: 1.05; }
.capability-grid p { margin: 0; color: var(--muted); font-weight: 700; line-height: 1.45; }
.source-panel { display: grid; gap: 8px; margin-top: var(--space-lg); padding: 18px; border: var(--stroke); border-radius: var(--radius); background: #17130f; color: #fff7e8; box-shadow: 5px 5px 0 var(--ink); overflow-wrap: anywhere; }
@media (max-width: 860px) { .skill-landing, .capability-grid { grid-template-columns: 1fr; } }`
  );
}

export function createTemplatePreviewDocument(template: VisualTemplate) {
  switch (template.order_index) {
    case 1:
      return aiSaasDocument(template);
    case 2:
      return docsDocument(template);
    case 3:
      return dashboardDocument(template);
    case 4:
      return portfolioDocument(template);
    default:
      return learningDocument(template);
  }
}

function aiSaasDocument(template: VisualTemplate) {
  return pageDocument(
    "FlowPilot AI Ops",
    `<main class="flowpilot">
      <nav class="site-nav">
        <b class="brand-mark">FlowPilot</b>
        <span>Automations</span>
        <span>Inbox</span>
        <span>Pricing</span>
        <a class="nav-cta">Start Free</a>
      </nav>
      <section class="hero">
        <div class="hero-copy">
          <small>${escapeHtml(template.skill_mix)}</small>
          <h1>Support Ops, On Autopilot.</h1>
          <p>Route tickets, draft replies, detect risk, and publish agent workflows from one operational console.</p>
          <div class="action-row"><a>Run Workflow</a><a>View Demo</a></div>
        </div>
        <aside class="ops-console">
          <header><b>Priority Queue</b><span>Live</span></header>
          <div class="ticket urgent"><b>Enterprise SLA</b><strong>2m left</strong><small>Escalate to human owner</small></div>
          <div class="ticket"><b>Billing intent</b><strong>94%</strong><small>Draft refund response</small></div>
          <div class="ticket"><b>API outage signal</b><strong>37 reports</strong><small>Create incident thread</small></div>
        </aside>
      </section>
      <section class="logo-strip"><span>HelioPay</span><span>Northstar</span><span>PulseDesk</span><span>OrbitKit</span></section>
      <section class="product-shot">
        <div class="left-rail"><b>Runbooks</b><span>Refund</span><span>Outage</span><span>Upgrade</span><span>Retention</span></div>
        <div class="canvas">
          <header><b>Automation Builder</b><span>284ms response</span></header>
          <div class="flow-row"><strong>Trigger</strong><span>VIP customer opens urgent ticket</span></div>
          <div class="flow-row"><strong>Classify</strong><span>Intent, sentiment, account value</span></div>
          <div class="flow-row accent"><strong>Act</strong><span>Draft answer, assign owner, create audit trail</span></div>
        </div>
        <div class="right-panel"><b>Outcome</b><strong>38%</strong><span>lower handle time</span></div>
      </section>
      <section class="feature-band">
        <article><small>01</small><h2>Live Routing</h2><p>Every inbox item becomes a visible decision path.</p></article>
        <article><small>02</small><h2>Agent Guardrails</h2><p>Approvals, sources, and escalation rules stay in view.</p></article>
        <article><small>03</small><h2>Deploy Logs</h2><p>Preview links and releases remain attached to each runbook.</p></article>
      </section>
      <section class="closing"><h2>Build the workflow. Watch it run.</h2><a>Launch Console</a></section>
    </main>`,
    `${previewProductCss("#fff0d9")}
.flowpilot { padding: var(--space-page); }
.hero { display: grid; grid-template-columns: minmax(0, .9fr) minmax(360px, 1.1fr); gap: 34px; align-items: center; min-height: 500px; padding: 44px 0 32px; }
.hero-copy small { display: block; margin-bottom: 14px; color: var(--muted); font-weight: 900; text-transform: uppercase; }
.hero-copy h1 { max-width: 580px; margin: 0 0 18px; font-size: clamp(2.55rem, 4vw, 4.1rem); line-height: 1.04; }
.hero-copy p { max-width: 50ch; margin: 0; color: var(--muted); font-size: 1rem; font-weight: 680; line-height: 1.5; }
.ops-console { display: grid; gap: 10px; padding: 14px; border: var(--stroke); border-radius: var(--radius); background: #17130f; color: #fff7e8; box-shadow: var(--shadow); }
.ops-console header, .ticket { border: 1.5px solid rgba(255,255,255,.32); border-radius: 8px; }
.ops-console header { display: flex; justify-content: space-between; padding: 12px; background: #fff7e8; color: var(--ink); }
.ticket { display: grid; gap: 12px; min-height: 112px; padding: 14px; background: rgba(255,255,255,.08); }
.ticket strong { color: #8ee8f2; font-size: 1.9rem; line-height: 1; }
.ticket.urgent { background: #fff0d9; color: var(--ink); }
.ticket.urgent strong { color: #e95670; }
.logo-strip { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: var(--space-2xl) 0 var(--space-lg); }
.logo-strip span { display: grid; min-height: 74px; place-items: center; border: var(--stroke); border-radius: var(--radius); background: #fff; color: var(--muted); font-weight: 900; box-shadow: 4px 4px 0 var(--ink); }
.product-shot { display: grid; grid-template-columns: 220px 1fr 240px; gap: 0; overflow: hidden; border: var(--stroke); border-radius: var(--radius); background: #fff; box-shadow: var(--shadow); }
.left-rail, .right-panel { display: grid; align-content: start; gap: 12px; padding: 20px; background: #17130f; color: #fff7e8; }
.left-rail span { padding: 11px; border: 1.5px solid rgba(255,255,255,.35); border-radius: 8px; }
.canvas { min-height: 420px; padding: 22px; background: linear-gradient(90deg, rgba(22,19,15,.08) 1px, transparent 1px 34px), linear-gradient(0deg, rgba(22,19,15,.08) 1px, transparent 1px 34px), #fffaf1; }
.canvas header { display: flex; justify-content: space-between; gap: 16px; margin-bottom: 26px; padding-bottom: 14px; border-bottom: var(--stroke); font-weight: 900; }
.flow-row { display: grid; grid-template-columns: 160px 1fr; gap: 18px; margin-bottom: 16px; padding: 18px; border: var(--stroke); border-radius: var(--radius); background: #fff; box-shadow: 4px 4px 0 var(--ink); font-weight: 820; }
.flow-row.accent { background: #d9fbff; }
.right-panel strong { margin-top: 90px; color: #8ee8f2; font-size: 3.2rem; line-height: .95; }
.feature-band { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: var(--space-xl); }
.feature-band article { min-height: 220px; padding: 18px; border: var(--stroke); border-radius: var(--radius); background: #fff; box-shadow: 5px 5px 0 var(--ink); }
.feature-band h2 { margin: 46px 0 12px; font-size: clamp(1.55rem, 2.8vw, 2.7rem); line-height: 1.02; }
.closing { display: flex; justify-content: space-between; gap: 24px; align-items: center; margin-top: var(--space-2xl); padding: 24px; border: var(--stroke); border-radius: var(--radius); background: #17130f; color: #fff7e8; box-shadow: var(--shadow); }
.closing h2 { margin: 0; font-size: clamp(2rem, 3.6vw, 3.6rem); line-height: .98; }
.closing a { padding: 13px 16px; border: var(--stroke); border-radius: var(--radius); background: #f28b3c; color: var(--ink); font-weight: 900; white-space: nowrap; }
@media (max-width: 900px) { .hero, .logo-strip, .product-shot, .feature-band, .flow-row, .closing { grid-template-columns: 1fr; } .closing { display: grid; } }`
  );
}

function docsDocument(template: VisualTemplate) {
  return pageDocument(
    "ForgeKit Docs",
    `<main class="forgekit">
      <nav class="site-nav">
        <b class="brand-mark">ForgeKit</b>
        <span>Docs</span>
        <span>Components</span>
        <span>Changelog</span>
        <a class="nav-cta">Copy Starter</a>
      </nav>
      <section class="docs-hero">
        <div>
          <small>${escapeHtml(template.skill_mix)}</small>
          <h1>Docs That Ship.</h1>
          <p>Ship quickstarts, API references, examples, and release notes as one searchable developer surface.</p>
        </div>
        <aside class="install-card">
          <b>Install</b>
          <code>npm create forgekit@latest</code>
          <span>Next.js / RSC / MDX</span>
        </aside>
      </section>
      <section class="docs-shell">
        <aside class="docs-nav"><b>Guide</b><span>Start</span><span>Authentication</span><span>Webhooks</span><span>Deploy</span></aside>
        <article class="docs-content">
          <header><span>v2.8 stable</span><b>Build a billing portal</b></header>
          <pre>const portal = await forge.billing.portal({
  customer: "cus_1284",
  returnUrl: "/account"
})</pre>
          <div class="api-list">
            <span><b>POST</b> /v1/customers</span>
            <span><b>GET</b> /v1/invoices</span>
            <span><b>PATCH</b> /v1/usage</span>
          </div>
        </article>
        <aside class="status-panel"><b>API Health</b><strong>99.99%</strong><span>12 regions online</span></aside>
      </section>
      <section class="feature-band">
        <article><small>01</small><h2>Runnable Examples</h2><p>Preview every code path as an actual product flow.</p></article>
        <article><small>02</small><h2>Versioned Blocks</h2><p>Docs, changelog, and examples stay in one release lane.</p></article>
        <article><small>03</small><h2>Searchable API</h2><p>Methods, props, and events remain scan-friendly.</p></article>
      </section>
      <section class="release-row"><b>Latest Release</b><span>OAuth recipes</span><span>Webhook replay</span><span>Edge cache guide</span></section>
    </main>`,
    `${previewProductCss("#d9fbff")}
.forgekit { padding: var(--space-page); }
.docs-hero { display: grid; grid-template-columns: 1fr 340px; gap: 34px; align-items: end; min-height: 460px; padding: 44px 0 32px; }
.docs-hero small { color: var(--muted); font-weight: 900; text-transform: uppercase; }
.docs-hero h1 { max-width: 580px; margin: 14px 0 18px; font-size: clamp(2.55rem, 4vw, 4.1rem); line-height: 1.04; }
.docs-hero p { max-width: 52ch; color: var(--muted); font-size: 1rem; font-weight: 680; line-height: 1.5; }
.install-card { display: grid; gap: 18px; padding: 18px; border: var(--stroke); border-radius: var(--radius); background: #17130f; color: #fff7e8; box-shadow: var(--shadow); }
.install-card code { padding: 16px; border-radius: 8px; background: rgba(255,255,255,.1); color: #8ee8f2; white-space: pre-wrap; }
.docs-shell { display: grid; grid-template-columns: 220px 1fr 230px; gap: 0; margin-top: var(--space-2xl); overflow: hidden; border: var(--stroke); border-radius: var(--radius); background: #fff; box-shadow: var(--shadow); }
.docs-nav, .status-panel { display: grid; align-content: start; gap: 12px; padding: 20px; background: #17130f; color: #fff7e8; }
.docs-nav span { padding: 11px; border: 1.5px solid rgba(255,255,255,.35); border-radius: 8px; }
.docs-content { min-height: 440px; padding: 24px; background: #fffaf1; }
.docs-content header { display: flex; justify-content: space-between; gap: 16px; margin-bottom: 20px; padding-bottom: 14px; border-bottom: var(--stroke); font-weight: 900; }
.docs-content pre { margin: 0 0 20px; padding: 22px; border-radius: 8px; background: #17130f; color: #8ee8f2; font-size: 1rem; line-height: 1.65; overflow: auto; }
.api-list { display: grid; gap: 12px; }
.api-list span { display: flex; justify-content: space-between; gap: 16px; padding: 16px; border: var(--stroke); border-radius: var(--radius); background: #fff; font-weight: 860; }
.api-list b { color: #18b8c9; }
.status-panel strong { margin-top: 96px; color: #8ee8f2; font-size: 3rem; line-height: .95; }
.feature-band { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: var(--space-xl); }
.feature-band article { min-height: 220px; padding: 18px; border: var(--stroke); border-radius: var(--radius); background: #fff; box-shadow: 5px 5px 0 var(--ink); }
.feature-band h2 { margin: 46px 0 12px; font-size: clamp(1.55rem, 2.8vw, 2.7rem); line-height: 1.02; }
.release-row { display: flex; flex-wrap: wrap; gap: 12px; margin-top: var(--space-xl); padding: 18px; border: var(--stroke); border-radius: var(--radius); background: #fff; box-shadow: 5px 5px 0 var(--ink); }
.release-row span { padding: 9px 12px; border: 1.5px solid var(--ink); border-radius: 999px; font-weight: 850; }
@media (max-width: 900px) { .docs-hero, .docs-shell, .feature-band { grid-template-columns: 1fr; } }`
  );
}

function dashboardDocument(template: VisualTemplate) {
  return pageDocument(
    "Northstar Revenue OS",
    `<main class="northstar">
      <nav class="site-nav">
        <b class="brand-mark">Northstar</b>
        <span>Dashboard</span>
        <span>Forecast</span>
        <span>Signals</span>
        <a class="nav-cta">Open Board</a>
      </nav>
      <section class="hero">
        <div>
          <small>${escapeHtml(template.skill_mix)}</small>
          <h1>Revenue Signals, Live.</h1>
          <p>Bring funnel metrics, cohort movement, and product events into one decision board.</p>
        </div>
        <aside class="forecast"><b>Forecast</b><strong>$842k</strong><span>May pipeline</span></aside>
      </section>
      <section class="dashboard-shell">
        <header><b>Executive View</b><span>Last 24 hours</span></header>
        <div class="metric-grid">
          <article><span>ARR</span><strong>$7.2m</strong><small>+12.4%</small></article>
          <article><span>Activation</span><strong>68%</strong><small>+4.8%</small></article>
          <article><span>Churn Risk</span><strong>2.9%</strong><small>-1.1%</small></article>
          <article><span>Latency</span><strong>184ms</strong><small>stable</small></article>
        </div>
        <div class="chart-row">
          <div class="chart-card"><b>Pipeline Shape</b><i></i><i></i><i></i><i></i></div>
          <div class="activity"><b>Signals</b><span>Enterprise cohort expanded</span><span>Docs conversion rose</span><span>Trial drop-off detected</span></div>
        </div>
      </section>
      <section class="feature-band">
        <article><small>01</small><h2>Metric Rooms</h2><p>Every team reads the same source of truth.</p></article>
        <article><small>02</small><h2>Graph Map</h2><p>Skills, pages, and revenue events stay connected.</p></article>
        <article><small>03</small><h2>Action Feed</h2><p>Signals become launch tasks instead of screenshots.</p></article>
      </section>
    </main>`,
    `${previewProductCss("#e0f7e7")}
.northstar { padding: var(--space-page); }
.hero { display: grid; grid-template-columns: minmax(0, 1fr) 320px; gap: 34px; align-items: end; min-height: 460px; padding: 44px 0 32px; }
.hero small { color: var(--muted); font-weight: 900; text-transform: uppercase; }
.hero h1 { max-width: 580px; margin: 14px 0 18px; font-size: clamp(2.55rem, 4vw, 4.1rem); line-height: 1.04; }
.hero p { max-width: 52ch; color: var(--muted); font-size: 1rem; font-weight: 680; line-height: 1.5; }
.forecast { display: grid; gap: 16px; padding: 20px; border: var(--stroke); border-radius: var(--radius); background: #17130f; color: #fff7e8; box-shadow: var(--shadow); }
.forecast strong { margin-top: 76px; color: #8ee8f2; font-size: 3.3rem; line-height: .95; }
.dashboard-shell { margin-top: var(--space-2xl); padding: 20px; border: var(--stroke); border-radius: var(--radius); background: #fff; box-shadow: var(--shadow); }
.dashboard-shell > header { display: flex; justify-content: space-between; gap: 16px; margin-bottom: 18px; padding-bottom: 14px; border-bottom: var(--stroke); font-weight: 900; }
.metric-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.metric-grid article { display: grid; gap: 16px; min-height: 162px; padding: 16px; border: var(--stroke); border-radius: var(--radius); background: #fffaf1; }
.metric-grid strong { font-size: clamp(1.9rem, 3vw, 3rem); line-height: 1; }
.metric-grid small { color: #267443; font-weight: 900; }
.chart-row { display: grid; grid-template-columns: 1.3fr .7fr; gap: 14px; margin-top: 14px; }
.chart-card, .activity { min-height: 340px; padding: 18px; border: var(--stroke); border-radius: var(--radius); background: linear-gradient(90deg, rgba(22,19,15,.08) 1px, transparent 1px 34px), linear-gradient(0deg, rgba(22,19,15,.08) 1px, transparent 1px 34px), #fff; }
.chart-card { position: relative; overflow: hidden; }
.chart-card i { position: absolute; bottom: 40px; width: 16%; border: var(--stroke); border-radius: 8px 8px 0 0; background: #18b8c9; box-shadow: 4px 4px 0 var(--ink); }
.chart-card i:nth-child(2) { left: 12%; height: 36%; }
.chart-card i:nth-child(3) { left: 34%; height: 62%; background: #f28b3c; }
.chart-card i:nth-child(4) { left: 56%; height: 48%; background: #48b26b; }
.chart-card i:nth-child(5) { left: 78%; height: 76%; background: #e95670; }
.activity { display: grid; align-content: start; gap: 12px; background: #17130f; color: #fff7e8; }
.activity span { padding: 13px; border: 1.5px solid rgba(255,255,255,.34); border-radius: 8px; }
.feature-band { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: var(--space-xl); }
.feature-band article { min-height: 220px; padding: 18px; border: var(--stroke); border-radius: var(--radius); background: #fff; box-shadow: 5px 5px 0 var(--ink); }
.feature-band h2 { margin: 46px 0 12px; font-size: clamp(1.55rem, 2.8vw, 2.7rem); line-height: 1.02; }
@media (max-width: 900px) { .hero, .metric-grid, .chart-row, .feature-band { grid-template-columns: 1fr; } }`
  );
}

function portfolioDocument(template: VisualTemplate) {
  return pageDocument(
    "Atelier Grid",
    `<main class="atelier">
      <nav class="site-nav">
        <b class="brand-mark">Atelier Grid</b>
        <span>Work</span>
        <span>Studio</span>
        <span>Contact</span>
        <a class="nav-cta">Book Review</a>
      </nav>
      <section class="hero">
        <div>
          <small>${escapeHtml(template.skill_mix)}</small>
          <h1>Launch Work With Taste.</h1>
        </div>
        <aside class="studio-note"><b>Selected work</b><strong>18</strong><span>case studies shipped</span></aside>
      </section>
      <section class="showcase">
        <article class="large"><span>Brand System</span><h2>Signal House</h2></article>
        <article><span>Motion Grid</span><h2>Orbit Pay</h2></article>
        <article><span>Editorial UI</span><h2>Mono Lab</h2></article>
      </section>
      <section class="service-grid">
        <article><small>01</small><h2>Visual Direction</h2><p>Hero systems, color rules, typography, and launch pages.</p></article>
        <article><small>02</small><h2>Case Architecture</h2><p>Evidence-led project stories that scroll like finished products.</p></article>
        <article><small>03</small><h2>Motion Polish</h2><p>View transitions and detail states that support the work.</p></article>
      </section>
      <section class="closing"><h2>Make the work inspectable.</h2><a>Start a Case</a></section>
    </main>`,
    `${previewProductCss("#ffe1e7")}
.atelier { padding: var(--space-page); }
.hero { display: grid; grid-template-columns: minmax(0, 1fr) 300px; gap: 34px; align-items: end; min-height: 460px; padding: 44px 0 32px; }
.hero small { color: var(--muted); font-weight: 900; text-transform: uppercase; }
.hero h1 { max-width: 580px; margin: 14px 0 0; font-size: clamp(2.55rem, 4vw, 4.1rem); line-height: 1.04; }
.studio-note { display: grid; gap: 16px; padding: 20px; border: var(--stroke); border-radius: var(--radius); background: #17130f; color: #fff7e8; box-shadow: var(--shadow); }
.studio-note strong { margin-top: 70px; color: #ffb4c2; font-size: 3.5rem; line-height: .95; }
.showcase { display: grid; grid-template-columns: 1.15fr .85fr 1fr; gap: 18px; margin-top: var(--space-2xl); }
.showcase article { display: grid; align-content: end; min-height: 340px; padding: 20px; border: var(--stroke); border-radius: var(--radius); background: linear-gradient(135deg, #d9fbff, #fff0d9); box-shadow: var(--shadow); }
.showcase .large { min-height: 440px; background: linear-gradient(135deg, #ffe1e7, #e0f7e7); }
.showcase span { width: fit-content; margin-bottom: 12px; padding: 8px 10px; border: 1.5px solid var(--ink); border-radius: 999px; background: #fff; font-weight: 900; }
.showcase h2 { margin: 0; font-size: clamp(1.8rem, 3.5vw, 3.5rem); line-height: .98; }
.service-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: var(--space-xl); }
.service-grid article { min-height: 220px; padding: 18px; border: var(--stroke); border-radius: var(--radius); background: #fff; box-shadow: 5px 5px 0 var(--ink); }
.service-grid h2 { margin: 46px 0 12px; font-size: clamp(1.55rem, 2.8vw, 2.7rem); line-height: 1.02; }
.closing { display: flex; justify-content: space-between; gap: 24px; align-items: center; margin-top: var(--space-2xl); padding: 24px; border: var(--stroke); border-radius: var(--radius); background: #17130f; color: #fff7e8; box-shadow: var(--shadow); }
.closing h2 { margin: 0; font-size: clamp(2rem, 3.6vw, 3.6rem); line-height: .98; }
.closing a { padding: 13px 16px; border: var(--stroke); border-radius: var(--radius); background: #e95670; color: #fff; font-weight: 900; white-space: nowrap; }
@media (max-width: 900px) { .hero, .showcase, .service-grid, .closing { grid-template-columns: 1fr; } .closing { display: grid; } }`
  );
}

function learningDocument(template: VisualTemplate) {
  return pageDocument(
    "SkillLoop",
    `<main class="skillloop">
      <nav class="site-nav">
        <b class="brand-mark">SkillLoop</b>
        <span>Map</span>
        <span>Workshops</span>
        <span>Talks</span>
        <a class="nav-cta">Join Cohort</a>
      </nav>
      <section class="hero">
        <div>
          <small>${escapeHtml(template.skill_mix)}</small>
          <h1>Learn, Build, Share.</h1>
          <p>Browse skill paths, join build boards, and watch technical sessions in one community workspace.</p>
        </div>
        <aside class="cohort-card"><b>May Cohort</b><strong>248</strong><span>builders active</span></aside>
      </section>
      <section class="learning-shell">
        <div class="map-panel"><b>Skill Map</b><span class="node one">Design</span><span class="node two">React</span><span class="node three">Deploy</span><span class="node four">Share</span></div>
        <div class="workshop-board">
          <b>Workshop Board</b>
          <span><strong>Prototype</strong> Landing preview</span>
          <span><strong>Review</strong> Accessibility pass</span>
          <span><strong>Ship</strong> Vercel deployment</span>
        </div>
      </section>
      <section class="talk-row"><b>Upcoming Talks</b><span>Skill Data Modeling</span><span>Visual Template Review</span><span>Impeccable Design Pass</span></section>
      <section class="feature-band">
        <article><small>01</small><h2>Map Skills</h2><p>Connect sources, themes, and templates into learning paths.</p></article>
        <article><small>02</small><h2>Build Together</h2><p>Turn each theme into a visible project board.</p></article>
        <article><small>03</small><h2>Share Live</h2><p>Talks stay linked to the Skill and template they teach.</p></article>
      </section>
    </main>`,
    `${previewProductCss("#d9fbff")}
.skillloop { padding: var(--space-page); }
.hero { display: grid; grid-template-columns: minmax(0, 1fr) 300px; gap: 34px; align-items: end; min-height: 460px; padding: 44px 0 32px; }
.hero small { color: var(--muted); font-weight: 900; text-transform: uppercase; }
.hero h1 { max-width: 580px; margin: 14px 0 18px; font-size: clamp(2.55rem, 4vw, 4.1rem); line-height: 1.04; }
.hero p { max-width: 52ch; color: var(--muted); font-size: 1rem; font-weight: 680; line-height: 1.5; }
.cohort-card { display: grid; gap: 16px; padding: 20px; border: var(--stroke); border-radius: var(--radius); background: #17130f; color: #fff7e8; box-shadow: var(--shadow); }
.cohort-card strong { margin-top: 72px; color: #8ee8f2; font-size: 3.3rem; line-height: .95; }
.learning-shell { display: grid; grid-template-columns: 1.2fr .8fr; gap: 18px; margin-top: var(--space-2xl); }
.map-panel, .workshop-board { min-height: 420px; padding: 20px; border: var(--stroke); border-radius: var(--radius); background: #fff; box-shadow: var(--shadow); }
.map-panel { position: relative; background: linear-gradient(90deg, rgba(22,19,15,.08) 1px, transparent 1px 34px), linear-gradient(0deg, rgba(22,19,15,.08) 1px, transparent 1px 34px), #fffaf1; }
.node { position: absolute; display: grid; min-width: 132px; min-height: 76px; place-items: center; border: var(--stroke); border-radius: var(--radius); background: #fff; font-weight: 900; box-shadow: 5px 5px 0 var(--ink); }
.one { left: 10%; top: 28%; background: #ffe1e7; }
.two { left: 42%; top: 16%; background: #d9fbff; }
.three { right: 12%; bottom: 24%; background: #e0f7e7; }
.four { left: 32%; bottom: 18%; background: #fff0d9; }
.workshop-board { display: grid; align-content: start; gap: 12px; background: #17130f; color: #fff7e8; }
.workshop-board span { display: grid; gap: 8px; padding: 16px; border: 1.5px solid rgba(255,255,255,.34); border-radius: 8px; }
.workshop-board strong { color: #8ee8f2; }
.talk-row { display: flex; flex-wrap: wrap; gap: 12px; margin-top: var(--space-xl); padding: 18px; border: var(--stroke); border-radius: var(--radius); background: #fff; box-shadow: 5px 5px 0 var(--ink); }
.talk-row span { padding: 9px 12px; border: 1.5px solid var(--ink); border-radius: 999px; font-weight: 850; }
.feature-band { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: var(--space-xl); }
.feature-band article { min-height: 220px; padding: 18px; border: var(--stroke); border-radius: var(--radius); background: #fff; box-shadow: 5px 5px 0 var(--ink); }
.feature-band h2 { margin: 46px 0 12px; font-size: clamp(1.55rem, 2.8vw, 2.7rem); line-height: 1.02; }
@media (max-width: 900px) { .hero, .learning-shell, .feature-band { grid-template-columns: 1fr; } }`
  );
}

function previewProductCss(background = "#fbf7ef") {
  return `:root {
  --preview-scale: .76;
  --ink: #16130f;
  --muted: #665f55;
  --paper: ${background};
  --cyan: #18b8c9;
  --orange: #f28b3c;
  --green: #48b26b;
  --rose: #e95670;
  --stroke: 2px solid #16130f;
  --radius: 8px;
  --shadow: 8px 8px 0 #16130f;
  --display-font: "Aptos Display", "Segoe UI", "Microsoft YaHei UI", "PingFang SC", "Noto Sans SC", sans-serif;
  --space-page: clamp(18px, 3vw, 34px);
  --space-lg: clamp(28px, 5vw, 64px);
  --space-xl: clamp(28px, 5vw, 64px);
  --space-2xl: clamp(42px, 7vw, 92px);
}
body {
  width: 100%;
  margin: 0;
  background:
    linear-gradient(
      118deg,
      rgba(24, 184, 201, .14) 0%,
      rgba(24, 184, 201, 0) 24%,
      rgba(242, 139, 60, .12) 44%,
      rgba(242, 139, 60, 0) 64%,
      rgba(72, 178, 107, .12) 100%
    ),
    linear-gradient(
      52deg,
      rgba(233, 86, 112, .09) 0%,
      rgba(233, 86, 112, 0) 36%,
      rgba(24, 184, 201, .09) 74%,
      rgba(24, 184, 201, 0) 100%
    ),
    linear-gradient(135deg, rgba(22,19,15,.055) 1px, transparent 1px 28px),
    var(--paper);
  background-size: 180% 180%, 160% 160%, 28px 28px, auto;
  color: var(--ink);
  font-family: "Segoe UI Variable", "Microsoft YaHei UI", Aptos, system-ui, sans-serif;
  font-kerning: normal;
  animation: preview-background-flow 24s ease-in-out infinite alternate;
}
* { box-sizing: border-box; }
a { color: inherit; text-decoration: none; }
.flowpilot,
.forgekit,
.northstar,
.atelier,
.skillloop,
.skill-product {
  width: min(1240px, calc(100% - 48px));
  margin: 0 auto;
  padding: 24px 0 72px !important;
}
h1,
h2,
.hero-copy h1,
.docs-hero h1,
.hero h1,
.closing h2,
.feature-band h2,
.service-grid h2,
.showcase h2,
.capability-grid h2 {
  font-family: var(--display-font);
  font-weight: 740;
  letter-spacing: 0;
}
.site-nav {
  position: relative;
  top: auto;
  z-index: 5;
  display: flex;
  align-items: center;
  gap: 18px;
  min-height: 64px;
  padding: 10px 14px;
  border: var(--stroke);
  border-radius: var(--radius);
  background: rgba(255, 255, 255, .9);
  box-shadow: 5px 5px 0 var(--ink);
  backdrop-filter: blur(14px);
}
.brand-mark { margin-right: auto; font-size: 1.05rem; font-weight: 950; }
.site-nav span { color: var(--muted); font-size: .94rem; font-weight: 850; }
.nav-cta {
  min-height: 38px;
  padding: 9px 12px;
  border: var(--stroke);
  border-radius: 7px;
  background: var(--ink);
  color: #fff;
  font-weight: 900;
  box-shadow: 3px 3px 0 var(--orange);
}
.action-row { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }
.action-row a {
  min-height: 46px;
  padding: 12px 16px;
  border: var(--stroke);
  border-radius: var(--radius);
  background: var(--ink);
  color: #fff;
  font-weight: 900;
  box-shadow: 5px 5px 0 var(--orange);
}
.action-row a + a { background: #fff; color: var(--ink); box-shadow: 5px 5px 0 var(--cyan); }
p { margin: 0; }
small { letter-spacing: 0; }
@keyframes preview-background-flow {
  0% {
    background-position: 0% 18%, 100% 12%, 0 0, 0 0;
  }
  50% {
    background-position: 82% 58%, 26% 70%, 14px 14px, 0 0;
  }
  100% {
    background-position: 100% 84%, 0% 88%, 28px 28px, 0 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  body {
    animation: none;
  }
}
@media (max-width: 640px) {
  .site-nav { position: static; flex-wrap: wrap; }
  .brand-mark { width: 100%; }
  .site-nav span { font-size: .86rem; }
}
@media (min-width: 1440px) {
  .flowpilot,
  .forgekit,
  .northstar,
  .atelier,
  .skillloop,
  .skill-product {
    width: min(1240px, calc(100% - 72px));
  }
}
}`;
}

function baseCss() {
  return `html { min-height: 100%; }
body { min-height: 100%; }
`;
}
