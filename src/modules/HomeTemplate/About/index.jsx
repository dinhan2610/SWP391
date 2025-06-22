import pic1 from "../../../assets/images/about/01a.png";

export default function Aboutus() {
  return (
    <div>
      <div className="rts-about-area rts-section-gapBottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="about-image-left-wrapper">
                <div className="thumbnail-main move-right wow">
                  <img src={pic1} alt="about" />
                </div>
              </div>
            </div>
            <div className="col-lg-6 offset-lg-1 mt--30">
              <div className="about-content-wrapper-right">
                <div className="title-wrapper-left">
                  <a
                    href="/about"
                    className="pre wow fadeInUp about-link-border"
                    data-wow-delay=".2s"
                    data-wow-duration=".8s"
                  >
                    Giới thiệu
                  </a>
                  <h2
                    className="title wow fadeInUp"
                    data-wow-delay=".4s"
                    data-wow-duration=".8s"
                    style={{
                      fontFamily:
                        "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                      fontWeight: 800,
                      letterSpacing: 0.5,
                      lineHeight: 1.15,
                      fontSize: "40px",
                    }}
                  >
                    Dịch vụ chăm sóc sức khỏe hàng đầu - Lấy bệnh nhân làm trung
                    tâm
                  </h2>
                </div>
                <p
                  className="disc wow fadeInUp"
                  data-wow-delay=".6s"
                  data-wow-duration=".8s"
                >
                  Tại HealthWish, chúng tôi cam kết mang đến dịch vụ chăm sóc
                  sức khỏe xuất sắc, luôn đặt nhu cầu của bệnh nhân lên hàng
                  đầu. Mục tiêu của chúng tôi là nâng cao sức khỏe và chất lượng
                  cuộc sống cho cộng đồng.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
