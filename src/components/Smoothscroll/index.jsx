import { useEffect } from "react";

// Bọc nội dung để tạo hiệu ứng cuộn mượt cho toàn bộ trang
const SmoothScrollWrapper = ({ children }) => {
  useEffect(() => {
    const handleWheel = (event) => {
      event.preventDefault();
      const isTrackpad = Math.abs(event.deltaY) < 15; // Nếu là trackpad thì tốc độ cao hơn
      const speedFactor = isTrackpad ? 2000 : 8; // Tăng tốc độ cho trackpad

      window.scrollBy({
        top: event.deltaY * speedFactor,
        behavior: "smooth",
      });
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return <div>{children}</div>;
};

export default SmoothScrollWrapper;
