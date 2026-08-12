import { useEffect } from "react";

function setMetaTag(name, content) {
  if (!content) return;
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.name = name;
    document.head.appendChild(tag);
  }
  tag.content = content;
}

function setPropertyTag(property, content) {
  if (!content) return;
  let tag = document.querySelector(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }
  tag.content = content;
}

export default function PageMeta({
  title,
  description,
  image = "/PBIP.png",
  url,
  canonical,
  siteName = "Perceptive Brains",
}) {
  useEffect(() => {
    const currentUrl = canonical || url || (typeof window !== "undefined" ? window.location.href : "");
    const origin = typeof window !== "undefined" ? window.location.origin : "https://www.perceptivebrains.com";
    const resolvedImage = image.startsWith("http") ? image : `${origin}${image}`;

    if (title) {
      document.title = title;
    }

    if (description) {
      setMetaTag("description", description);
      setMetaTag("robots", "index, follow");
      setMetaTag("author", siteName);
      setPropertyTag("og:title", title);
      setPropertyTag("og:description", description);
      setPropertyTag("og:site_name", siteName);
      setPropertyTag("og:url", currentUrl);
      setPropertyTag("og:image", resolvedImage);
      setPropertyTag("og:type", "website");
      setPropertyTag("og:image:alt", title || siteName);
    }
  }, [title, description, image, url, canonical, siteName]);

  return null;
}
