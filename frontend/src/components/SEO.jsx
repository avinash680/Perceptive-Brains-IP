import { useEffect } from "react";

function setMetaTag(name, content) {
  if (!content) return;
  let tag = document.head.querySelector(`meta[name='${name}']`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.name = name;
    document.head.appendChild(tag);
  }
  tag.content = content;
}

function setPropertyTag(property, content) {
  if (!content) return;
  let tag = document.head.querySelector(`meta[property='${property}']`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }
  tag.content = content;
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

export default function SEO({
  title,
  description,
  url,
  image,
  type = "website",
  twitterCard = "summary_large_image",
  canonical,
}) {
  useEffect(() => {
    if (title) document.title = title;
    setMetaTag("description", description);
    setLinkRel("canonical", canonical || url);
    setPropertyTag("og:title", title);
    setPropertyTag("og:description", description);
    setPropertyTag("og:url", url);
    setPropertyTag("og:type", type);
    setPropertyTag("og:image", image);
    setMetaTag("twitter:card", twitterCard);
    setMetaTag("twitter:title", title);
    setMetaTag("twitter:description", description);
    setMetaTag("twitter:image", image);
  }, [title, description, url, image, type, twitterCard, canonical]);

  return null;
}
