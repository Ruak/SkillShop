type BrowserPreviewProps = {
  title: string;
  url: string;
  document: string;
  externalUrl?: string;
  showHeading?: boolean;
};

export function BrowserPreview({
  title,
  url,
  document,
  externalUrl,
  showHeading = true
}: BrowserPreviewProps) {
  return (
    <section className="browser-section" aria-labelledby="browser-preview-title">
      {showHeading ? (
        <div className="section-heading">
          <span className="eyebrow">Web Preview</span>
          <h2 id="browser-preview-title">{title}</h2>
        </div>
      ) : (
        <h1 className="sr-only" id="browser-preview-title">
          {title}
        </h1>
      )}

      <div className="browser-window">
        <div className="browser-toolbar" aria-label="预览窗口工具栏">
          <div className="browser-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="browser-address">{url}</div>
          {externalUrl ? (
            <a className="browser-jump" href={externalUrl} rel="noreferrer" target="_blank">
              跳转浏览
            </a>
          ) : (
            <b>网页预览</b>
          )}
        </div>
        <iframe sandbox="" srcDoc={document} title={title} />
      </div>
    </section>
  );
}
