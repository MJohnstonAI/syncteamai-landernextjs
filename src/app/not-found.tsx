import Link from "next/link";
import AppShell from "@/components/AppShell";

export default function NotFound() {
  return (
    <AppShell>
      <div className="relative z-20 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-xl text-center bg-slate-800/50 border border-slate-700 rounded-lg p-6 md:p-8 shadow-2xl">
          <h1 className="text-3xl md:text-4xl font-bold">Page not found</h1>
          <p className="mt-3 text-sm md:text-base text-slate-300">
            The page you are looking for does not exist. Head back to the waiting list to stay in the loop.
          </p>
          <Link
            href="/"
            className="inline-flex mt-6 px-6 py-3 text-sm font-semibold bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500 transition-colors"
          >
            Return to the waiting list
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
