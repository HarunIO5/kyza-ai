import { ReactNode } from "react";

export const CardTitle = ({ children }: { children: ReactNode }) => {
    return (
      <h3 className="mx-auto text-center text-3xl font-semibold text-zinc-950">{children}</h3>
    );
  };