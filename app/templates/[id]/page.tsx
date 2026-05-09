import { BrowserPreview } from "@/components/browser-preview";
import { getAllTemplateIds, getVisualTemplateById } from "@/lib/home-data";
import { createTemplatePreviewDocument } from "@/lib/preview-documents";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getAllTemplateIds().map((template) => ({
    id: String(template.id)
  }));
}

export default async function TemplatePreviewPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const template = getVisualTemplateById(Number(id));

  if (!template) {
    notFound();
  }

  const previewDocument = createTemplatePreviewDocument(template);

  return (
    <main className="preview-page compact-preview-page">
      <nav className="preview-nav" aria-label="预览导航">
        <a className="brand" href="/">
          <span className="brand-mark">S</span>
          <span>SkillShop</span>
        </a>
        <a className="secondary-button" href="/">
          返回首页
        </a>
      </nav>

      <BrowserPreview
        document={previewDocument}
        externalUrl={`/templates/${template.id}/preview`}
        showHeading={false}
        title={`${template.title} 预览`}
        url={`skillshop.local/templates/${template.id}`}
      />
    </main>
  );
}
