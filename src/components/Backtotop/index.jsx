import { useState, useEffect } from "react";
export default function BacktoTop() {
  const [progress, setProgress] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const progressPath = document.querySelector(".progress-wrap path");
    if (!progressPath) return; // Handle cases where the element isn't available

    const pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition =
      "none";
    progressPath.style.strokeDasharray = pathLength + " " + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition =
      "stroke-dashoffset 10ms linear";

    const updateProgress = () => {
      const scroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = pathLength - (scroll * pathLength) / height;
      setProgress(progress);
    };

    updateProgress(); // Initial progress calculation
    window.addEventListener("scroll", updateProgress);

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const scrollToTop = (event) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // For smooth scrolling
    });
  };
  return (
    <div>
      <div
        className={`progress-wrap ${isActive ? "active-progress" : ""}`}
        onClick={scrollToTop}
      >
        <svg
          className="progress-circle svg-content"
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
        >
          {" "}
          {/* ViewBox adjusted */}
          <path
            d="M50,10 A40,40 0 1,1 50,90 A40,40 0 1,1 50,10"
            style={{
                strokeDasharray: "251.327 251.327", // Độ dài toàn bộ đường tròn
                strokeDashoffset: progress, // Sử dụng giá trị tính toán từ state
                transition: "stroke-dashoffset 10ms linear 0s",
            }}
          />
        </svg>
        {/* ... (rest of your component JSX) */}
      </div>
    </div>
  );
}
