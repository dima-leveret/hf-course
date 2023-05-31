import { ReactNode } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

interface MainProps {
  children: ReactNode;
}

export const Layout = ({ children }: MainProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
};
