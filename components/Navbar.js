import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-14 bg-white shadow-md z-50 flex justify-between items-center px-6">
      <Link href="/" className="font-bold text-lg">
        MyApp
      </Link>
      <div className="space-x-4">
        <Link href="/shorts" className="text-blue-600 hover:underline">
          Shorts
        </Link>
        <Link href="/news" className="text-blue-600 hover:underline">
          News
        </Link>
      </div>
    </nav>
  );
}
