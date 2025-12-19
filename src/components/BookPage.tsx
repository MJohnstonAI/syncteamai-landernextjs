import Image from "next/image";
import Link from "next/link";

const bookUrl = "https://www.amazon.com/dp/B0G2FJ39G7";

const learnBullets = [
  "Write prompts that are clear, reusable, and testable.",
  "Design multi-agent workflows that check and refine each other.",
  "Create evaluation loops that improve outputs without guesswork.",
  "Translate real business goals into reliable prompt systems.",
  "Avoid common failure modes like hallucinations and prompt drift.",
];

const audienceBullets = [
  "Product builders exploring AI-assisted workflows.",
  "Teams adopting multi-agent systems in practice.",
  "Founders shaping new AI-first experiences.",
  "Researchers and educators teaching applied prompting.",
  "Anyone moving from beginner to confident practitioner.",
];

const BookPage = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 z-20 animate-fade-in-up">
      <header className="absolute top-0 left-0 p-4 md:p-8">
        <div className="text-2xl md:text-3xl font-bold tracking-tighter">
          SyncTeam<span className="text-blue-400">AI</span>
        </div>
      </header>

      <main className="w-full max-w-5xl bg-slate-800/50 border border-slate-700 rounded-lg p-6 md:p-8 shadow-2xl">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold">Let the AIs Teach You Prompt Engineering</h1>
          <p className="mt-3 text-base md:text-lg text-slate-300">
            A practical guide to prompt engineering from beginner to pro, including multi-agent thinking.
          </p>
          <p className="mt-4 text-sm md:text-base text-slate-300">
            This book pairs with the SyncTeamAI Conference by giving you the foundations now, so you can arrive ready
            to participate in deeper workflows, live collaborations, and real-world use cases.
          </p>
          <a
            href={bookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex mt-6 px-6 py-3 text-sm font-semibold bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500 transition-colors"
          >
            Buy on Amazon
          </a>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold">What you will learn</h2>
            <ul className="mt-4 space-y-2 text-sm md:text-base text-slate-300">
              {learnBullets.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-blue-400">-</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Who it is for</h2>
            <ul className="mt-4 space-y-2 text-sm md:text-base text-slate-300">
              {audienceBullets.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-blue-400">-</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 items-center">
          <div className="overflow-hidden rounded-lg border border-slate-700 bg-slate-900/60 p-4">
            <div className="relative w-full max-w-sm mx-auto" style={{ aspectRatio: "2 / 3" }}>
              <Image
                src="/images/ebookcover.webp"
                alt="Prompt engineering book cover"
                fill
                sizes="(min-width: 768px) 240px, 70vw"
                className="object-contain"
                priority
              />
            </div>
          </div>
          <div className="space-y-4 text-sm md:text-base text-slate-300">
            <p>
              Use the book to build your prompt engineering muscle now, then apply those skills live when the conference
              launches.
            </p>
            <a
              href={bookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex px-6 py-3 text-sm font-semibold bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500 transition-colors"
            >
              Buy on Amazon
            </a>
            <div>
              <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">
                Back to the waiting list
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookPage;



