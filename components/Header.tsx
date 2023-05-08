import Link from "next/link";
import { CartBar } from "./Cart/CartBar";

export const Header = () => {
  return (
    <header className="flex items-center justify-between w-full mx-auto bg-gray-700">
      <nav className="flex gap-5 px-4 py-4 text-white">
        <Link href="/">Główna</Link>
        <Link href="/about">About</Link>
        <Link href="/products">Products</Link>
      </nav>
      <CartBar />
    </header>
  );
};
