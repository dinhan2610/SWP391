import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import "./index.css";

export default function ContactPage() {
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
    <div className="contact-page">
      {/* Greeting */}
      <div className="contact-header" style={{ marginBottom: 48 }}>
        <h2
          style={{
            fontSize: 70,
            fontWeight: 800,
            color: "#615efc",
            marginBottom: 18,
            lineHeight: 1.15,
            letterSpacing: 0.5,
            minHeight: 56,
            textAlign: "center",
            fontFamily:
              "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
          }}
        >
          Liên hệ HealthWise Clinic
        </h2>
        <p
          style={{
            fontSize: 20,
            color: "#333",
            fontWeight: 500,
            marginBottom: 32,
          }}
        >
          Bạn có thắc mắc hoặc cần hỗ trợ? Đội ngũ của chúng tôi luôn sẵn sàng
          giúp bạn đặt lịch tư vấn, giải đáp các lựa chọn dịch vụ và nhiều hơn
          nữa.
        </p>
      </div>

      {/* Thông tin liên hệ */}
      <div className="contact-info" style={{ marginBottom: 48 }}>
        <div
          className="info-item"
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: "#222",
            letterSpacing: 0.5,
            fontFamily:
              "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
            marginBottom: 24,
          }}
        >
          <PhoneOutlined
            style={{ color: "#ff4d4f", fontSize: 30, marginRight: 12 }}
          />
          <span>
            Điện thoại:
            <a
              href="tel:0123456789"
              style={{
                color: "#ff4d4f",
                textDecoration: "underline",
                fontWeight: 800,
                fontSize: 24,
                letterSpacing: 1,
                marginLeft: 6,
                fontFamily:
                  "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
              }}
            >
              0123 456 789
            </a>
          </span>
        </div>
        <div
          className="info-item"
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "#444",
            fontFamily:
              "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
            marginBottom: 18,
          }}
        >
          <EnvironmentOutlined
            style={{ color: "#615efc", fontSize: 24, marginRight: 10 }}
          />
          <span>Địa chỉ: 123 Đường Sức Khỏe, Quận 1, TP. Hồ Chí Minh</span>
        </div>
        <div
          className="info-item"
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "#444",
            fontFamily:
              "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
            marginBottom: 18,
          }}
        >
          <MailOutlined
            style={{ color: "#2563eb", fontSize: 24, marginRight: 10 }}
          />
          <span>Email: </span>
          <a
            href="mailto:info@healthwish.vn"
            style={{
              color: "#2563eb",
              fontWeight: 700,
              marginLeft: 4,
              fontFamily:
                "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
            }}
          >
            info@healthwish.vn
          </a>
        </div>
        <div
          className="info-item"
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "#444",
            fontFamily:
              "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
            marginBottom: 0,
          }}
        >
          <ClockCircleOutlined
            style={{ color: "#52c41a", fontSize: 24, marginRight: 10 }}
          />
          <span>Thời gian làm việc: 8:00 - 20:00 (Thứ 2 - Chủ nhật)</span>
        </div>
      </div>

      {/* Bản đồ */}
      <div className="map-embed" style={{ marginBottom: 36 }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.133011003837!2d106.7004233153347!3d10.800995692304073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528d2d1b1b1b1%3A0x123456789abcdef!2zMTIzIE1haW4gU3QsIFRow6BuaCBwaOG7kSDEkOG7kWkgMSwgUXXhuq1uIDEsIEjDoCBO4buZaSBDaMOtbmgsIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1680000000000!5m2!1sen!2s"
          width="100%"
          height="340"
          loading="lazy"
          style={{ border: 0 }}
          allowFullScreen
          title="Vị trí phòng khám"
        ></iframe>
      </div>
    </div>
  );
}
