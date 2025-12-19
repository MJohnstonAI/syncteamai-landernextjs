"use client";

import { useState } from "react";
import { siteUrl } from "@/lib/site";

declare const gtag: (...args: any[]) => void;

const shareText =
  "Check out SyncTeamAI! Orchestrate teams of specialized AIs to solve complex problems. Join the waitlist:";

const fireGtag = (...args: any[]) => {
  if (typeof gtag === "function") {
    gtag(...args);
  }
};

const IconX = () => (
  <svg
    className="w-8 h-8 sm:w-6 sm:h-6"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M5 5l14 14M19 5L5 19" />
  </svg>
);

const IconFacebook = () => (
  <svg
    className="w-8 h-8 sm:w-6 sm:h-6"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M14 7h3V4h-3c-2.8 0-5 2.2-5 5v2H7v3h2v6h3v-6h3l1-3h-4V9c0-1.1.9-2 2-2z" />
  </svg>
);

const IconLinkedIn = () => (
  <svg
    className="w-8 h-8 sm:w-6 sm:h-6"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    aria-hidden="true"
  >
    <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
    <circle cx="8.5" cy="9" r="1.25" fill="currentColor" stroke="none" />
    <rect x="7.25" y="11" width="2.5" height="6.5" fill="currentColor" stroke="none" />
    <path d="M12 11h2c1.7 0 3 1.3 3 3v3.5h-2.5V14c0-.8-.7-1.5-1.5-1.5h-1V17.5H12z" fill="currentColor" stroke="none" />
  </svg>
);

const IconWhatsApp = () => (
  <svg
    className="w-8 h-8 sm:w-6 sm:h-6"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M12 4a8 8 0 0 0-6.9 12l-.8 3 3.1-.8A8 8 0 1 0 12 4z" />
    <path d="M9.7 9.2c.2-.4.4-.5.8-.5h.6c.2 0 .5 0 .7.4l.9 2c.1.3.1.6-.1.8l-.5.6c.6 1.1 1.5 2 2.6 2.6l.6-.5c.2-.2.5-.2.8-.1l2 .9c.3.2.4.5.4.7v.6c0 .4-.1.6-.5.8-.6.4-1.3.5-2 .3-3.2-.9-5.8-3.5-6.7-6.7-.2-.7-.1-1.4.3-1.9z" />
  </svg>
);

const IconCopy = () => (
  <svg
    className="w-8 h-8 sm:w-6 sm:h-6"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M13.8 10.2a4 4 0 0 0-5.6 0l-4 4a4 4 0 1 0 5.6 5.6l1.1-1.1" />
    <path d="M10.2 13.8a4 4 0 0 0 5.6 0l4-4a4 4 0 1 0-5.6-5.6l-1.1 1.1" />
  </svg>
);

export default function ShareActions() {
  const [isCopied, setIsCopied] = useState(false);

  const encodedUrl = encodeURIComponent(siteUrl);
  const encodedText = encodeURIComponent(`${shareText} ${siteUrl}`);
  const encodedTweet = encodeURIComponent(shareText);

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(siteUrl);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = siteUrl;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      fireGtag("event", "share", { method: "Copy Link", content_type: "website" });
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  return (
    <div className="flex justify-center items-center gap-6 mb-2">
      <a
        href={`https://x.com/intent/tweet?text=${encodedTweet}&url=${encodedUrl}`}
        onClick={() => fireGtag("event", "click_social", { platform: "X" })}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        className="text-white hover:text-yellow-400 transition-colors"
      >
        <IconX />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        onClick={() => fireGtag("event", "click_social", { platform: "Facebook" })}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className="text-white hover:text-yellow-400 transition-colors"
      >
        <IconFacebook />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        onClick={() => fireGtag("event", "click_social", { platform: "LinkedIn" })}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="text-white hover:text-yellow-400 transition-colors"
      >
        <IconLinkedIn />
      </a>
      <a
        href={`https://wa.me/?text=${encodedText}`}
        onClick={() => fireGtag("event", "share", { method: "WhatsApp", content_type: "website" })}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on WhatsApp"
        className="text-white hover:text-yellow-400 transition-colors"
      >
        <IconWhatsApp />
      </a>
      <button
        type="button"
        onClick={handleCopyLink}
        aria-label="Copy page link"
        className="text-white hover:text-yellow-400 transition-all flex items-center gap-2"
      >
        {isCopied ? (
          <>
            <svg
              className="w-8 h-8 sm:w-6 sm:h-6 text-green-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-green-400 text-xs">Copied!</span>
          </>
        ) : (
          <IconCopy />
        )}
      </button>
    </div>
  );
}
