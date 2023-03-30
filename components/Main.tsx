import { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}

export const Main = ({ children }: MainProps) => {
  return (
    <main className="grid flex-grow w-full max-w-2xl gap-6 p-6 mx-auto sm:grid-cols-2">
      {children}
    </main>
  );
};
