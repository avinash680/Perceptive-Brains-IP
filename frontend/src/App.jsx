import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";

function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useLayoutEffect(() => {
    if (!hash) return;

    const id = hash.replace("#", "");
    const scrollToElement = () => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    scrollToElement();
    const timeout = window.setTimeout(scrollToElement, 100);
    return () => window.clearTimeout(timeout);
  }, [hash, pathname]);

  return null;
}

function App() {
  return (
    <>
      <ScrollToHash />
      <AppRoutes />
    </>
  );
}

export default App;

