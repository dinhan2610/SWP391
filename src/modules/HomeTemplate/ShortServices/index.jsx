import serviceImg02 from "../../../assets/images/service/02.svg";
import serviceImg01 from "../../../assets/images/service/01.svg";
import serviceImg03 from "../../../assets/images/service/03.svg";
import serviceImg04 from "../../../assets/images/service/04.svg";
import "./index.css";

export default function ShortServices() {
  return (
    <div className="short-service-area rts-section-gap2">
      <div className="container">
        <div className="row g-5">
          <div
            className="col-xl-3 col-lg-4 col-md-6 col-sm-12 wow fadeInRight"
            data-wow-delay=".2s"
            data-wow-duration=".8s"
          >
            <a
              href="/booking-consultation"
              className="single-short-service"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <div className="icon">
                <img src={serviceImg01} alt="Dịch vụ tư vấn" />
              </div>
              <h5
                className="title"
                style={{
                  textAlign: "center",
                  width: "100%",
                  display: "block",
                  margin: "0 auto",
                  fontFamily:
                    "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                  fontWeight: 700,
                  letterSpacing: 0.1,
                }}
              >
                Đặt lịch tư vấn
              </h5>
            </a>
          </div>
          <div
            className="col-xl-3 col-lg-4 col-md-6 col-sm-12 wow fadeInRight"
            data-wow-delay=".4s"
            data-wow-duration=".8s"
          >
            <a
              href="/stis-test"
              className="single-short-service"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <div className="icon">
                <img src={serviceImg02} alt="Xét nghiệm bệnh lây truyền" />
              </div>
              <h5
                className="title"
                style={{
                  textAlign: "center",
                  width: "100%",
                  display: "block",
                  margin: "0 auto",
                  fontFamily:
                    "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                  fontWeight: 700,
                  letterSpacing: 0.1,
                }}
              >
                Dịch vụ xét nghiệm STIs
              </h5>
            </a>
          </div>
          <div
            className="col-xl-3 col-lg-4 col-md-6 col-sm-12 wow fadeInRight"
            data-wow-delay=".6s"
            data-wow-duration=".8s"
          >
            <a
              href="/ovulation"
              className="single-short-service"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <div className="icon">
                <img src={serviceImg03} alt="Theo dõi phát triển thai nhi" />
              </div>
              <h5
                className="title"
                style={{
                  textAlign: "center",
                  width: "100%",
                  display: "block",
                  margin: "0 auto",
                  fontFamily:
                    "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                  fontWeight: 700,
                  letterSpacing: 0.1,
                }}
              >
                Theo dõi chu kỳ
              </h5>
            </a>
          </div>
          <div
            className="col-xl-3 col-lg-4 col-md-6 col-sm-12 wow fadeInRight"
            data-wow-delay=".8s"
            data-wow-duration=".8s"
          >
            <a
              href="/chat"
              className="single-short-service"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <div className="icon">
                <img src={serviceImg04} alt="Hỗ trợ 24/7" />
              </div>
              <h5
                className="title"
                style={{
                  textAlign: "center",
                  width: "100%",
                  display: "block",
                  margin: "0 auto",
                  fontFamily:
                    "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                  fontWeight: 700,
                  letterSpacing: 0.1,
                }}
              >
                Hỗ trợ <br />
                24/7
              </h5>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
