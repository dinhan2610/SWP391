import Aboutus from "./About";
import Booking from "./Booking";
import Carousel from "./Carousel";

import ShortServices from "./ShortServices";
import Feedback from "./Feedback";
import WhyChoose from "./Whychoose";
import WowProvider from "../../components/Wow";
import { useEffect } from "react";

export default function HomeTemplate() {
  useEffect(() => {
    // Giảm tốc độ cuộn riêng cho trang này (chỉ desktop)
    const handleWheel = (e) => {
      if (window.innerWidth > 600) {
        const el = document.scrollingElement || document.documentElement;
        if (el.scrollHeight > el.clientHeight) {
          e.preventDefault();
          const scrollStep = 200;
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
      <WowProvider>
        <Carousel />
        <ShortServices />
        <Aboutus />
        <WhyChoose />
        <Booking />
        <Feedback />
      </WowProvider>
    </>
  );
}
