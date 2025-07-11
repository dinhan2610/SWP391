// components/Button/StyledButton.jsx
import React from "react";
import { Button } from "antd";
import { BorderColor, Opacity } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// Định nghĩa màu sắc cho các loại button
const buttonStyles = {
  default: {
    backgroundColor: "white",
  },
  hover: {
    border: "1px solid #615EFC",
    color: "#615EFC",
  },
  danger: {
    backgroundColor: "white",
    color: "red",
    border: "1px solid red",
  },
  dangerHover: {
    opacity: "0.2",
  },
};

/**
 * StyledButton - Component nút có style riêng
 * @param {string} type - Loại nút: "default" hoặc "danger"
 * @param {function} onClick - Hàm gọi khi bấm nút
 * @param {string} className - Class của Bootstrap (btn-primary, btn-outline, ...)
 * @param {string} children - Nội dung nút
 */
const StyledButton = ({
  className,
  type = "default",
  onClick,
  children,
  to,
  onCloseDrawer,
}) => {
  const navigate = useNavigate();
  const baseStyle =
    type === "danger" ? buttonStyles.danger : buttonStyles.default;
  const hoverStyle =
    type === "danger" ? buttonStyles.dangerHover : buttonStyles.hover;

  const handleClick = () => {
    if (to) {
      navigate(to); // Chuyển hướng nếu có đường dẫn
    }
    if (onClick) {
      onClick(); // Gọi hàm onClick nếu có
    }
    if (onCloseDrawer) {
      onCloseDrawer(); // Tắt Drawer sau khi nhấn
    }
  };

  return (
    <Button
      block
      style={{
        ...baseStyle,
        fontWeight: 600,
        fontFamily: "Montserrat, Arial, sans-serif",
        transition: "all 0.18s cubic-bezier(.4,0,.2,1)",
      }}
      className={className}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = hoverStyle.backgroundColor;
        e.target.style.fontWeight = "700";
        e.target.style.color = type === "danger" ? "#e74c3c" : "#2563eb";
        e.target.style.boxShadow = "0 2px 12px #2563eb22";
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = baseStyle.backgroundColor;
        e.target.style.fontWeight = "600";
        e.target.style.color = type === "danger" ? "#e74c3c" : "#2563eb";
        e.target.style.boxShadow = "none";
      }}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};

export default StyledButton;
