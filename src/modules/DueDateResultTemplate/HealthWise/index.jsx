import React from "react";
import { Row, Col, Card, Typography } from "antd";
import { SquirrelIcon as Sagittarius, Diamond, Music } from "lucide-react";

function Link({ href, children }) {
  return (
    <a href={href} className="text-primary text-decoration-underline">
      {children}
    </a>
  );
}

const { Title, Text } = Typography;

export default function HealthWiseTimeline() {
  return (
    <div className="container bg-white p-4" style={{ maxWidth: "960px" }}>
      <div className="mb-5">
        <Title level={4} className="fw-bold mb-3">
          Đang mong có thai?
        </Title>
        <p>
          <Link href="/ovulation">Công cụ Tính ngày rụng trứng</Link> sẽ giúp
          bạn biết những ngày dễ thụ thai nhất và ngày dự sinh cho 6 chu kỳ tiếp
          theo.
        </p>
        <p>
          Ngoài ra, bạn có thể tìm hiểu mất bao lâu để thụ thai, cách{" "}
          <Link href="#">có thai nhanh</Link> và{" "}
          <Link href="#">10 dấu hiệu mang thai phổ biến</Link>.
        </p>

        {/* App promo */}
        <div className="row bg-light p-3 rounded-3 mt-4 align-items-center">
          <div className="col-md-6 mb-3 mb-md-0">
            <p className="fw-semibold mb-2">
              Theo dõi thai kỳ của bạn miễn phí trên
            </p>
            <p className="fw-bold fs-5 mb-3">Ứng dụng thai sản & em bé số 1</p>
            <img
              src="/placeholder.svg"
              alt="Mã QR"
              className="img-fluid"
              style={{ maxWidth: "128px" }}
            />
          </div>
          <div className="col-md-6 text-center">
            <img
              src="/placeholder.svg"
              alt="Ảnh ứng dụng"
              className="img-fluid"
              style={{ maxWidth: "200px" }}
            />
          </div>
        </div>
      </div>

      <Title level={2} className="fw-bold mb-4">
        Dòng thời gian thai kỳ
      </Title>

      <div className="mb-5">
        <Title level={4} className="text-success mb-1">
          Tam cá nguyệt đầu tiên
        </Title>
        <p className="text-muted small mb-4">13/03/2025 đến 05/06/2025</p>

        <div>
          <TimelineItem
            month="Mar"
            day="13"
            weeks="2 tuần"
            description={
              <>
                Bé của bạn đã được <Link href="#">thụ thai</Link>
              </>
            }
          />

          <TimelineItem
            month="Mar"
            day="27"
            weeks="4 tuần"
            description={
              <>
                Bạn sẽ có <Link href="#">kết quả thử thai dương tính</Link>
              </>
            }
          />

          <TimelineItem
            month="Apr"
            day="10"
            weeks="6 tuần"
            description={
              <>
                Các tế bào ở <Link href="#">tim tương lai của bé</Link> bắt đầu
                đập
              </>
            }
          />

          <TimelineItem
            month="Apr"
            day="10"
            weeks="6-8 tuần"
            description={
              <>
                Bạn có thể đi <Link href="#">khám thai lần đầu</Link>
              </>
            }
          />

          <TimelineItem
            month="May"
            day="8"
            weeks="10 tuần"
            description={
              <>
                Bạn sẽ được đề nghị làm <Link href="#">NIPT</Link> (xét nghiệm
                tiền sản không xâm lấn)
              </>
            }
          />

          <TimelineItem
            month="May"
            day="8"
            weeks="10-13 tuần"
            description={
              <>
                Bạn có thể chọn làm <Link href="#">CVS</Link> (sinh thiết gai
                nhau)
              </>
            }
          />

          <TimelineItem
            month="May"
            day="15"
            weeks="11-14 tuần"
            description={
              <>
                Bạn có thể làm <Link href="#">siêu âm đo độ mờ da gáy</Link> và
                xét nghiệm máu
              </>
            }
          />

          <TimelineItem
            month="May"
            day="22"
            weeks="12 tuần"
            description={
              <>
                Bạn có thể <Link href="#">nghe tim thai</Link> bằng Doppler
              </>
            }
          />
        </div>
      </div>

      <div className="mb-5">
        <Title level={4} className="text-success mb-1">
          Tam cá nguyệt thứ hai
        </Title>
        <p className="text-muted small mb-4">05/06/2025 đến 11/09/2025</p>

        <div>
          <TimelineItem
            month="Jun"
            day="12"
            weeks="15-20 tuần"
            description={
              <>
                Bạn có thể làm <Link href="#">chọc ối</Link>
              </>
            }
          />

          <TimelineItem
            month="Jun"
            day="19"
            weeks="16-18 tuần"
            description={
              <>
                Bạn có thể làm xét nghiệm <Link href="#">quad scan</Link>
              </>
            }
          />

          <TimelineItem
            month="Jun"
            day="19"
            weeks="16-22 tuần"
            description={
              <>
                Bạn có thể <Link href="#">cảm nhận bé đạp</Link>
              </>
            }
          />

          <TimelineItem
            month="Jul"
            day="3"
            weeks="18-22 tuần"
            description={
              <>
                Bạn sẽ được <Link href="#">siêu âm giữa thai kỳ</Link>
              </>
            }
          />

          <TimelineItem
            month="Aug"
            day="7"
            weeks="23 tuần"
            description={
              <>
                Bé có thể <Link href="#">nghe bạn nói chuyện</Link>
              </>
            }
          />

          <TimelineItem
            month="Aug"
            day="14"
            weeks="24-28 tuần"
            description={
              <>
                <Link href="#">Tầm soát tiểu đường thai kỳ</Link>
              </>
            }
          />

          <TimelineItem
            month="Sep"
            day="4"
            weeks="27 tuần"
            description={
              <>
                Bé sẽ <Link href="#">mở mắt</Link>
              </>
            }
          />
        </div>
      </div>

      {/* Third Trimester */}
      <div className="mb-5">
        <Title level={4} className="text-success mb-1">
          Tam cá nguyệt thứ ba
        </Title>
        <p className="text-muted small mb-4">11/09/2025 đến 04/12/2025</p>

        <div>
          <TimelineItem
            month="Sep"
            day="11"
            weeks="28 tuần"
            description={
              <>
                Bạn sẽ đi khám thai định kỳ 2 tuần/lần cho đến tuần 36, sau đó
                mỗi tuần 1 lần
              </>
            }
          />

          <TimelineItem
            month="Sep"
            day="11"
            weeks="28 tuần"
            description={
              <>
                Nếu bạn <Link href="#">Rh âm</Link>, bạn sẽ được tiêm Rh immune
                globulin (RhoGAM)
              </>
            }
          />

          <TimelineItem
            month="Oct"
            day="23"
            weeks="34 tuần"
            description={
              <>
                Bé đã có <Link href="#">móng tay</Link>
              </>
            }
          />

          <TimelineItem
            month="Nov"
            day="6"
            weeks="36-37 tuần"
            description={
              <>
                Bạn sẽ được tầm soát <Link href="#">liên cầu khuẩn nhóm B</Link>
              </>
            }
          />

          <TimelineItem
            month="Nov"
            day="13"
            weeks="37 tuần"
            description={
              <>
                Bé của bạn là <Link href="#">giai đoạn đủ sớm</Link>
              </>
            }
          />

          <TimelineItem
            month="Nov"
            day="27"
            weeks="39 tuần"
            description={
              <>
                Bé của bạn là <Link href="#">đủ tháng</Link>
              </>
            }
          />

          <TimelineItem
            month="Dec"
            day="4"
            weeks="40 tuần / Sơ sinh"
            description={
              <>
                Bé của bạn <Link href="#">đến ngày dự sinh!</Link>
              </>
            }
          />

          <TimelineItem
            month="Dec"
            day="11"
            weeks="41 tuần"
            description={
              <>
                Nếu bạn chưa chuyển dạ, có thể sẽ được{" "}
                <Link href="#">kích sinh</Link>
              </>
            }
          />
        </div>
      </div>

      {/* Fun facts section */}
      <div>
        <Title level={4} className="fw-bold mb-4">
          Những điều thú vị về các bé sinh ngày 4/12
        </Title>

        <div className="border-top pt-4 pb-4">
          <div className="row">
            <div className="col-auto">
              <div
                className="rounded-3 d-flex justify-content-center align-items-center"
                style={{
                  backgroundColor: "#1E90FF",
                  width: 48,
                  height: 48,
                }}
              >
                <Sagittarius color="#fff" size={24} />
              </div>
            </div>
            <div className="col">
              <p className="text-primary fw-medium mb-1">Cung hoàng đạo</p>
              <h5 className="fw-bold mb-1">Nhân Mã</h5>
              <p>Bé sẽ là người ngăn nắp, biết giúp đỡ và thông minh.</p>
            </div>
          </div>
        </div>

        <div className="border-top pt-4 pb-4">
          <div className="row">
            <div className="col-auto">
              <div
                className="rounded-3 d-flex justify-content-center align-items-center"
                style={{
                  backgroundColor: "#4B0082",
                  width: 48,
                  height: 48,
                }}
              >
                <Diamond color="#fff" size={24} />
              </div>
            </div>
            <div className="col">
              <p className="text-primary fw-medium mb-1">Đá sinh</p>
              <h5 className="fw-bold mb-1">Tanzanite</h5>
              <p>
                Loại đá quý này có màu xanh lam và tím đậm, chỉ tìm thấy ở một
                vùng nhỏ của Tanzania.
              </p>
            </div>
          </div>
        </div>

        <div className="border-top pt-4 pb-4">
          <div className="row">
            <div className="col-auto">
              <div
                className="rounded-3 d-flex justify-content-center align-items-center"
                style={{
                  backgroundColor: "#FFA500",
                  width: 48,
                  height: 48,
                }}
              >
                <Music color="#fff" size={24} />
              </div>
            </div>
            <div className="col">
              <p className="text-primary fw-medium mb-1">
                Người nổi tiếng sinh ngày 4/12
              </p>
              <h5 className="fw-bold mb-1">Jay-Z</h5>
              <p>
                Anh sinh ngày 4/12/1969 tại New York City. Jay-Z là một trong
                những nghệ sĩ âm nhạc bán chạy nhất thế giới và được xem là một
                trong những rapper vĩ đại nhất mọi thời đại.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** TimelineItem component (dùng antd Card + Bootstrap) */
function TimelineItem({ month, day, weeks, description }) {
  return (
    <Card className="mb-3 border-0 shadow-sm">
      <Row gutter={[16, 16]} align="middle">
        {/* Cột hiển thị tháng, ngày */}
        <Col xs={4} sm={3} md={2} className="text-center">
          <Text type="secondary" className="d-block">
            {month}
          </Text>
          <Title level={4} className="m-0">
            {day}
          </Title>
        </Col>

        {/* Cột hiển thị tuần & mô tả */}
        <Col xs={20} sm={21} md={22}>
          <Text type="secondary" className="small d-block mb-1">
            {weeks}
          </Text>
          <div>{description}</div>
        </Col>
      </Row>
    </Card>
  );
}
