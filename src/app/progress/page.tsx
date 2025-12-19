import type { Metadata } from "next";
import AppShell from "@/components/AppShell";
import BookPage from "@/components/BookPage";

export const metadata: Metadata = {
  title: "Prompt Engineering Book - SyncTeamAI Conference",
  description:
    "Explore the SyncTeamAI prompt engineering book and build the foundation for multi-agent workflows.",
};

export default function Book() {
  return (
    <AppShell>
      <BookPage />
    </AppShell>
  );
}
