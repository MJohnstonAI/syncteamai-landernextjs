import type { ReactNode } from "react";

type AppShellProps = {
  children: ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  return (
    <div
      className="relative min-h-screen w-full bg-slate-900 text-white overflow-hidden"
      style={{ WebkitTextSizeAdjust: "100%" }}
    >
      <div className="absolute inset-0 bg-cover bg-center z-0 animate-zoom-in bg-image-custom"></div>
      <div className="absolute inset-0 bg-black/70 z-10"></div>
      {children}
    </div>
  );
}
