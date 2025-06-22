import logo2 from "../../assets/images/logo/logo-2.png";
import BacktoTop from "../Backtotop";
export default function Footer() {
  return (
    <div>
      <div className="rts-footer-area footer-bg pt--105 pt_sm--50">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/* subscribe area start */}
              <div className="subscribe-area-start pb--30">
                <a href="#" className="logo">
                  <img src={logo2} alt="logo" />
                </a>
                {/* subscribe area start */}
                {/* subscribe area end */}
              </div>
              {/* subscribe area end */}
            </div>
            <div className="col-lg-12">
              <div className="footer-wrapper-style-between">
                <div className="single-wized">
                  <h6 className="title">Liên hệ</h6>
                  <div className="body">
                    <p className="location">
                      Địa chỉ: 123 Đường Sức Khỏe, Quận 1, TP. Hồ Chí Minh
                    </p>
                    <a href="mailto:info@healthwish.vn">info@healthwish.vn</a>
                    <a href="tel:0123456789">0123 456 789</a>
                  </div>
                </div>
                <div className="single-wized">
                  <h6 className="title">Công ty</h6>
                  <div className="body">
                    <ul className="nav-bottom">
                      <li>
                        <a href="/about">Giới thiệu</a>
                      </li>
                      <li>
                        <a href="/booking-consultation">Đặt lịch hẹn</a>
                      </li>
                      <li>
                        <a href="/contact">Liên hệ</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="single-wized">
                  <h6 className="title">Dịch vụ</h6>
                  <div className="body">
                    <ul className="nav-bottom">
                      <li>
                        <a href="/service-details">
                          Dịch vụ xét nghiệm &amp; STIs
                        </a>
                      </li>
                      <li>
                        <a href="/ovulation">Theo dõi chu kì</a>
                      </li>
                      <li>
                        <a href="/booking-consultation">
                          Hỗ trợ tư vấn sức khỏe
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="single-wized">
                  <h6 className="title">Giờ làm việc</h6>
                  <div className="body">
                    <p className="location">
                      Thời gian làm việc: 8:00 - 20:00 (Thứ 2 - Chủ nhật)
                    </p>
                    <p
                      className="location"
                      style={{ color: "#fff", fontWeight: 600 }}
                    >
                      Hỗ trợ trực tuyến 24/7
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="copyright-area-inner">
                <p>
                  © 2025 Mediweb. Đã đăng ký bản quyền bởi&nbsp;
                  <a
                    target="_blank"
                    href="https://themeforest.net/user/themewant"
                  >
                    ThemeWant
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BacktoTop />
    </div>
  );
}
