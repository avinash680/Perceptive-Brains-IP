import { useState } from "react";

export default function OptimizedImage({
  src,
  alt,
  className = "",
  containerClassName = "",
  loading = "lazy",
  eager = false,
  ...props
}) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-slate-200/70 ${containerClassName}`.trim()}>
      {!loaded && !errored && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200" />
      )}
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : loading}
        decoding="async"
        fetchPriority={eager ? "high" : "auto"}
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        className={`h-full w-full object-cover transition-all duration-500 ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-[1.02]"} ${className}`.trim()}
        {...props}
      />
    </div>
  );
}
