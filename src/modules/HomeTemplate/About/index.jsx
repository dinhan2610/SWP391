import pic1 from '../../../assets/images/about/01.jpg'
import arrowup from '../../../assets/images/banner/icons/arrow--up-right.svg'
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
                  <span
                    className="pre wow fadeInUp"
                    data-wow-delay=".2s"
                    data-wow-duration=".8s"
                  >
                    About Us
                  </span>
                  <h2
                    className="title wow fadeInUp"
                    data-wow-delay=".4s"
                    data-wow-duration=".8s"
                  >
                    Providing Exceptional <br /> Healthcare with a focus <br />{" "}
                    on patient.
                  </h2>
                </div>
                <p
                  className="disc wow fadeInUp"
                  data-wow-delay=".6s"
                  data-wow-duration=".8s"
                >
                  At Mediweb, our mission is to provide exceptional healthcare
                  services with a focus on patient-centered care. We are
                  dedicated to improving the health and well-being of our
                  community through.
                </p>
                <div
                  className="button-wrapper wow fadeInUp"
                  data-wow-delay=".8s"
                  data-wow-duration=".8s"
                >
                  <a href="about.html" className="rts-btn btn-primary">
                    About Us{" "}
                    <img
                      src={arrowup}
                      alt
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
