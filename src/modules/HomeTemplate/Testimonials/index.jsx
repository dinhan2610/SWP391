import qoutes from '../../../assets/images/testimonials/quotes.png'
import tem01 from '../../../assets/images/testimonials/01.png'
import tem02 from '../../../assets/images/testimonials/02.png'
import tem03 from '../../../assets/images/testimonials/03.png'
import tem04 from '../../../assets/images/testimonials/04.png'
// import { useState } from 'react'
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// import 'swiper/css/navigation';
import "swiper/css/pagination";
// import 'swiper/css/scrollbar';
export default function Testimonials() {
  // const [testimonials] = useState([
  //     {
  //       disc: "Dr. Robert Thompson is an exceptional cardiologist. His ability to explain complex medical issues in a way that's easy to understand is truly impressive.",
  //       author: "David Patel",
  //       image: tem01,
  //     },
  //     {
  //       disc: "An exceptional cardiologist. His ability to explain complex medical issues in a way that's easy to understand is truly impressive.",
  //       author: "Malan Patel",
  //       image: tem03,
  //     },
  //     {
  //       disc: "Dr. Robert Thompson provides outstanding care. His clear explanations of complex heart conditions are remarkable.",
  //       author: "Joker Vandi",
  //       image: tem04,
  //     },
  //     // ... thêm testimonials
  //   ]);

  return (
    <div className="rts-testimonials-area rts-section-gap">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="title-area-center">
              <h2 className="title text-center">
                Words from Our <br /> Patients
              </h2>
            </div>
          </div>
        </div>
        <div className="row mt--0 g-5">
          <div className="col-lg-12">
            <Swiper
              // install Swiper modules
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={50}
              slidesPerView={3}
              navigation
              wrapperClass="swiper-wrapper"
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log("slide change")}
              loop={true}
            >
              <SwiperSlide>
                <div className="single-testimonials-style">
                  <div className="quots">
                    <img
                      src={qoutes}
                      alt="testimonails"
                    />
                  </div>
                  <p className="disc">
                    Dr. Robert Thompson is an exceptional cardiologist. His
                    ability to explain with complex medical issues in a way
                    that&apos;s easy to understand is truly impressive.
                  </p>
                  <div className="author-area">
                    <a href="#" className="img">
                      <img
                        src={tem01}
                        alt="testiminials"
                      />
                    </a>
                    <div className="info">
                      <h6 className="name">David Patel</h6>
                      <div className="stars-area">
                        <i className="fa-sharp fa-solid fa-star" />
                        <i className="fa-sharp fa-solid fa-star" />
                        <i className="fa-sharp fa-solid fa-star" />
                        <i className="fa-sharp fa-solid fa-star" />
                        <i className="fa-sharp fa-solid fa-star" />
                      </div>
                    </div>
                  </div>
                  <div className="shape">
                    <img
                      src={tem02}
                      alt="service"
                    />
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="single-testimonials-style">
                  <div className="quots">
                    <img
                      src={qoutes}
                      alt="testimonails"
                    />
                  </div>
                  <p className="disc">
                    Dr. Robert Thompson is an exceptional cardiologist. His
                    ability to explain with complex medical issues in a way
                    that&apos;s easy to understand is truly impressive.
                  </p>
                  <div className="author-area">
                    <a href="#" className="img">
                      <img
                        src={tem03}
                        alt="testiminials"
                      />
                    </a>
                    <div className="info">
                      <h6 className="name">David Patel</h6>
                      <div className="stars-area">
                        <i className="fa-sharp fa-solid fa-star" />
                        <i className="fa-sharp fa-solid fa-star" />
                        <i className="fa-sharp fa-solid fa-star" />
                        <i className="fa-sharp fa-solid fa-star" />
                        <i className="fa-sharp fa-solid fa-star" />
                      </div>
                    </div>
                  </div>
                  <div className="shape">
                    <img
                      src={tem02}
                      alt="service"
                    />
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="single-testimonials-style">
                  <div className="quots">
                    <img
                      src={qoutes}
                      alt="testimonails"
                    />
                  </div>
                  <p className="disc">
                    Dr. Robert Thompson is an exceptional cardiologist. His
                    ability to explain with complex medical issues in a way
                    that&apos;s easy to understand is truly impressive.
                  </p>
                  <div className="author-area">
                    <a href="#" className="img">
                      <img
                        src={tem04}
                        alt="testiminials"
                      />
                    </a>
                    <div className="info">
                      <h6 className="name">David Patel</h6>
                      <div className="stars-area">
                        <i className="fa-sharp fa-solid fa-star" />
                        <i className="fa-sharp fa-solid fa-star" />
                        <i className="fa-sharp fa-solid fa-star" />
                        <i className="fa-sharp fa-solid fa-star" />
                        <i className="fa-sharp fa-solid fa-star" />
                      </div>
                    </div>
                  </div>
                  <div className="shape">
                    <img
                      src={tem02}
                      alt="service"
                    />
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="single-testimonials-style">
                  <div className="quots">
                    <img
                      src={qoutes}
                      alt="testimonails"
                    />
                  </div>
                  <p className="disc">
                    Dr. Robert Thompson is an exceptional cardiologist. His
                    ability to explain with complex medical issues in a way
                    that&apos;s easy to understand is truly impressive.
                  </p>
                  <div className="author-area">
                    <a href="#" className="img">
                      <img
                        src={tem04}
                        alt="testiminials"
                      />
                    </a>
                    <div className="info">
                      <h6 className="name">David Patel</h6>
                      <div className="stars-area">
                        <i className="fa-sharp fa-solid fa-star" />
                        <i className="fa-sharp fa-solid fa-star" />
                        <i className="fa-sharp fa-solid fa-star" />
                        <i className="fa-sharp fa-solid fa-star" />
                        <i className="fa-sharp fa-solid fa-star" />
                      </div>
                    </div>
                  </div>
                  <div className="shape">
                    <img
                      src={tem02}
                      alt="service"
                    />
                  </div>
                </div>
              </SwiperSlide>
             
              ...
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
