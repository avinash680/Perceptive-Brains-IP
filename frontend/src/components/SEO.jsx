import { useEffect } from "react";
import logo from "../assets/PBIP.png";

function setMetaTag(name, content, attributeName = "name") {
  if (!content) return;
  let tag = document.head.querySelector(`meta[${attributeName}='${name}']`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attributeName, name);
    document.head.appendChild(tag);
  }
  tag.content = content;
}

function setPropertyTag(property, content) {
  setMetaTag(property, content, "property");
}

function setLinkRel(rel, href) {
  if (!href) return;
  let link = document.head.querySelector(`link[rel='${rel}']`);
  if (!link) {
    link = document.createElement("link");
    link.rel = rel;
    document.head.appendChild(link);
  }
  link.href = href;
}

function setStructuredData(data) {
  if (!data) return;
  let script = document.head.querySelector('script[data-seo-schema="true"]');
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-seo-schema", "true");
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

export default function SEO({
  title,
  description,
  url,
  image = logo,
  type = "website",
  twitterCard = "summary_large_image",
  canonical,
  siteName = "Perceptive Brains",
  robots = "index, follow",
  keywords,
}) {
  useEffect(() => {
    const resolvedUrl =
      canonical ||
      url ||
      (typeof window !== "undefined" ? window.location.href : "");
    const origin =
      typeof window !== "undefined"
        ? window.location.origin
        : "https://www.perceptivebrains.com";
    const resolvedImage = image.startsWith("http")
      ? image
      : `${origin}${image}`;
    const organizationSchema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          name: siteName,
          url: origin,
          logo: logo.startsWith("http") ? logo : `${origin}${logo}`,
          description:
            description || "Intellectual property and legal support services.",
          areaServed: "IN",
          address: {
            "@type": "PostalAddress",
            addressCountry: "IN",
          },
        },
        {
          "@type": "WebSite",
          name: siteName,
          url: origin,
          potentialAction: {
            "@type": "SearchAction",
            target: `${origin}/?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        },
      ],
    };

    if (title) document.title = title;
    setMetaTag("description", description);
    setMetaTag("robots", robots);
    setMetaTag("author", siteName);
    setMetaTag("keywords", keywords);
    setLinkRel("canonical", canonical || url || resolvedUrl);
    setLinkRel("sitemap", `${origin}/sitemap.xml`);

    setPropertyTag("og:site_name", siteName);
    setPropertyTag("og:locale", "en_IN");
    setPropertyTag("og:title", title);
    setPropertyTag("og:description", description);
    setPropertyTag("og:url", resolvedUrl);
    setPropertyTag("og:type", type);
    setPropertyTag("og:image", resolvedImage);
    setPropertyTag("og:image:alt", title || siteName);

    setMetaTag("twitter:card", twitterCard);
    setMetaTag("twitter:title", title);
    setMetaTag("twitter:description", description);
    setMetaTag("twitter:image", resolvedImage);
    setMetaTag("twitter:image:alt", title || siteName);

    setStructuredData(organizationSchema);
  }, [
    title,
    description,
    url,
    image,
    type,
    twitterCard,
    canonical,
    siteName,
    robots,
    keywords,
  ]);

  return null;
}
