import { type ReactNode } from "react";

type modalProps = {
  children: ReactNode;
};

export default function Modal({ children}: modalProps) {
  // if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-zinc-50 p-4 rounded w-112.5 shadow-sm">
        {children}
      </div>
    </div>
  );
}
