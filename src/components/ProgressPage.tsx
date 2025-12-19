import Link from "next/link";

type Status = "done" | "in-progress" | "outstanding";

const StatusIcon = ({ status }: { status: Status }) => {
  if (status === "done") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-green-400 flex-shrink-0"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    );
  }
  if (status === "in-progress") {
    return (
      <svg
        className="animate-spin h-5 w-5 text-yellow-400 flex-shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-label="In Progress"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    );
  }
  if (status === "outstanding") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-slate-500 flex-shrink-0"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 5a1 1 0 112 0v6a1 1 0 11-2 0V5zm1 11a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
          clipRule="evenodd"
        />
      </svg>
    );
  }
  return null;
};

const phases: { num: number; title: string; description: string; status: Status }[] = [
  { num: 1, title: "Foundational Pages", description: "Build Lander, Conference, and Template pages.", status: "done" },
  { num: 2, title: "Core Infrastructure", description: "Set up database for prompt scripts, user registration, and AI conference sessions.", status: "done" },
  { num: 3, title: "Multi-Agent Integration", description: "Incorporate multi-user AI API and implement the selection process for AI agents.", status: "done" },
  { num: 4, title: "Agent Personalization", description: "Develop AI agent avatars.", status: "done" },
  { num: 5, title: "Collaboration Logic", description: "Develop core code for agent interaction and collaboration processes.", status: "done" },
  { num: 6, title: "User Features", description: "Implement features for subscribers to save, share, and export conference chat sessions.", status: "done" },
  { num: 7, title: "Production Migration", description: "Migrate development database to a secure Supabase instance for production.", status: "done" },
  { num: 8, title: "Advanced Agent Configuration", description: "Set up database tables to assign role behaviors (e.g., Innovator, Sceptic) and skills (e.g., Economist, Developer) to AI avatars.", status: "in-progress" },
  { num: 9, title: "Monetization", description: "Integrate a global payment and subscription system.", status: "outstanding" },
  { num: 10, title: "Scheduling System", description: "Implement a calendar booking system for multi-AI collaboration conferences.", status: "outstanding" },
  { num: 11, title: "Quality Assurance", description: "Conduct pre-market release and Q&A testing.", status: "outstanding" },
];

const statusMap: Record<Status, { text: string; color: string }> = {
  done: { text: "Done", color: "text-green-400" },
  "in-progress": { text: "Under Development", color: "text-yellow-400" },
  outstanding: { text: "Outstanding", color: "text-slate-500" },
};

const ProgressPage = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 z-20 animate-fade-in-up">
      <header className="absolute top-0 left-0 p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tighter">
          SyncTeam<span className="text-blue-400">AI</span>
        </h1>
      </header>

      <main className="w-full max-w-4xl bg-slate-800/50 border border-slate-700 rounded-lg p-6 md:p-8 shadow-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Development Progress</h2>
        <div className="space-y-4">
          {phases.map((phase) => (
            <div key={phase.num} className="flex items-start gap-4 p-4 bg-slate-900/50 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-blue-400">
                {phase.num}
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold text-lg">{phase.title}</h3>
                <p className="text-slate-400 text-sm">{phase.description}</p>
              </div>
              <div className={`flex items-center gap-2 text-sm font-medium ${statusMap[phase.status].color}`}>
                <StatusIcon status={phase.status} />
                <span>{statusMap[phase.status].text}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="px-6 py-3 font-semibold bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500 transition-colors duration-300 flex items-center justify-center mx-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Return to Home</span>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default ProgressPage;
