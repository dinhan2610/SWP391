import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Typography,
  Input,
  Select,
  Checkbox,
  Button,
  Space,
  Radio,
  Row,
  Col,
  Form,
  DatePicker,
  message,
} from "antd";
import {
  CreditCardOutlined,
  QrcodeOutlined,
  MobileOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const QR_IMAGE = "https://img.vietqr.io/image/970422-123456789-compact2.png"; // demo QR
const MOMO_IMAGE = "https://static.mservice.io/img/logo-momo.png";

const DUMMY_ORDER = {
  name: "Gói Xét Nghiệm Tổng Quát",
  price: 1200000,
  time: "24-48h",
  desc: "Bao gồm 7 mục xét nghiệm STIs, kết quả bảo mật, tư vấn miễn phí.",
};

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Lấy thông tin đơn hàng từ state nếu có
  const order =
    location.state && location.state.tests
      ? {
          name: `Xét nghiệm: ${location.state.tests.join(", ")}`,
          price: location.state.total,
          time: location.state.time
            ? new Date(location.state.time).toLocaleString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
              })
            : "-",
          desc: `Gồm ${location.state.tests.length} mục xét nghiệm STIs, kết quả bảo mật, tư vấn miễn phí.`,
          paid: location.state.paid,
          tests: location.state.tests,
        }
      : DUMMY_ORDER;
  const [paymentMethod, setPaymentMethod] = useState("momo");
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    // Giảm tốc độ cuộn riêng cho trang này (chỉ desktop)
    const handleWheel = (e) => {
      if (window.innerWidth > 600) {
        const el = document.scrollingElement || document.documentElement;
        if (el.scrollHeight > el.clientHeight) {
          e.preventDefault();
          const scrollStep = 130;
          el.scrollBy({
            top: e.deltaY > 0 ? scrollStep : -scrollStep,
            left: 0,
            behavior: "smooth",
          });
        }
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);
  // eslint-disable-next-line no-unused-vars
  const onFinish = (_values) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success("Thanh toán thành công!");
      form.resetFields();
      // Sau khi thanh toán thành công, chuyển về STIsTest và truyền lại đơn hàng đã thanh toán
      if (order && order.tests) {
        navigate("/stis-test", {
          state: {
            paidOrder: {
              ...order,
              paid: true,
            },
          },
        });
      }
    }, 1200);
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "40px auto",
        background: "#fff",
        borderRadius: 20,
        boxShadow: "0 4px 24px #615efc22",
        padding: 32,
        fontFamily: "Be Vietnam Pro, Montserrat, Segoe UI, Arial, sans-serif",
      }}
    >
      {/* 1. Thông tin đơn hàng */}
      <div
        style={{
          marginBottom: 32,
          borderBottom: "1.5px solid #e0e7ef",
          paddingBottom: 20,
        }}
      >
        <div
          style={{
            fontWeight: 900,
            fontSize: 26,
            color: "#615efc",
            marginBottom: 8,
            letterSpacing: 1,
            textShadow: "0 2px 8px #e0e7ef",
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          🧾 Thông tin đơn hàng
        </div>
        <div
          style={{
            fontWeight: 800,
            fontSize: 20,
            color: "#222",
            marginBottom: 2,
            textAlign: "center",
          }}
        >
          {order.name}
        </div>
        {order.tests && (
          <div
            style={{
              color: "#444",
              fontSize: 16,
              fontWeight: 500,
              textAlign: "center",
              marginBottom: 2,
            }}
          >
            {order.tests.map((t, i) => (
              <span key={t}>
                {t}
                {i < order.tests.length - 1 ? ", " : ""}
              </span>
            ))}
          </div>
        )}
        <div
          style={{
            color: "#444",
            fontSize: 16,
            fontWeight: 500,
            textAlign: "center",
            marginBottom: 2,
          }}
        >
          {order.desc}
        </div>
        <div
          style={{
            color: "#888",
            fontSize: 15,
            textAlign: "center",
            marginBottom: 2,
          }}
        >
          Thời gian đăng ký: <b style={{ color: "#222" }}>{order.time}</b>
        </div>
        {location.state && location.state.sampleType && (
          <div
            style={{
              color: location.state.sampleType === "home" ? "#eab308" : "#888",
              fontSize: 15,
              textAlign: "center",
              fontWeight: 600,
              marginBottom: 2,
            }}
          >
            {location.state.sampleType === "home"
              ? "Phương thức lấy mẫu: Lấy mẫu tại nhà (+50,000đ)"
              : "Phương thức lấy mẫu: Lấy mẫu tại phòng khám"}
          </div>
        )}
        <div
          style={{
            fontWeight: 900,
            fontSize: 22,
            color: "#16a34a",
            marginTop: 8,
            textAlign: "center",
            letterSpacing: 0.5,
          }}
        >
          Tổng tiền:{" "}
          <span style={{ color: "#615efc", fontSize: 24 }}>
            {order.price.toLocaleString()}đ
          </span>
        </div>
        {order.paid && (
          <div
            style={{
              color: "#16a34a",
              fontWeight: 700,
              fontSize: 17,
              textAlign: "center",
              marginTop: 6,
            }}
          >
            Đã thanh toán
          </div>
        )}
      </div>
      {/* 2. Chọn phương thức thanh toán */}
      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            fontWeight: 800,
            fontSize: 19,
            color: "#615efc",
            marginBottom: 10,
            letterSpacing: 0.5,
            textTransform: "uppercase",
          }}
        >
          💳 Chọn phương thức thanh toán
        </div>
        <Radio.Group
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          style={{ width: "100%" }}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <Radio
              value="momo"
              style={{
                border: "1.5px solid #e0e7ef",
                padding: "14px 32px",
                borderRadius: 14,
                width: "100%",
                fontWeight: 700,
                fontSize: 16,
                color: paymentMethod === "momo" ? "#615efc" : "#222",
                background: paymentMethod === "momo" ? "#f5f7ff" : "#fff",
                transition: "all 0.2s",
              }}
            >
              <img
                src={MOMO_IMAGE}
                alt="momo"
                style={{ width: 32, marginRight: 10, verticalAlign: "middle" }}
              />{" "}
              Ví MoMo
            </Radio>
            <Radio
              value="qr"
              style={{
                border: "1.5px solid #e0e7ef",
                padding: "14px 32px",
                borderRadius: 14,
                width: "100%",
                fontWeight: 700,
                fontSize: 16,
                color: paymentMethod === "qr" ? "#615efc" : "#222",
                background: paymentMethod === "qr" ? "#f5f7ff" : "#fff",
                transition: "all 0.2s",
              }}
            >
              <QrcodeOutlined
                style={{
                  fontSize: 22,
                  color: paymentMethod === "qr" ? "#615efc" : "#222",
                  marginRight: 10,
                  verticalAlign: "middle",
                }}
              />{" "}
              QR Code (VNPay)
            </Radio>
            <Radio
              value="paypal"
              style={{
                border: "1.5px solid #e0e7ef",
                padding: "14px 32px",
                borderRadius: 14,
                width: "100%",
                fontWeight: 700,
                fontSize: 16,
                color: paymentMethod === "paypal" ? "#615efc" : "#222",
                background: paymentMethod === "paypal" ? "#f5f7ff" : "#fff",
                transition: "all 0.2s",
              }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/PayPal_logo.svg/2560px-PayPal_logo.svg.png"
                alt="paypal"
                style={{
                  marginRight: 10,
                  width: 80,
                  height: 32,
                  verticalAlign: "middle",
                }}
              />{" "}
              PayPal
            </Radio>
            <Radio
              value="card"
              style={{
                border: "1.5px solid #e0e7ef",
                padding: "14px 32px",
                borderRadius: 14,
                width: "100%",
                fontWeight: 700,
                fontSize: 16,
                color: paymentMethod === "card" ? "#615efc" : "#222",
                background: paymentMethod === "card" ? "#f5f7ff" : "#fff",
                transition: "all 0.2s",
              }}
            >
              <CreditCardOutlined
                style={{
                  fontSize: 20,
                  color: paymentMethod === "card" ? "#615efc" : "#222",
                  marginRight: 10,
                  verticalAlign: "middle",
                }}
              />{" "}
              Thẻ ngân hàng
            </Radio>
          </Space>
        </Radio.Group>
      </div>
      {/* 3. Giao diện động theo phương thức */}
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        autoComplete="off"
        style={{ fontFamily: "inherit" }}
      >
        <Row gutter={[12, 0]}>
          {/* MoMo */}
          {paymentMethod === "momo" && (
            <Col span={24} style={{ textAlign: "center", margin: "16px 0" }}>
              <img
                src={MOMO_IMAGE}
                alt="MoMo"
                style={{ width: 60, marginBottom: 8 }}
              />
              <div
                style={{
                  fontWeight: 700,
                  color: "#615efc",
                  fontSize: 17,
                  marginBottom: 2,
                }}
              >
                Số điện thoại nhận:{" "}
                <span style={{ color: "#222" }}>0935994475</span>
              </div>
              <div style={{ color: "#888", fontSize: 15, marginBottom: 2 }}>
                Hoặc quét mã QR MoMo bên dưới
              </div>
              <img
                src={QR_IMAGE}
                alt="QR MoMo"
                style={{
                  width: 180,
                  margin: "8px auto 0",
                  borderRadius: 12,
                  boxShadow: "0 2px 8px #615efc22",
                }}
              />
            </Col>
          )}
          {/* QR code VNPay */}
          {paymentMethod === "qr" && (
            <Col span={24} style={{ textAlign: "center", margin: "16px 0" }}>
              <img
                src={QR_IMAGE}
                alt="QR ngân hàng"
                style={{
                  width: 180,
                  marginBottom: 8,
                  borderRadius: 12,
                  boxShadow: "0 2px 8px #615efc22",
                }}
              />
              <div
                style={{
                  fontWeight: 700,
                  color: "#615efc",
                  fontSize: 17,
                  marginBottom: 2,
                }}
              >
                Quét mã QR để thanh toán qua VNPay
              </div>
              <div style={{ color: "#888", fontSize: 15 }}>
                Vui lòng nhập đúng nội dung chuyển khoản để xác nhận
              </div>
            </Col>
          )}
          {/* PayPal */}
          {paymentMethod === "paypal" && (
            <Col span={24} style={{ textAlign: "center", margin: "16px 0" }}>
              <div
                style={{
                  fontWeight: 700,
                  color: "#615efc",
                  fontSize: 17,
                  marginBottom: 2,
                }}
              >
                Bạn sẽ được chuyển đến cổng PayPal để hoàn tất thanh toán
              </div>
              {/* TODO: Gắn iframe hoặc redirect đến PayPal sau */}
            </Col>
          )}
          {/* Thẻ ngân hàng */}
          {paymentMethod === "card" && (
            <>
              <Col span={12}>
                <Form.Item
                  label={
                    <span
                      style={{
                        fontWeight: 700,
                        color: "#615efc",
                        fontSize: 15,
                      }}
                    >
                      Tên chủ thẻ
                    </span>
                  }
                  name="name"
                  rules={[
                    { required: true, message: "Vui lòng nhập tên chủ thẻ" },
                  ]}
                >
                  {" "}
                  <Input
                    placeholder="Nhập tên chủ thẻ"
                    style={{
                      fontSize: 15,
                      borderRadius: 8,
                      padding: "8px 12px",
                    }}
                  />{" "}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={
                    <span
                      style={{
                        fontWeight: 700,
                        color: "#615efc",
                        fontSize: 15,
                      }}
                    >
                      Số thẻ
                    </span>
                  }
                  name="number"
                  rules={[
                    { required: true, message: "Vui lòng nhập số thẻ" },
                    { pattern: /^\d{12,19}$/, message: "Số thẻ không hợp lệ" },
                  ]}
                >
                  {" "}
                  <Input
                    placeholder="Nhập số thẻ"
                    maxLength={19}
                    style={{
                      fontSize: 15,
                      borderRadius: 8,
                      padding: "8px 12px",
                    }}
                  />{" "}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={
                    <span
                      style={{
                        fontWeight: 700,
                        color: "#615efc",
                        fontSize: 15,
                      }}
                    >
                      Ngày hết hạn
                    </span>
                  }
                  name="exp"
                  rules={[
                    { required: true, message: "Vui lòng chọn ngày hết hạn" },
                  ]}
                >
                  {" "}
                  <DatePicker
                    style={{
                      width: "100%",
                      fontSize: 15,
                      borderRadius: 8,
                      padding: "8px 12px",
                    }}
                    placeholder="MM/YY"
                    format="MM/YY"
                    picker="month"
                  />{" "}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={
                    <span
                      style={{
                        fontWeight: 700,
                        color: "#615efc",
                        fontSize: 15,
                      }}
                    >
                      CVV
                    </span>
                  }
                  name="cvv"
                  rules={[
                    { required: true, message: "Vui lòng nhập CVV" },
                    { pattern: /^\d{3,4}$/, message: "CVV không hợp lệ" },
                  ]}
                >
                  {" "}
                  <Input
                    placeholder="CVV"
                    maxLength={4}
                    style={{
                      fontSize: 15,
                      borderRadius: 8,
                      padding: "8px 12px",
                    }}
                  />{" "}
                </Form.Item>
              </Col>
            </>
          )}
          {/* 4. Nút xác nhận thanh toán */}
          <Col
            span={24}
            style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
          >
            <Button
              className="rts-btn btn-primary payment-confirm-btn"
              htmlType="submit"
              loading={loading}
              style={{
                fontWeight: 900,
                minWidth: 250,
                fontSize: 22,
                background: "#615efc",
                border: "none",
                borderRadius: 32,
                letterSpacing: 1.5,
                boxShadow: "0 6px 24px #615efc44",
                padding: "18px 0",
                textTransform: "uppercase",
                color: "#fff",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
              icon={
                <CreditCardOutlined
                  style={{ fontSize: 26, color: "#fff", marginRight: 4 }}
                />
              }
              onMouseOver={(e) => (e.currentTarget.style.background = "#111")}
              onMouseOut={(e) => (e.currentTarget.style.background = "#615efc")}
            >
              <span
                style={{ fontWeight: 900, fontSize: 22, letterSpacing: 1.5 }}
              >
                Thanh toán
              </span>
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default PaymentPage;
