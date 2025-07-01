import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function History() {
  const location = useLocation();
  const navigate = useNavigate();
  // Lấy danh sách lịch sử đã thanh toán từ state hoặc localStorage
  const [history, setHistory] = useState([]);

  useEffect(() => {
    let data = location.state?.history;
    if (!data) {
      // Lấy từ localStorage nếu không có trong state
      try {
        const raw = localStorage.getItem("stis_history");
        if (raw) {
          const arr = JSON.parse(raw);
          data = arr.filter((h) => h.paid);
        }
      } catch {
        // ignore
      }
    }
    setHistory(data || []);
  }, [location.state]);

  return (
    <div className="container py-5" style={{ maxWidth: 900 }}>
      <div
        style={{
          fontWeight: 900,
          fontSize: 36,
          color: "#615efc",
          fontFamily: "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
          marginBottom: 32,
          letterSpacing: 1,
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <span style={{ fontSize: 40, color: "#16a34a" }}>🧾</span>
        Lịch sử gói xét nghiệm đã thanh toán
      </div>
      {history.length === 0 ? (
        <div
          style={{
            color: "#888",
            fontSize: 20,
            fontStyle: "italic",
            textAlign: "center",
            marginTop: 60,
          }}
        >
          <span
            style={{
              fontSize: 48,
              display: "block",
              marginBottom: 12,
            }}
          >
            📭
          </span>
          Bạn chưa có gói xét nghiệm nào đã thanh toán.
        </div>
      ) : (
        <div className="row g-4">
          {history.map((item, idx) => (
            <div className="col-12 col-md-6" key={idx}>
              <div
                className="shadow-lg p-4 mb-2 h-100"
                style={{
                  background:
                    "linear-gradient(120deg,#f8fafc 80%,#e0e7ef 100%)",
                  borderRadius: 24,
                  borderLeft: "6px solid #615efc",
                  fontFamily:
                    "Be Vietnam Pro, Montserrat, Segoe UI, Arial, sans-serif",
                  minHeight: 210,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 4px 24px #615efc11",
                  transition: "box-shadow 0.2s, background 0.2s",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 8,
                  }}
                >
                  <span style={{ fontSize: 28, color: "#615efc" }}>🧪</span>
                  <span
                    style={{
                      fontWeight: 800,
                      fontSize: 20,
                      color: "#222",
                    }}
                  >
                    {item.tests.join(", ")}
                  </span>
                </div>
                <div
                  style={{
                    color: "#16a34a",
                    fontWeight: 700,
                    fontSize: 15,
                    marginBottom: 4,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <span style={{ fontSize: 18 }}>✔️</span> Đã thanh toán
                </div>
                <div style={{ color: "#888", fontSize: 15, marginBottom: 2 }}>
                  <span style={{ fontWeight: 600 }}>Ngày đăng ký:</span>{" "}
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
                <div
                  style={{
                    color: "#615efc",
                    fontWeight: 700,
                    fontSize: 16,
                    marginBottom: 2,
                  }}
                >
                  <span style={{ fontWeight: 600 }}>Tổng phí:</span>{" "}
                  {item.total.toLocaleString()}đ
                </div>
                <div
                  style={{
                    color: item.sampleType === "home" ? "#eab308" : "#888",
                    fontSize: 15,
                    fontWeight: 600,
                    marginBottom: 2,
                  }}
                >
                  <span style={{ fontWeight: 600 }}>Phương thức lấy mẫu:</span>{" "}
                  {item.sampleType === "home"
                    ? "Lấy mẫu tại nhà (+50,000đ)"
                    : "Lấy mẫu tại phòng khám"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="text-center mt-5">
        <button
          className="btn btn-outline-primary rounded-pill px-5 py-2"
          style={{
            fontWeight: 800,
            fontSize: 18,
            letterSpacing: 0.5,
          }}
          onClick={() => navigate(-1)}
        >
          ← Quay lại trang đăng ký
        </button>
      </div>
    </div>
  );
}
