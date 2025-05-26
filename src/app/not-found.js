"use client";

import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-black text-center px-4 py-10">
      <Image
        src="https://tse1.mm.bing.net/th?id=OIP.U7DPOFSxptQeZHc8K0rorwHaE8&pid=Api&P=0&h=180"
        alt="404 Not Found"
        width={400}
        height={400}
        className="mb-8 rounded-lg shadow-xl"
      />

      <h1 className="text-4xl md:text-5xl font-bold text-pink-500 mb-4">Oops! Page Not Found</h1>
      <p className="text-zinc-300 mb-6 text-lg max-w-xl">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <Link
        href="/"
        className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-6 rounded-full transition"
      >
        Go to Home
      </Link>
    </section>
  );
}
