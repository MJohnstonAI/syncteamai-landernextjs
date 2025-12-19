import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { siteDescription, siteTitle, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,\n  keywords: [\n    "SyncTeamAI Conference",\n    "prompt engineering conference",\n    "human AI collaboration",\n    "multi-agent workflows",\n    "AI conference",\n    "prompt engineering",\n  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,\n  keywords: [\n    "SyncTeamAI Conference",\n    "prompt engineering conference",\n    "human AI collaboration",\n    "multi-agent workflows",\n    "AI conference",\n    "prompt engineering",\n  ],
    images: [
      {
        url: "/og-image.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,\n  keywords: [\n    "SyncTeamAI Conference",\n    "prompt engineering conference",\n    "human AI collaboration",\n    "multi-agent workflows",\n    "AI conference",\n    "prompt engineering",\n  ],
    images: ["/twitter-image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaOrg = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "SyncTeamAI",
        url: siteUrl,
        logo: `${siteUrl}/logo.png`,
        sameAs: ["https://x.com/SyncTeamAI", "https://linkedin.com/company/SyncTeamAI"],
      },
      {
        "@type": "SoftwareApplication",
        name: "SyncTeamAI",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web",
        description: siteDescription,\n  keywords: [\n    "SyncTeamAI Conference",\n    "prompt engineering conference",\n    "human AI collaboration",\n    "multi-agent workflows",\n    "AI conference",\n    "prompt engineering",\n  ],
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      },
    ],
  };

  return (
    <html lang="en">
      <body className="bg-slate-900 text-white">
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-57J6VRNRLZ"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-57J6VRNRLZ');
          `}
        </Script>
        <Script id="schema-org" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(schemaOrg)}
        </Script>
      </body>
    </html>
  );
}

