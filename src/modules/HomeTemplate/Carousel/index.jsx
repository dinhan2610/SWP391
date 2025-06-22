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
                  style={{
                    marginTop: "-100px",
                    fontFamily:
                      "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                    fontWeight: 800,
                    letterSpacing: 0.5,
                    lineHeight: 1.15,
                  }}
                >
                  Kiểm tra sức khỏe <br />
                  sinh sản của bạn
                </h1>
                <p
                  className="description wow fadeInUp"
                  data-wow-delay=".4s"
                  data-wow-duration=".8s"
                  style={{
                    maxWidth: "550px",
                    marginBottom: "20px",
                    marginTop: "50px",
                    fontFamily: "Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                    fontWeight: 500,
                    color: "#333",
                    letterSpacing: 0.1,
                  }}
                >
                  Chỉ mất 60 giây để biết bạn nên thực hiện những xét nghiệm
                  nào. Không cần đăng ký, hoàn toàn bảo mật.
                </p>

                <div>
                  <form
                    className="select-2"
                    action="/quiz"
                    method="get"
                    acceptCharset="utf-8"
                    style={{
                      marginTop: "50px",
                    }}
                  >
                    <a href="/quiz" className="rts-btn btn-primary">
                      Bắt đầu kiểm tra
                    </a>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
