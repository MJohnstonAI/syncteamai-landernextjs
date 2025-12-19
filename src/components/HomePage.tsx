"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ShareActions from "@/components/ShareActions";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: GtagArgs) => void;
  }
}

type GtagArgs = [string, string, Record<string, unknown>?];

const track = (...args: GtagArgs) => {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = (...gtagArgs: GtagArgs) => window.dataLayer?.push(gtagArgs);
  }
  window.gtag(...args);
};

const SUPPORTING_LINES = [
  "Join builders and teams exploring how humans and AI agents solve hard problems together.",
  "Learn practical prompt engineering workflows, then see them applied in live sessions.",
  "Get in early and help shape the first SyncTeamAI Conference agenda.",
];
const BOOK_CTA_LABEL = "Learn about the Prompt Engineering Book";

const HomePage: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [messageBody, setMessageBody] = useState<string>("");
  const [formStatus, setFormStatus] = useState<"idle" | "submitting">("idle");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [hasInteractedWithForm, setHasInteractedWithForm] = useState(false);
  const [subheadingIndex, setSubheadingIndex] = useState(0);

  useEffect(() => {
    const getDeviceType = () => {
      const width = window.innerWidth;
      if (width < 768) return "mobile";
      if (width >= 768 && width < 1024) return "tablet";
      return "desktop";
    };

    track("event", "page_view", {
      device_category: getDeviceType(),
      page_title: "HomePage",
    });

    const subheadingInterval = setInterval(() => {
      setSubheadingIndex((prevIndex) => (prevIndex + 1) % SUPPORTING_LINES.length);
    }, 5000);

    return () => clearInterval(subheadingInterval);
  }, []);

  const handleFormInteraction = () => {
    if (!hasInteractedWithForm) {
      track("event", "begin_form_interaction", { form_id: "waitlist_form" });
      setHasInteractedWithForm(true);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("submitting");
    setSuccessMessage("");
    setErrorMessage("");

    const formspreeEndpoint = "https://formspree.io/f/xblpjrbb";
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", messageBody);

    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        track("event", "generate_lead", { method: "Formspree" });
        setSuccessMessage("Thanks for signing up! We'll be in touch soon.");
        setFormStatus("idle");
        setName("");
        setEmail("");
        setMessageBody("");
      } else {
        throw new Error(`Server responded with status: ${response.status}`);
      }
    } catch (error) {
      console.error("Formspree submission failed, falling back to mailto:", error);
      track("event", "generate_lead_fallback", { method: "Mailto" });
      setErrorMessage(
        "Something went wrong, but you can still sign up! Opening your email client as a backup..."
      );
      const recipientEmail = "syncteamai@gmail.com";
      const subject = encodeURIComponent(`SyncTeamAI Waitlist Sign-up: ${name}`);
      const body = encodeURIComponent(
        `You have a new sign-up for the SyncTeamAI waitlist.\n\nName: ${name}\nEmail: ${email}\nMessage:\n${messageBody || "(No message provided)"}`
      );
      window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
      setTimeout(() => {
        setFormStatus("idle");
        setErrorMessage("");
      }, 3000);
    }
  };

  const handleNavigateToProgress = () => {
    track("event", "view_item", {
      item_list_name: "Prompt Engineering Book",
      item_list_id: "book_page",
    });
    router.push("/progress");
  };

  return (
    <div className="relative z-20 min-h-screen flex flex-col lg:block">
      <header className="relative lg:absolute top-0 left-0 w-full p-4 md:p-8">
        <div className="text-2xl md:text-3xl font-bold tracking-tighter">
          SyncTeam<span className="text-blue-400">AI</span>
        </div>
      </header>

      <main className="flex-grow flex flex-col justify-start items-center px-4 pt-16 sm:pt-20 md:pt-24 lg:pt-28 text-center">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl animate-fade-in-up">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-tight">
            SyncTeamAI Conference
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-slate-300">
            Human-AI collaboration, prompt engineering, and multi-agent workflows - launching soon.
          </p>
          <p className="mt-3 text-xs sm:text-sm text-slate-400">
            Early access | Private demos | Founding-member perks
          </p>
          <p
            key={subheadingIndex}
            className="mt-4 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-400 min-h-[4rem] animate-fade-in"
          >
            {SUPPORTING_LINES[subheadingIndex]}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 max-w-sm sm:max-w-md md:max-w-lg mx-auto">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                <label htmlFor="name-input" className="w-full">
                  <span className="sr-only">Name</span>
                  <input
                    id="name-input"
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={handleFormInteraction}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3.5 sm:py-3 text-base sm:text-sm text-white bg-slate-800/50 border border-slate-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                </label>
                <label htmlFor="email-input" className="w-full">
                  <span className="sr-only">Email Address</span>
                  <input
                    id="email-input"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={handleFormInteraction}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3.5 sm:py-3 text-base sm:text-sm text-white bg-slate-800/50 border border-slate-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                </label>
              </div>
              <label htmlFor="message-input" className="w-full">
                <span className="sr-only">Your Message (optional)</span>
                <textarea
                  id="message-input"
                  name="message"
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  onFocus={handleFormInteraction}
                  placeholder="Your message (optional)"
                  rows={3}
                  className="w-full px-4 py-3.5 sm:py-3 text-base sm:text-sm text-white bg-slate-800/50 border border-slate-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                ></textarea>
              </label>
              <button
                type="submit"
                disabled={formStatus === "submitting"}
                className="w-full px-6 py-4 sm:py-3 text-base sm:text-sm font-semibold bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500 transition-colors flex items-center justify-center disabled:bg-slate-600 disabled:cursor-not-allowed min-h-[44px] sm:min-h-[36px]"
              >
                {formStatus === "submitting" ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Join the Waiting List</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-2 h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
          <div className="mt-4 min-h-[20px] text-xs max-w-lg mx-auto">
            {successMessage && <p className="text-green-400">{successMessage}</p>}
            {errorMessage && <p className="text-yellow-500">{errorMessage}</p>}
            {!successMessage && !errorMessage && (
              <p className="text-slate-400">
                If our sign-up service is busy, this will open your email client as a backup.
              </p>
            )}
          </div>
        </div>
      </main>

      <section className="relative z-20 px-4 pb-8 sm:pb-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-lg sm:text-xl font-semibold">Why we&apos;re building this</h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            SyncTeamAI Conference is where builders learn how to guide AI systems with clarity, compare multi-agent
            workflows, and design better human-AI collaboration. The waiting list helps us shape the sessions and invite
            the right mix of teams, educators, and creators.
          </p>
        </div>
      </section>

      <section className="relative z-20 px-4 pb-10 sm:pb-16">
        <div className="max-w-4xl mx-auto bg-slate-800/40 border border-slate-700 rounded-lg p-6 sm:p-8 text-center">
          <h2 className="text-xl sm:text-2xl font-semibold">While you&apos;re on the waiting list...</h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            The conference is rooted in practical prompt engineering. The book gives you the foundation now, so you
            arrive ready to ask sharper questions and build stronger multi-agent workflows.
          </p>
          <div className="mt-5 flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={handleNavigateToProgress}
              className="px-6 py-3 text-sm font-semibold border border-slate-600 text-white rounded-md hover:border-slate-400 hover:bg-slate-800/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500 transition-colors"
            >
              {BOOK_CTA_LABEL}
            </button>
            <span className="text-xs text-slate-400">While you wait, get the foundations now.</span>
          </div>
          <div
            className="mt-6 relative w-full overflow-hidden rounded-lg border border-slate-700 bg-slate-900/40"
            style={{ paddingTop: "56.25%" }}
          >
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube.com/embed/jHIy8Tjx56I"
              title="SyncTeamAI Conference overview"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      <footer className="relative lg:absolute bottom-0 left-0 right-0 p-4 md:p-6 text-center text-slate-400 text-sm mt-16 sm:mt-20 lg:mt-0 py-6 sm:py-4">
        <ShareActions />
        <p>&copy; 2025 NeuroSyncTeam AI Dynamics Pty Ltd. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
