import person from '../../../assets/images/banner/01.png'
export default function Carousel() {
  return (
    <div className="banner-area-start">
  <div className="container-full-header">
    <div className="row">
      <div className="col-lg-12">
        <div className="banner-area-one rts-section-gap bg_image">
          <div className="banner-content-area">
            <h1 className="title wow fadeInUp" data-wow-delay=".2s" data-wow-duration=".8s">Your Fetus <br />
              Our Priority</h1>
            <div className="select-area-down wow fadeInUp" data-wow-delay=".6s" data-wow-duration=".8s">
              <form className="select-2" action="#" method="get" acceptCharset="utf-8">
                <select name="my_select2" className="my_select2">
                  <option value={2} selected>Select Doctor</option>
                  <option value={10}>Mr.Mark</option>
                  <option value={1}>Mrs. Sajjat</option>
                  <option value={13}>John Dion</option>
                </select>
              </form>
              <a href="#" className="rts-btn btn-primary">Find Doctors</a>
            </div>
          </div>
          {/* person image */}
          <div className="person-image">
            <img src={person} alt="heart" />
          </div>
          {/* person image */}
        </div>
      </div>
    </div>
  </div>
</div>

  )
}
