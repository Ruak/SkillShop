import { getAllTemplateIds, getVisualTemplateById } from "@/lib/home-data";
import { createTemplatePreviewDocument } from "@/lib/preview-documents";

export function generateStaticParams() {
  return getAllTemplateIds().map((template) => ({
    id: String(template.id)
  }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const template = getVisualTemplateById(Number(id));

  if (!template) {
    return new Response("Template not found", { status: 404 });
  }

  return new Response(createTemplatePreviewDocument(template), {
    headers: {
      "content-type": "text/html; charset=utf-8"
    }
  });
}
