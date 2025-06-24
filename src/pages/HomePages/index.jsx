import Footer from "../../components/Footer";
import Header from "../../components/Header";
import AIChatbox from "../../components/AIChatbox/AIChatbox";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../../components/ScrollToTop";
import React, { useEffect } from "react";

export default function HomePages() {
  useEffect(() => {
    // Giảm tốc độ cuộn riêng cho trang này (chỉ desktop)
    const handleWheel = (e) => {
      if (window.innerWidth > 600) {
        const el = document.scrollingElement || document.documentElement;
        if (el.scrollHeight > el.clientHeight) {
          e.preventDefault();
          const scrollStep = 130;
          el.scrollBy({
            top: e.deltaY > 0 ? scrollStep : -scrollStep,
            left: 0,
            behavior: "smooth",
          });
        }
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);
  return (
    <>
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
      <AIChatbox />
    </>
  );
}
