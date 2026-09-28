import type { Metadata } from "next";
import WorkflowSection from "@/components/sections/WorkflowSection";

export const metadata: Metadata = {
  title: "Workflow",
  description: "A proven, systematic software development lifecycle for delivering high-performance, scalable digital products.",
};

export default function WorkflowPage() {
  return <WorkflowSection />;
}
