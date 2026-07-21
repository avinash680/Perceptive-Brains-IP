import React from "react";
import {
  ArrowRight,
  Calendar,
  Clock,
  BookOpen,
} from "lucide-react";

const blogs = [
  {
    category: "Patent",
    title: "Complete Guide to Patent Registration in India",
    description:
      "Everything you need to know about patent filing, documentation, examination, and registration process.",
    date: "12 Jul 2026",
    readTime: "8 min read",
  },
  {
    category: "Trademark",
    title: "Trademark Registration: A Beginner's Guide",
    description:
      "Learn how to register and protect your brand identity with trademarks in India.",
    date: "10 Jul 2026",
    readTime: "6 min read",
  },
  {
    category: "Startup IP",
    title: "IP Checklist Every Startup Should Follow",
    description:
      "Essential intellectual property protection strategies before fundraising and launching your business.",
    date: "08 Jul 2026",
    readTime: "7 min read",
  },
  {
    category: "Copyright",
    title: "Why Copyright Registration Matters",
    description:
      "Protect your software, website, books, music, and creative work with copyright registration.",
    date: "06 Jul 2026",
    readTime: "5 min read",
  },
  {
    category: "Patent Search",
    title: "Patentability Search Explained",
    description:
      "Understand novelty searches, prior art, and why patentability searches save time and money.",
    date: "03 Jul 2026",
    readTime: "9 min read",
  },
  {
    category: "International IP",
    title: "PCT Filing for Global Patent Protection",
    description:
      "Expand your innovation worldwide using the Patent Cooperation Treaty (PCT).",
    date: "01 Jul 2026",
    readTime: "10 min read",
  },
];

const BlogSection = () => {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="uppercase tracking-[4px] text-amber-600 font-semibold">
            Latest Articles
          </span>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4">
            Insights & Intellectual Property Resources
          </h2>

          <p className="mt-6 text-gray-600 text-lg leading-8">
            Stay updated with expert insights, patent strategies, trademark
            guides, copyright protection, and the latest developments in
            intellectual property law.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-amber-500 hover:bg-white hover:shadow-xl"
            >
              {/* Image Placeholder */}
              <div className="flex h-56 items-center justify-center bg-gradient-to-br from-amber-500 to-yellow-600">
                <BookOpen
                  size={70}
                  className="text-white opacity-90"
                />
              </div>

              {/* Content */}
              <div className="p-8">
                <span className="inline-block rounded-full bg-amber-100 px-4 py-1 text-sm font-semibold text-amber-600">
                  {blog.category}
                </span>

                <h3 className="mt-5 text-2xl font-semibold text-gray-900 transition-colors group-hover:text-amber-600">
                  {blog.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {blog.description}
                </p>

                <div className="mt-8 flex justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{blog.date}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{blog.readTime}</span>
                  </div>
                </div>

                <button className="mt-8 flex items-center gap-2 font-semibold text-amber-600 transition-all duration-300 group-hover:gap-3">
                  Read Article
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Button */}
        <div className="mt-16 text-center">
          <button className="rounded-lg bg-amber-500 px-8 py-4 font-semibold text-white transition duration-300 hover:bg-amber-600">
            View All Articles
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;