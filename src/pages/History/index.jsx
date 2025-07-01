import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function History() {
  const location = useLocation();
  const navigate = useNavigate();
  // Lấy danh sách lịch sử đã thanh toán từ state hoặc localStorage
  const history = location.state?.history || [];

  return (
    <div className="container py-5" style={{ maxWidth: 900 }}>
      <div
        style={{
          fontWeight: 900,
          fontSize: 32,
          color: "#615efc",
          fontFamily: "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
          marginBottom: 24,
          letterSpacing: 1,
        }}
      >
        Lịch sử gói xét nghiệm đã thanh toán
      </div>
      {history.length === 0 ? (
        <div style={{ color: "#888", fontSize: 18, fontStyle: "italic" }}>
          Bạn chưa có gói xét nghiệm nào đã thanh toán.
        </div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {history.map((item, idx) => (
            <li
              key={idx}
              className="mb-3 p-3 rounded-4 shadow-sm"
              style={{
                background: "#f8fafc",
                borderLeft: "4px solid #615efc",
                fontSize: 16,
                fontWeight: 600,
                color: "#222",
                fontFamily:
                  "Be Vietnam Pro, Montserrat, Segoe UI, Arial, sans-serif",
              }}
            >
              <div style={{ fontWeight: 800, color: "#615efc", fontSize: 18 }}>
                {idx + 1}. {item.tests.join(", ")}
              </div>
              <div style={{ color: "#16a34a", fontWeight: 700, fontSize: 15 }}>
                Đã thanh toán
              </div>
              <div style={{ color: "#888", fontSize: 14 }}>
                {new Date(item.time).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
                ,{" "}
                {new Date(item.time).toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                })}
              </div>
              <div style={{ color: "#615efc", fontWeight: 700, fontSize: 15 }}>
                Tổng phí: {item.total.toLocaleString()}đ
              </div>
              <div
                style={{
                  color: item.sampleType === "home" ? "#eab308" : "#888",
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                {item.sampleType === "home"
                  ? "Lấy mẫu tại nhà (+50,000đ)"
                  : "Lấy mẫu tại phòng khám"}
              </div>
            </li>
          ))}
        </ul>
      )}
      <button
        className="btn btn-outline-primary mt-4 rounded-pill px-4"
        style={{ fontWeight: 700, fontSize: 16 }}
        onClick={() => navigate(-1)}
      >
        Quay lại
      </button>
    </div>
  );
}
