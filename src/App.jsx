import AIChatbox from "./components/AIChatbox/AIChatbox";
import "./App.css";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    // Tìm phần tử cuộn gần nhất
    function getScrollableParent(node) {
      while (node && node !== document.body) {
        const style = window.getComputedStyle(node);
        const overflowY = style.overflowY;
        if (
          (overflowY === "auto" || overflowY === "scroll") &&
          node.scrollHeight > node.clientHeight
        ) {
          return node;
        }
        node = node.parentElement;
      }
      return document.scrollingElement || document.documentElement;
    }
    const handleWheel = (e) => {
      if (window.innerWidth > 600) {
        let target = e.target;
        let scrollEl = getScrollableParent(target);
        if (scrollEl) {
          e.preventDefault();
          const scrollStep = 5;
          scrollEl.scrollBy({
            top: e.deltaY > 0 ? scrollStep : -scrollStep,
            left: 0,
            behavior: "smooth",
          });
        }
      }
    };
    document.addEventListener("wheel", handleWheel, { passive: false });
    return () => document.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <>
      {/* Main app content */}
      {/* Router outlet will be rendered here */}
      <AIChatbox />
    </>
  );
}
