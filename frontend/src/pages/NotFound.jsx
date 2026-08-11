import { Link } from "react-router-dom";
import SEO from "../components/SEO";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-20 text-slate-900">
      <SEO
        title="404 Not Found | Perceptive Brains"
        description="The page you are looking for does not exist. Find our intellectual property and digital service pages at Perceptive Brains."
        url={window.location.href}
        canonical={window.location.href}
      />
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white px-8 py-16 shadow-lg shadow-slate-200/60 sm:px-12">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">404</p>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          Page not found.
        </h1>
        <p className="mt-6 text-base leading-8 text-slate-600">
          The page you tried to visit does not exist or has been moved. Use the links below to continue exploring our patent, trademark, copyright, and IP consulting services.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <Link to="/" className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
            Home
          </Link>
          <Link to="/services" className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">
            Services
          </Link>
          <Link to="/contact" className="inline-flex items-center justify-center rounded-full border border-transparent bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200">
            Contact us
          </Link>
        </div>
      </div>
    </main>
  );
}
