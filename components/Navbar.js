import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow p-4 flex justify-between">
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
