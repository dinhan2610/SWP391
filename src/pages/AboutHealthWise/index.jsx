import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Form, Input, Typography } from "antd";
import "./index.css";

export default function AboutHealthWise() {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
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
    <div className="about-us-page">
      {/* About Section */}
      <div className="about-section">
        <div className="container">
          <div className="row">
            {/* Image Section */}
            <div className="col-lg-6 image-section">
              <div className="image-wrapper">
                <img
                  src="/abouthealthwise/01.png"
                  alt="Giới thiệu"
                  className="about-image"
                />
              </div>
            </div>
            {/* Text Content Section */}
            <div className="col-lg-6 content-section">
              <div className="content-wrapper">
                <h2
                  className="about-title"
                  style={{
                    textAlign: "center",
                    fontFamily:
                      "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                    fontWeight: 800,
                    letterSpacing: 0.2,
                    color: "#111",
                    fontSize: "3.3rem",
                  }}
                >
                  Dịch vụ chăm sóc sức khỏe hàng đầu, lấy bệnh nhân làm trung
                  tâm.
                </h2>
                <p
                  className="about-description"
                  style={{
                    textAlign: "center",
                    fontFamily:
                      "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                    fontWeight: 500,
                    letterSpacing: 0.1,
                  }}
                >
                  Tại HealthWish, chúng tôi cam kết mang đến dịch vụ y tế xuất
                  sắc, luôn đặt nhu cầu của bệnh nhân lên hàng đầu. Mục tiêu của
                  chúng tôi là nâng cao sức khỏe và chất lượng cuộc sống cho
                  cộng đồng.
                </p>
                <a
                  href="#"
                  onClick={handleShowModal}
                  className="about-link"
                  style={{
                    display: "block",
                    textAlign: "center",
                    fontFamily:
                      "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                    fontWeight: 600,
                    letterSpacing: 0.1,
                  }}
                >
                  Xem thêm
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Full Content */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              textAlign: "center",
              width: "100%",
              fontFamily:
                "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
              fontWeight: 800,
              letterSpacing: 0.2,
              color: "#111",
              fontSize: "2rem",
            }}
          >
            Về HealthWish
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4
            style={{
              textAlign: "center",
              fontFamily:
                "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
              fontWeight: 700,
              letterSpacing: 0.1,
              color: "#111",
            }}
          >
            Cam kết của chúng tôi
          </h4>
          <p
            style={{
              textAlign: "center",
              fontFamily:
                "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
              fontWeight: 500,
              letterSpacing: 0.1,
            }}
          >
            Tại HealthWish, chúng tôi cam kết mang đến dịch vụ y tế xuất sắc,
            luôn đặt nhu cầu của bệnh nhân lên hàng đầu. Dịch vụ của chúng tôi
            kết hợp chuyên môn y tế với sự tận tâm, nhằm nâng cao sức khỏe và
            chất lượng cuộc sống cho từng cá nhân và cộng đồng.
          </p>
          <h4
            style={{
              textAlign: "center",
              fontFamily:
                "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
              fontWeight: 700,
              letterSpacing: 0.1,
              color: "#111",
            }}
          >
            Lấy bệnh nhân làm trung tâm
          </h4>
          <p
            style={{
              textAlign: "center",
              fontFamily:
                "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
              fontWeight: 500,
              letterSpacing: 0.1,
            }}
          >
            Chúng tôi tin rằng mọi quyết định đều hướng đến lợi ích, nhu cầu và
            giá trị của từng bệnh nhân, cùng nhau xây dựng một tương lai khỏe
            mạnh hơn cho tất cả mọi người.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCloseModal}
            style={{
              transition:
                "background 0.18s cubic-bezier(.4,2,.6,1.2), color 0.18s cubic-bezier(.4,2,.6,1.2)",
              background: "#615efc",
              color: "#fff",
              border: "none",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "#111";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "#615efc";
              e.currentTarget.style.color = "#fff";
            }}
          >
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Mission Section */}
      <div className="mission-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 image-section">
              <img
                src="/abouthealthwise/05.png"
                alt="Sứ mệnh"
                className="about-image"
              />
            </div>
            <div className="col-lg-6 content-section">
              <h2
                className="section-title"
                style={{
                  textAlign: "center",
                  fontFamily:
                    "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                  fontWeight: 800,
                  letterSpacing: 0.2,
                  color: "#111",
                  fontSize: "4rem",
                }}
              >
                Sứ mệnh của chúng tôi
              </h2>
              <p
                className="section-description"
                style={{
                  textAlign: "center",
                  fontFamily:
                    "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                  fontWeight: 500,
                  letterSpacing: 0.1,
                }}
              >
                Sứ mệnh của chúng tôi là cung cấp dịch vụ y tế chất lượng cao,
                nhân ái và dễ tiếp cận cho mọi cá nhân, gia đình, góp phần nâng
                cao sức khỏe cộng đồng.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="vision-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 image-section">
              <img
                src="/abouthealthwise/06.png"
                alt="Tầm nhìn"
                className="about-image"
              />
            </div>
            <div className="col-lg-6 content-section">
              <h2
                className="section-title"
                style={{
                  textAlign: "center",
                  fontFamily:
                    "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                  fontWeight: 800,
                  letterSpacing: 0.2,
                  color: "#111",
                  fontSize: "4rem",
                }}
              >
                Tầm nhìn
              </h2>
              <p
                className="section-description"
                style={{
                  textAlign: "center",
                  fontFamily:
                    "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                  fontWeight: 500,
                  letterSpacing: 0.1,
                }}
              >
                Tầm nhìn của chúng tôi là trở thành đơn vị chăm sóc sức khỏe
                hàng đầu khu vực, thúc đẩy lối sống lành mạnh thông qua dịch vụ
                lấy bệnh nhân làm trung tâm, công nghệ hiện đại và chú trọng
                phòng ngừa bệnh tật.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="values-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 image-section">
              <img
                src="/abouthealthwise/07.png"
                alt="Giá trị cốt lõi"
                className="about-image"
              />
            </div>
            <div className="col-lg-6 content-section">
              <h2
                className="section-title"
                style={{
                  textAlign: "center",
                  fontFamily:
                    "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                  fontWeight: 800,
                  letterSpacing: 0.2,
                  color: "#111",
                  fontSize: "4rem",
                }}
              >
                Giá trị cốt lõi
              </h2>
              <ul
                className="values-list"
                style={{
                  fontFamily:
                    "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                  fontWeight: 500,
                  letterSpacing: 0.1,
                }}
              >
                <li>
                  <strong>Nhân ái:</strong> Chúng tôi tin vào việc đối xử với
                  mọi bệnh nhân bằng sự tử tế, tôn trọng và nhân phẩm.
                </li>
                <li>
                  <strong>Chính trực:</strong> Chúng tôi hành động trung thực và
                  minh bạch trong mọi tương tác.
                </li>
                <li>
                  <strong>Đổi mới:</strong> Chúng tôi luôn cập nhật các tiến bộ
                  mới nhất trong y học để mang lại dịch vụ tốt nhất.
                </li>
                <li>
                  <strong>Hợp tác:</strong> Chúng tôi làm việc cùng nhau, cả
                  trong tổ chức và với bệnh nhân, để đạt kết quả sức khỏe tối
                  ưu.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="team-section">
        <div className="container">
          <h2
            className="section-title"
            style={{
              textAlign: "center",
              fontFamily:
                "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
              fontWeight: 800,
              letterSpacing: 0.2,
              color: "#111",
              fontSize: "4rem",
              marginBottom: 80, // tăng khoảng cách dưới tiêu đề
            }}
          >
            Đội ngũ của chúng tôi
          </h2>
          <div className="row" style={{ gap: 0 }}>
            <div className="col-md-4 team-member" style={{ marginBottom: 32 }}>
              <div className="team-member-photo" style={{ marginBottom: 24 }}>
                <img
                  src="/abouthealthwise/02.png"
                  className="about-image-doctor"
                  alt="Bác sĩ Sarah Lee"
                />
              </div>
              <h3
                className="team-member-name"
                style={{
                  textAlign: "center",
                  fontFamily:
                    "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                  fontWeight: 700,
                  letterSpacing: 0.1,
                }}
              >
                Bác sĩ Sarah Lee
              </h3>
              <p
                className="team-member-position"
                style={{
                  textAlign: "center",
                  fontFamily:
                    "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                  fontWeight: 500,
                  letterSpacing: 0.1,
                }}
              >
                Giám đốc Y khoa
              </p>
            </div>
            <div className="col-md-4 team-member" style={{ marginBottom: 32 }}>
              <div className="team-member-photo" style={{ marginBottom: 24 }}>
                <img
                  src="/abouthealthwise/03.png"
                  className="about-image-doctor"
                  alt="Bác sĩ James Taylor"
                />
              </div>
              <h3
                className="team-member-name"
                style={{
                  textAlign: "center",
                  fontFamily:
                    "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                  fontWeight: 700,
                  letterSpacing: 0.1,
                }}
              >
                Bác sĩ James Taylor
              </h3>
              <p
                className="team-member-position"
                style={{
                  textAlign: "center",
                  fontFamily:
                    "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                  fontWeight: 500,
                  letterSpacing: 0.1,
                }}
              >
                Điều dưỡng trưởng
              </p>
            </div>
            <div className="col-md-4 team-member" style={{ marginBottom: 32 }}>
              <div className="team-member-photo" style={{ marginBottom: 24 }}>
                <img
                  src="/abouthealthwise/04.png"
                  className="about-image-doctor"
                  alt="Bác sĩ Michael Johnson"
                />
              </div>
              <h3
                className="team-member-name"
                style={{
                  textAlign: "center",
                  fontFamily:
                    "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                  fontWeight: 700,
                  letterSpacing: 0.1,
                }}
              >
                Bác sĩ Michael Johnson
              </h3>
              <p
                className="team-member-position"
                style={{
                  textAlign: "center",
                  fontFamily:
                    "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                  fontWeight: 500,
                  letterSpacing: 0.1,
                }}
              >
                Quản lý Y tế
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="contact-section" style={{ marginTop: "0" }}>
        <div className="container-contact" style={{ marginTop: "-50px" }}>
          <h2
            className="section-title"
            style={{
              textAlign: "center",
              fontFamily:
                "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
              fontWeight: 800,
              letterSpacing: 0.2,
              color: "#111",
              fontSize: "2.2rem",
              marginTop: 0,
              marginBottom: 16,
            }}
          >
            <a
              href="/contact"
              className="contact-button-link"
              style={{ color: "inherit" }}
            >
              Liên hệ với chúng tôi
              <i className="fas fa-arrow-right"></i>
            </a>
          </h2>
          <p
            className="section-description"
            style={{
              textAlign: "center",
              fontFamily:
                "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
              fontWeight: 500,
              letterSpacing: 0.1,
              marginBottom: 12,
              marginTop: 0,
            }}
          >
            Bạn có thắc mắc? Hãy liên hệ với chúng tôi, đội ngũ của chúng tôi
            luôn sẵn sàng hỗ trợ bạn.
          </p>

          {/* Contact Information Section */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
              margin: "24px 0 32px 0",
            }}
          >
            <div
              style={{
                fontFamily:
                  "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                fontWeight: 600,
                color: "#222",
                fontSize: 18,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <i
                className="fas fa-map-marker-alt"
                style={{ color: "#615efc", fontSize: 22 }}
              ></i>
              Địa chỉ: 123 Đường Sức Khỏe, Quận 1, TP. Hồ Chí Minh
            </div>
            <div
              style={{
                fontFamily:
                  "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                fontWeight: 600,
                color: "#222",
                fontSize: 18,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <i
                className="fas fa-phone-alt"
                style={{ color: "#615efc", fontSize: 20 }}
              ></i>
              Điện thoại:
              <a
                href="tel:0123456789"
                style={{
                  color: "#615efc",
                  textDecoration: "none",
                  fontWeight: 700,
                  marginLeft: 4,
                }}
              >
                0123 456 789
              </a>
            </div>
            <div
              style={{
                fontFamily:
                  "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                fontWeight: 600,
                color: "#222",
                fontSize: 18,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <i
                className="fas fa-envelope"
                style={{ color: "#615efc", fontSize: 20 }}
              ></i>
              Email:
              <a
                href="mailto:info@healthwish.vn"
                style={{
                  color: "#615efc",
                  textDecoration: "none",
                  fontWeight: 700,
                  marginLeft: 4,
                }}
              >
                info@healthwish.vn
              </a>
            </div>
            <div
              style={{
                fontFamily:
                  "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                fontWeight: 600,
                color: "#222",
                fontSize: 18,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <i
                className="fas fa-clock"
                style={{ color: "#615efc", fontSize: 20 }}
              ></i>
              Thời gian làm việc: 8:00 - 20:00 (Thứ 2 - Chủ nhật)
            </div>
          </div>

          {/* Gửi tin nhắn cho chúng tôi button to hơn */}
          <h3
            style={{
              textAlign: "center",
              fontFamily:
                "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
              fontWeight: 700,
              letterSpacing: 0.1,
            }}
          >
            <button
              onClick={() => (window.location.href = "/message")}
              style={{
                margin: "32px auto 0 auto",
                display: "block",
                padding: "20px 56px",
                fontFamily:
                  "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                fontWeight: 800,
                fontSize: "1.5rem",
                letterSpacing: 0.12,
                color: "#fff",
                background: "linear-gradient(90deg, #615efc 0%, #6e8efb 100%)",
                border: "none",
                borderRadius: 40,
                boxShadow: "0 6px 24px rgba(97,94,252,0.16)",
                cursor: "pointer",
                transition:
                  "background 0.18s cubic-bezier(.4,2,.6,1.2), transform 0.18s cubic-bezier(.4,2,.6,1.2)",
                minWidth: 320,
                maxWidth: "90vw",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "#111";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.transform = "scale(1.06)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(90deg, #615efc 0%, #6e8efb 100%)";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              Gửi tin nhắn cho chúng tôi
              <i
                className="fas fa-paper-plane"
                style={{ marginLeft: 12, fontSize: "1.3em" }}
              ></i>
            </button>
          </h3>
        </div>
      </div>
    </div>
  );
}
