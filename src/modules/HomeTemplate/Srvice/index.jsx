import serviceImg01 from "../../../assets/images/service/09.svg";
import serviceImg02 from "../../../assets/images/service/10.svg";
import serviceImg03 from "../../../assets/images/service/11.svg";
import serviceImg04 from "../../../assets/images/service/12.svg";
import serviceImg05 from "../../../assets/images/service/13.svg";
import serviceImg06 from "../../../assets/images/service/14.svg";
import serviceImg07 from "../../../assets/images/service/13.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
export default function Srvice() {
  return (
    <div className="service-area position-relative rts-section-gapBottom">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-6 col-md-6">
            <div className="title-wrapper-left">
              <span
                className="pre wow fadeInUp"
                data-wow-delay=".2s"
                data-wow-duration=".8s"
              >
                Our Services
              </span>
              <h2
                className="title wow fadeInUp"
                data-wow-delay=".4s"
                data-wow-duration=".8s"
              >
                we provide a wide <br /> range of medical <br /> services
              </h2>
              <p
                className="disc wow fadeInUp"
                data-wow-delay=".6s"
                data-wow-duration=".8s"
              >
                Our experienced and dedicated teams are committed to providing
                comprehensive patient-centered care to meet your unique health
                needs.
              </p>
            </div>
          </div>
          <div
            className="col-lg-3 col-md-6 col-sm-6 wow fadeInUp"
            data-wow-delay=".2s"
            data-wow-duration=".8s"
          >
            <div className="single-service-area">
              <div className="icon">
                <img src={serviceImg01} alt="service" />
              </div>
              <h4 className="title">Cardiology</h4>
              <p className="disc">
                Diagnosis and treatment of heart &amp; cardiovascular
                conditions.
              </p>
              <a href="service-details.html" className="btn-transparent">
                Learn More{" "}
                <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
              </a>
            </div>
          </div>
          <div
            className="col-lg-3 col-md-6 col-sm-6 wow fadeInUp"
            data-wow-delay=".4s"
            data-wow-duration=".8s"
          >
            <div className="single-service-area">
              <div className="icon">
                <img src={serviceImg02} alt="service" />
              </div>
              <h4 className="title">Neurology</h4>
              <p className="disc">
                Diagnosis and treatment of heart &amp; cardiovascular
                conditions.
              </p>
              <a href="service-details.html" className="btn-transparent">
                Learn More{" "}
                <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
              </a>
            </div>
          </div>
          <div
            className="col-lg-3 col-md-6 col-sm-6 wow fadeInUp"
            data-wow-delay=".2s"
            data-wow-duration=".8s"
          >
            <div className="single-service-area">
              <div className="icon">
                <img src={serviceImg03} alt="service" />
              </div>
              <h4 className="title">Dental Care</h4>
              <p className="disc">
                Diagnosis and treatment of heart &amp; cardiovascular
                conditions.
              </p>
              <a href="service-details.html" className="btn-transparent">
                Learn More{" "}
                <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
              </a>
            </div>
          </div>
          <div
            className="col-lg-3 col-md-6 col-sm-6 wow fadeInUp"
            data-wow-delay=".4s"
            data-wow-duration=".8s"
          >
            <div className="single-service-area">
              <div className="icon">
                <img src={serviceImg04} alt="service" />
              </div>
              <h4 className="title">Mental Health</h4>
              <p className="disc">
                Diagnosis and treatment of heart &amp; cardiovascular
                conditions.
              </p>
              <a href="service-details.html" className="btn-transparent">
                Learn More{" "}
                <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
              </a>
            </div>
          </div>
          <div
            className="col-lg-3 col-md-6 col-sm-6 wow fadeInUp"
            data-wow-delay=".6s"
            data-wow-duration=".8s"
          >
            <div className="single-service-area">
              <div className="icon">
                <img src={serviceImg05} alt="service" />
              </div>
              <h4 className="title">Medicine</h4>
              <p className="disc">
                Diagnosis and treatment of heart &amp; cardiovascular
                conditions.
              </p>
              <a href="service-details.html" className="btn-transparent">
                Learn More{" "}
                <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
              </a>
            </div>
          </div>
          <div
            className="col-lg-3 col-md-6 col-sm-6 wow fadeInUp"
            data-wow-delay=".8s"
            data-wow-duration=".8s"
          >
            <div className="single-service-area">
              <div className="icon">
                <img src={serviceImg06} alt="service" />
              </div>
              <h4 className="title">Orthopedics</h4>
              <p className="disc">
                Diagnosis and treatment of heart &amp; cardiovascular
                conditions.
              </p>
              <a href="service-details.html" className="btn-transparent">
                Learn More{" "}
                <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="service-content-iamge">
        <img src={serviceImg07} alt="service" />
      </div>
    </div>
  );
}
