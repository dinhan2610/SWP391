import choose01 from "../../../assets/images/service/icon/01.svg";
import choose02 from "../../../assets/images/service/03.svg";
import choose03 from "../../../assets/images/service/icon/03.svg";
import choose04 from "../../../assets/images/service/icon/04.svg";
import choose05 from "../../../assets/images/feature/02.webp";
import choose06 from "../../../assets/images/feature/03.svg";
import choose07 from "../../../assets/images/feature/01.webp";
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
                        >
                          Why Our Patients Recommend Us
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
                            <h6 className="title">Patient-Centered Care</h6>
                            <p>
                              Emphasize your commitment to patient well-being
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
                            <h6 className="title">Emergency Support</h6>
                            <p>
                              Emphasize your commitment to patient well-being
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
                            <h6 className="title">Expertise and Experience</h6>
                            <p>
                              Emphasize your commitment to patient well-being
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
                            <h6 className="title">24/7 hour Emergency Call</h6>
                            <p>
                              Emphasize your commitment to patient well-being
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 offset-xl-1">
                    <div className="right-whychoose-us-style-one">
                      <div className="feature-bg-primary">
                        <img src={choose05} alt="medicle" />
                      </div>
                      <div className="thumbnail-image">
                        <img src={choose07} alt="medicle" />
                      </div>
                      <div className="inner-content">
                        <div className="top">
                          <h3 className="title">Hello</h3>
                          <div className="time-shedule">
                            <img src={choose06} alt="medicle" />
                            <span>24/7</span>
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
      </div>
    </div>
  );
}
