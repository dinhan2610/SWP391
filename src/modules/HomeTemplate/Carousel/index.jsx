export default function Carousel() {
  return (
    <div className="banner-area-start">
      <div className="container-full-header">
        <div className="row">
          <div className="col-lg-12">
            <div className="banner-area-one rts-section-gap bg_image">
              <div className="banner-content-area">
                <h1
                  className="title wow fadeInUp"
                  data-wow-delay=".2s"
                  data-wow-duration=".8s"
                >
                  Book now <br />
                  with our experts
                </h1>
                <div
                  className="select-area-down wow fadeInUp"
                  data-wow-delay=".6s"
                  data-wow-duration=".8s"
                >
                  <form
                    className="select-2"
                    action="#"
                    method="get"
                    acceptCharset="utf-8"
                  >
                    <select name="my_select2" className="my_select2">
                      <option value={2} selected>
                        Select Doctor
                      </option>
                      <option value={10}>Mr. Mark</option>
                      <option value={1}>Mrs. Sajjat</option>
                      <option value={13}>John Dion</option>
                      <option value={2}>Dr. Emily Smith</option>
                      <option value={3}>Dr. Michael Johnson</option>
                      <option value={4}>Dr. Sarah Brown</option>
                      <option value={5}>Dr. David Lee</option>
                      <option value={6}>Dr. Linda Williams</option>
                      <option value={7}>Dr. James Taylor</option>
                      <option value={8}>Dr. Rachel Clark</option>
                      <option value={9}>Dr. Robert Garcia</option>
                    </select>
                  </form>
                  <a href="#" className="rts-btn btn-primary">
                    Find Doctors
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
