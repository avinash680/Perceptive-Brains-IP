import { useEffect, useRef, useState } from "react";

export default function useInView(options) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        io.unobserve(node);
      }
    }, options || { threshold: 0.2 });
    io.observe(node);
    return () => io.disconnect();
  }, [options]);

  return [ref, inView];
}
