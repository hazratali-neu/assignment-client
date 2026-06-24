import Link from "next/link";

export const metadata = {
  title: "StudyNook - Page Not Found",
};
export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-slate-800 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <h1 className="text-7xl md:text-8xl font-extrabold bg-linear-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
          404
        </h1>

        <h2 className="mt-4 text-3xl font-bold text-white">
          Page Not Found
        </h2>

        <p className="mt-3 text-gray-400 leading-relaxed">
          Oops! The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/20"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}