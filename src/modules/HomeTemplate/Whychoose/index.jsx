import choose01 from "../../../assets/images/service/icon/01.svg";
import choose02 from "../../../assets/images/service/03.svg";
import choose03 from "../../../assets/images/service/icon/03.svg";
import choose04 from "../../../assets/images/service/icon/04.svg";
import choose07 from "../../../assets/images/feature/01a.png";

export default function WhyChoose() {
  return (
    <div className="why-choose-us-area">
      <div className="container-80">
        <div className="row">
          <div className="col-lg-12">
            <div className="why-choose-area-wrapper bg-light  rts-section-gap ">
              <div className="container">
                <div className="row align-items-end">
                  <div className="col-xl-5 col-lg-6 mb_md--80 mb_sm--60">
                    <div className="why-choose-us-area-wrapper-main">
                      <div className="title-wrapper-left">
                        <h2
                          className="title wow fadeInUp"
                          data-wow-delay=".4s"
                          data-wow-duration=".8s"
                          style={{
                            fontFamily:
                              "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                            fontWeight: 800,
                            fontSize: "3rem",
                            letterSpacing: "0.04em",
                            textAlign: "center",
                            lineHeight: 1.2,
                            color: "#222",
                            margin: "0 0 32px 0",
                            textTransform: "uppercase",
                          }}
                        >
                          Lý do khách hàng tin tưởng chúng tôi
                        </h2>
                      </div>
                      <div className="why-choose-us-main-wrapper">
                        <div
                          className="single-choose-us wow fadeInLeft"
                          data-wow-delay=".2s"
                          data-wow-duration=".8s"
                        >
                          <div className="icon">
                            <img src={choose01} alt="service" />
                          </div>
                          <div className="info">
                            <h6
                              className="title"
                              style={{
                                fontFamily:
                                  "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                                fontWeight: 700,
                                fontSize: "2.6rem",
                                color: "#2563eb",
                                letterSpacing: "0.02em",
                                lineHeight: 1.3,
                                margin: "0 0 8px 0",
                                textAlign: "left",
                                textTransform: "none",
                              }}
                            >
                              Chăm sóc đặt lợi ích bệnh nhân lên hàng đầu
                            </h6>
                            <p>
                              Chúng tôi luôn ưu tiên lắng nghe và đáp ứng nhu
                              cầu của bạn.
                            </p>
                          </div>
                        </div>
                        <div
                          className="single-choose-us wow fadeInLeft"
                          data-wow-delay=".4s"
                          data-wow-duration=".8s"
                        >
                          <div className="icon">
                            <img src={choose02} alt="service" />
                          </div>
                          <div className="info">
                            <h6
                              className="title"
                              style={{
                                fontFamily:
                                  "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                                fontWeight: 700,
                                fontSize: "2.6rem",
                                color: "#2563eb",
                                letterSpacing: "0.02em",
                                lineHeight: 1.3,
                                margin: "0 0 8px 0",
                                textAlign: "left",
                                textTransform: "none",
                              }}
                            >
                              Phản ứng nhanh trong tình huống khẩn cấp
                            </h6>
                            <p>
                              Cam kết hỗ trợ kịp thời khi bạn cần chăm sóc y tế
                              gấp.
                            </p>
                          </div>
                        </div>
                        <div
                          className="single-choose-us wow fadeInLeft"
                          data-wow-delay=".6s"
                          data-wow-duration=".8s"
                        >
                          <div className="icon">
                            <img src={choose03} alt="service" />
                          </div>
                          <div className="info">
                            <h6
                              className="title"
                              style={{
                                fontFamily:
                                  "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                                fontWeight: 700,
                                fontSize: "2.6rem",
                                color: "#2563eb",
                                letterSpacing: "0.02em",
                                lineHeight: 1.3,
                                margin: "0 0 8px 0",
                                textAlign: "left",
                                textTransform: "none",
                              }}
                            >
                              Đội ngũ chuyên môn giàu kinh nghiệm
                            </h6>
                            <p>
                              Đội ngũ y bác sĩ tận tâm, nhiều năm kinh nghiệm,
                              luôn đồng hành cùng bạn.
                            </p>
                          </div>
                        </div>
                        <div
                          className="single-choose-us wow fadeInLeft"
                          data-wow-delay=".8s"
                          data-wow-duration=".8s"
                        >
                          <div className="icon">
                            <img src={choose04} alt="service" />
                          </div>
                          <div className="info">
                            <h6
                              className="title"
                              style={{
                                fontFamily:
                                  "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                                fontWeight: 700,
                                fontSize: "2.6rem",
                                color: "#2563eb",
                                letterSpacing: "0.02em",
                                lineHeight: 1.3,
                                margin: "0 0 8px 0",
                                textAlign: "left",
                                textTransform: "none",
                              }}
                            >
                              Hỗ trợ khẩn cấp 24/7
                            </h6>
                            <p>
                              Luôn sẵn sàng hỗ trợ bạn mọi lúc, đặc biệt trong
                              các tình huống quan trọng.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 offset-xl-1">
                    <div className="right-whychoose-us-style-one">
                      <div className="thumbnail-image">
                        <img
                          src={choose07}
                          alt="medicle"
                          style={{
                            width: "580px",
                            height: "880px",
                            marginLeft: "-300px",
                            borderRadius: "20px",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
