
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
export default function Pricing() {
  return (
    <div className="pricing-area-start rts-section-gapBottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="title-area-center">
              <h2 className="title text-center">Our Pricing Best Plane</h2>
            </div>
          </div>
        </div>
        <div className="row g-75 mt--0">
          <div
            className="col-lg-4 col-md-6 col-sm-12 wow fadeInUp"
            data-wow-delay=".2s"
            data-wow-duration=".8s"
          >
            <div className="single-pricing-area">
              <div className="pricing-head">
                <span>Basic Plan</span>
                <h2 className="price">$29</h2>
                <p>per/month</p>
              </div>
              <div className="body">
                <p className="disc">
                  Ages16 - 24, Unlimited Play, Junior Golf Program
                </p>
                <div className="single-check">
                  <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                  <span>Echocardiogram</span>
                </div>
                <div className="single-check">
                  <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                  <span>Stress Testing</span>
                </div>
                <div className="single-check">
                  <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                  <span>Cardiac Catheterization</span>
                </div>
                <div className="single-check">
                  <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                  <span>Angioplasty and Stenting</span>
                </div>
                <a href="#" className="rts-btn btn-primary">
                  mua
                </a>
              </div>
            </div>
          </div>
          <div
            className="col-lg-4 col-md-6 col-sm-12 wow fadeInUp"
            data-wow-delay=".4s"
            data-wow-duration=".8s"
          >
            <div className="single-pricing-area active">
              <div className="pricing-head">
                <span>Silver Plan</span>
                <h2 className="price">$66</h2>
                <p>per/month</p>
              </div>
              <div className="body">
                <p className="disc">30 Rounds per Month, Pro Shop Discount</p>
                <div className="single-check">
                  <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                  <span>Echocardiogram</span>
                </div>
                <div className="single-check">
                  <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                  <span>Stress Testing</span>
                </div>
                <div className="single-check">
                  <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                  <span>Cardiac Catheterization</span>
                </div>
                <div className="single-check">
                  <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                  <span>Angioplasty and Stenting</span>
                </div>
                <a href="#" className="rts-btn btn-primary">
                  mua
                </a>
              </div>
            </div>
          </div>
          <div
            className="col-lg-4 col-md-6 col-sm-12 wow fadeInUp"
            data-wow-delay=".6s"
            data-wow-duration=".8s"
          >
            <div className="single-pricing-area">
              <div className="pricing-head">
                <span>Gold Plan</span>
                <h2 className="price">$99</h2>
                <p>per/month</p>
              </div>
              <div className="body">
                <p className="disc">
                  Ages16 - 24, Unlimited Play, Junior Golf Program
                </p>
                <div className="single-check">
                  <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                  <span>Echocardiogram</span>
                </div>
                <div className="single-check">
                  <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                  <span>Stress Testing</span>
                </div>
                <div className="single-check">
                  <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                  <span>Cardiac Catheterization</span>
                </div>
                <div className="single-check">
                  <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                  <span>Angioplasty and Stenting</span>
                </div>
                <a href="#" className="rts-btn btn-primary">
                  mua
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
