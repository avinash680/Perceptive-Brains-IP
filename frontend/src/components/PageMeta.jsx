import { useEffect } from "react";

export default function PageMeta({ title, description }) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    if (description) {
      let descriptionTag = document.querySelector('meta[name="description"]');
      if (!descriptionTag) {
        descriptionTag = document.createElement("meta");
        descriptionTag.name = "description";
        document.head.appendChild(descriptionTag);
      }
      descriptionTag.content = description;
    }
  }, [title, description]);

  return null;
}
