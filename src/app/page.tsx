import AppShell from "@/components/AppShell";
import HomePage from "@/components/HomePage";
import Script from "next/script";
import { siteDescription, siteTitle, siteUrl } from "@/lib/site";

export default function Home() {
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "SyncTeamAI Conference",
    description: siteDescription,
    url: siteUrl,
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    location: {
      "@type": "VirtualLocation",
      url: siteUrl,
    },
    organizer: {
      "@type": "Organization",
      name: siteTitle,
      url: siteUrl,
    },
  };

  return (
    <AppShell>
      <HomePage />
      <Script id="schema-event" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(eventSchema)}
      </Script>
    </AppShell>
  );
}
