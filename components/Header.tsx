import Link from "next/link";

export const Header = () => {
  return (
    <header className="w-full max-w-md mx-auto">
      <nav className="px-4 py-4 text-white bg-gray-700 ">
        <Link href="/">Główna</Link>
        <Link href="/about">About</Link>
      </nav>
    </header>
  );
};
