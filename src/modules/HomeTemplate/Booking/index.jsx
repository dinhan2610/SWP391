export default function Booking() {
  return (
    <div className="request-appoinment-area rts-section-gapBottom">
      <div className="container">
        <div
          className="row"
          style={{
            justifyContent: "center",
            alignItems: "center",
            minHeight: "70vh",
          }}
        >
          <div className="col-lg-12">
            <div className="request-appoinemnt-area-main-wrapper bg_image rts-section-gap">
              <p
                style={{
                  fontSize: "60px",
                  marginBottom: "65px",
                  color: "#fbbf24", // vàng cam nổi bật trên nền xanh
                  fontWeight: 800,
                  fontFamily:
                    "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                  letterSpacing: 0.2,
                  textAlign: "center",
                  lineHeight: 1.2,
                  textShadow:
                    "0 4px 16px rgba(251,191,36,0.18), 0 2px 8px rgba(14,165,233,0.08)",
                }}
              >
                Chào mừng bạn đến với Phòng khám HealthWise!
              </p>

              <h2
                className="title"
                style={{
                  marginBottom: "65px", // tăng khoảng cách với nút
                  fontSize: "56px",
                  fontWeight: 900,
                  fontFamily:
                    "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                  letterSpacing: 0.1,
                  textAlign: "center",
                  lineHeight: 1.2,
                  color: "#fff",
                  textShadow: "0 2px 8px rgba(0,0,0,0.18)",
                }}
              >
                Tư vấn & <br />
                <span
                  style={{
                    fontSize: "46px",
                    color: "#fff",
                    fontWeight: 900,
                    textShadow: "0 2px 8px rgba(0,0,0,0.28)",
                  }}
                >
                  Đặt lịch dễ dàng
                </span>
              </h2>

              <a
                href="/booking-consultation"
                className="rts-btn btn-primary"
                style={{
                  display: "block",
                  margin: "0 auto",
                  fontSize: "20px",
                  fontWeight: 700,
                  fontFamily:
                    "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                  letterSpacing: 0.1,
                  padding: "16px 44px",
                  borderRadius: "32px",
                  background: "#fff",
                  color: "#111",
                  border: "none",
                  boxShadow: "0 4px 16px 0 rgba(14,165,233,0.12)",
                  transition: "background 0.3s, color 0.3s, box-shadow 0.3s",
                }}
                onMouseOver={(e) => {
                  e.target.style.background = "#111";
                  e.target.style.color = "#fff";
                  e.target.style.boxShadow =
                    "0 6px 24px 0 rgba(14,165,233,0.18)";
                }}
                onMouseOut={(e) => {
                  e.target.style.background = "#fff";
                  e.target.style.color = "#111";
                  e.target.style.boxShadow =
                    "0 4px 16px 0 rgba(14,165,233,0.12)";
                }}
                onFocus={(e) => {
                  e.target.style.background = "#111";
                  e.target.style.color = "#fff";
                  e.target.style.boxShadow =
                    "0 6px 24px 0 rgba(14,165,233,0.18)";
                }}
                onBlur={(e) => {
                  e.target.style.background = "#fff";
                  e.target.style.color = "#111";
                  e.target.style.boxShadow =
                    "0 4px 16px 0 rgba(14,165,233,0.12)";
                }}
              >
                Đặt lịch tư vấn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
