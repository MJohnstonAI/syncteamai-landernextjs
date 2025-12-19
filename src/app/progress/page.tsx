import type { Metadata } from "next";
import Script from "next/script";
import AppShell from "@/components/AppShell";
import BookPage from "@/components/BookPage";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Prompt Engineering Book - SyncTeamAI Conference",
  description:
    "Explore the SyncTeamAI prompt engineering book and build the foundation for multi-agent workflows.",
  alternates: {
    canonical: "/progress",
  },
};

export default function Book() {
  const bookSchema = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: "Prompt Engineering Book",
    author: {
      "@type": "Organization",
      name: "SyncTeamAI",
    },
    url: `${siteUrl}/progress`,
    image: `${siteUrl}/images/book-cover.webp`,
    inLanguage: "en",
  };

  return (
    <AppShell>
      <BookPage />
      <Script id="schema-book" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(bookSchema)}
      </Script>
    </AppShell>
  );
}

