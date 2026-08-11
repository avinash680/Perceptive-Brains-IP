import { useEffect } from "react";
import { Link } from "react-router-dom";

function createBreadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.url,
    })),
  };
}

export default function Breadcrumbs({ items }) {
  useEffect(() => {
    const scriptId = "breadcrumbs-jsonld";
    let script = document.getElementById(scriptId);
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(createBreadcrumbJsonLd(items));

    return () => {
      if (script) {
        script.remove();
      }
    };
  }, [items]);

  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-600">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={item.url} className="inline-flex items-center gap-2">
            {index > 0 && <span aria-hidden="true">/</span>}
            {index < items.length - 1 ? (
              <Link to={item.url} className="text-slate-600 hover:text-slate-900">
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-slate-900">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
