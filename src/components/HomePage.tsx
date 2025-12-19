"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ShareActions from "@/components/ShareActions";

declare const gtag: (...args: any[]) => void;

const HomePage: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [messageBody, setMessageBody] = useState<string>("");
  const [daysLeft, setDaysLeft] = useState<number | null>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting">("idle");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [hasInteractedWithForm, setHasInteractedWithForm] = useState(false);

  const subheadings = [
    "The first platform where rival AI models collaborate in real-time. Watch them debate, challenge each other's ideas, and deliver solutions no single AI could create alone. Early access launching soon.",
    "Stop choosing between AI platforms. Get the best thinking from all of them - in one conversation. Each brings their superpower, together they're unstoppable.",
    "SyncTeamAI makes competing AI models collaborate like a brainstorming team - each contributing their unique strengths while checking each other's blind spots. Join the waitlist for the future of problem-solving.",
    "The smartest solutions come from diverse perspectives. We built the first platform where leading AI models debate, collaborate, and synthesize breakthrough answers together.",
    "Stop Switching Between AI Apps. Start Getting Better Answers. You've been copy-pasting the same question across multiple AI platforms. Now watch them work togetherƒ?\"combining strengths, challenging assumptions, and delivering solutions no single AI can match.",
    "Imagine a conference room where the world's most powerful AI models challenge each other's ideas and build solutions together. That's SyncTeamAI. Be among the first to experience it.",
    "They don't competeƒ?\"they collaborate. Watch leading AI models debate your challenge, build on each other's insights, and deliver solutions that single-AI conversations simply can't reach. Join the waitlist.",
    "Go beyond a single agent. SyncTeamAI orchestrates a symphony of specialized AIs to solve complex problems with unprecedented creativity and efficiency. Be the first to know when we launch.",
  ];
  const [subheadingIndex, setSubheadingIndex] = useState(0);

  useEffect(() => {
    const getDeviceType = () => {
      const width = window.innerWidth;
      if (width < 768) return "mobile";
      if (width >= 768 && width < 1024) return "tablet";
      return "desktop";
    };

    gtag("event", "page_view", {
      device_category: getDeviceType(),
      page_title: "HomePage",
    });

    const targetDate = new Date("2026-02-01T00:00:00Z");
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference > 0) {
      const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
      setDaysLeft(days);
    } else {
      setDaysLeft(0);
    }

    const subheadingInterval = setInterval(() => {
      setSubheadingIndex((prevIndex) => (prevIndex + 1) % subheadings.length);
    }, 5000);

    return () => clearInterval(subheadingInterval);
  }, []);

  const handleFormInteraction = () => {
    if (!hasInteractedWithForm) {
      gtag("event", "begin_form_interaction", { form_id: "waitlist_form" });
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
        gtag("event", "generate_lead", { method: "Formspree" });
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
      gtag("event", "generate_lead_fallback", { method: "Mailto" });
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
    gtag("event", "view_item", {
      item_list_name: "Dev Progress",
      item_list_id: "progress_page",
    });
    router.push("/progress");
  };

  const daysLeftWidget = daysLeft !== null && daysLeft >= 0 && (
    <div className="w-full text-center bg-slate-800/50 border border-slate-700 rounded-lg p-4 sm:p-5 md:p-6 shadow-lg">
      <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-blue-400 tracking-wider">
        {daysLeft}
      </div>
      <div className="text-xs sm:text-sm md:text-base uppercase tracking-widest text-slate-400 mt-2">
        {daysLeft === 1 ? "Day Left" : "Days Left"}
      </div>
    </div>
  );

  const devProgressWidget = (
    <div className="w-full text-center bg-slate-800/50 border border-slate-700 rounded-lg p-4 sm:p-5 md:p-6 shadow-lg">
      <button
        onClick={handleNavigateToProgress}
        className="w-full sm:w-auto px-6 py-3.5 sm:py-3 md:px-8 md:py-4 text-base sm:text-sm font-semibold bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 transition-colors duration-300 flex items-center justify-center min-h-[44px] sm:min-h-[36px]"
      >
        <span>View Dev Progress</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="ml-2 h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );

  return (
    <div className="relative z-20 min-h-screen flex flex-col lg:block">
      <header className="relative lg:absolute top-0 left-0 w-full p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tighter">
          SyncTeam<span className="text-blue-400">AI</span>
        </h1>
      </header>

      <div
        className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-4 md:left-8 animate-fade-in-up"
        style={{ animationDelay: "0.3s" }}
      >
        {daysLeftWidget}
      </div>
      <div
        className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-4 md:right-8 animate-fade-in-up"
        style={{ animationDelay: "0.3s" }}
      >
        {devProgressWidget}
      </div>

      <main className="flex-grow flex flex-col justify-center items-center px-4 py-8 md:py-0 lg:min-h-screen text-center">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl animate-fade-in-up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-tight">
            What If the Top AIs Worked Together to Solve YOUR Problem?
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-slate-300">
            Multi-AI collaboration is finally here.
          </p>
          <p
            key={subheadingIndex}
            className="mt-4 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-400 min-h-[6rem] animate-fade-in"
          >
            {subheadings[subheadingIndex]}
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
                    <span>Notify Me</span>
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

      <div className="lg:hidden w-full px-4 pb-6 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          {daysLeftWidget}
          {devProgressWidget}
        </div>
      </div>

      <footer className="relative lg:absolute bottom-0 left-0 right-0 p-4 md:p-6 text-center text-slate-400 text-sm mt-16 sm:mt-20 lg:mt-0 py-6 sm:py-4">
        <ShareActions />
        <p>&copy; 2025 NeuroSyncTeam AI Dynamics Pty Ltd. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
