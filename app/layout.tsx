import type { Metadata } from "next";
import { MouseFlowBackground } from "@/components/mouse-flow-background";
import "./globals.css";

export const metadata: Metadata = {
  title: "SkillShop - 技能分享与协作平台",
  description: "面向开发者与技术爱好者的技能可视化、网页预览与项目协作平台。"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <MouseFlowBackground />
        {children}
      </body>
    </html>
  );
}
