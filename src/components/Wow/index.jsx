import { useEffect } from "react";
import WOW from "wowjs";

// Provider để tự động khởi tạo hiệu ứng WOW.js cho toàn bộ children
const WowProvider = ({ children }) => {
  useEffect(() => {
    // Khởi tạo hiệu ứng WOW.js (hiệu ứng animation khi cuộn trang)
    const wow = new WOW.WOW({ live: false });
    wow.init();
  }, []);

  return <>{children}</>;
};

export default WowProvider;
