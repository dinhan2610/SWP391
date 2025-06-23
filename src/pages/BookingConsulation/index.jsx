import React, { useState } from "react";
import {
  Card,
  Button,
  Form,
  Input,
  DatePicker,
  Select,
  message,
  Modal,
  Avatar,
  List,
  Tabs,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./index.css";

const { Option } = Select;

// Sample advisors list
const advisors = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    gender: "Nam",
    specialty: "Tâm lý học",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    degree: "Thạc sĩ Tâm lý học, Đại học Quốc gia",
    experience: "5 năm tư vấn tâm lý cho thanh thiếu niên",
    freeSlots: [
      { date: "2025-06-22", slots: ["09:00-10:00", "14:00-15:00"] },
      { date: "2025-06-23", slots: ["08:00-09:00", "10:00-11:00"] },
    ],
  },
  {
    id: 2,
    name: "Trần Thị B",
    gender: "Nữ",
    specialty: "Dinh dưỡng",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    degree: "Bác sĩ Dinh dưỡng, Đại học Y Hà Nội",
    experience: "7 năm tư vấn dinh dưỡng cho trẻ em",
    freeSlots: [
      { date: "2025-06-22", slots: ["10:00-11:00", "15:00-16:00"] },
      { date: "2025-06-24", slots: ["09:00-10:00", "14:00-15:00"] },
    ],
  },
  {
    id: 3,
    name: "Lê Quốc C",
    gender: "Nam",
    specialty: "Tư vấn hôn nhân",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    degree: "Tiến sĩ Tâm lý học, Đại học Quốc tế",
    experience: "10 năm tư vấn hôn nhân và gia đình",
    freeSlots: [
      { date: "2025-06-23", slots: ["09:00-10:00", "16:00-17:00"] },
      { date: "2025-06-25", slots: ["08:00-09:00", "10:00-11:00"] },
    ],
  },
];

const consultMethods = [
  { value: "video", label: "Gọi video" },
  { value: "chat", label: "Chat" },
  { value: "call", label: "Gọi điện thoại" },
];

export default function BookingConsultation() {
  const [form] = Form.useForm();
  const [availableSlots, setAvailableSlots] = useState([]);
  const [confirmModal, setConfirmModal] = useState(false);
  const [bookingInfo, setBookingInfo] = useState(null);
  const [history, setHistory] = useState([]); // Booking history
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login status
  const [showLoginModal, setShowLoginModal] = useState(false);
  // State for selected advisor
  const [selectedAdvisorId, setSelectedAdvisorId] = useState(advisors[0].id);
  const advisor = advisors.find((a) => a.id === selectedAdvisorId);

  // When advisor changes, reset slot
  React.useEffect(() => {
    setAvailableSlots([]);
    form.setFieldsValue({ slot: undefined, date: undefined });
  }, [selectedAdvisorId]);

  // When date changes, update slot for selected advisor
  const handleDateChange = (date, dateString) => {
    const found = advisor.freeSlots.find((d) => d.date === dateString);
    setAvailableSlots(found ? found.slots : []);
    form.setFieldsValue({ slot: undefined });
  };

  // Confirm booking
  const onFinish = (values) => {
    // Check if slot is available (mock, replace with API)
    const found = advisor.freeSlots.find(
      (d) => d.date === values.date.format("YYYY-MM-DD")
    );
    if (!found || !found.slots.includes(values.slot)) {
      message.error("Khung giờ này đã được đặt, vui lòng chọn khung giờ khác!");
      return;
    }
    setBookingInfo({ ...values, date: values.date.format("YYYY-MM-DD") });
    setConfirmModal(true);
  };

  // Submit booking (replace with API)
  const handleConfirm = () => {
    setHistory((prev) => [bookingInfo, ...prev]);
    setConfirmModal(false);
    message.success(
      "Đặt lịch thành công! Thông tin xác nhận sẽ được gửi qua email."
    );
    form.resetFields();
    setAvailableSlots([]);
    // TODO: Call booking API, send email, send notification...
  };

  // Cancel booking (ready for API integration)
  const handleCancelBooking = (idx) => {
    Modal.confirm({
      title: "Bạn có chắc muốn hủy lịch này?",
      content: "Lịch đặt này sẽ bị xóa khỏi danh sách của bạn.",
      okText: "Đồng ý hủy",
      cancelText: "Không hủy",
      okButtonProps: { className: "booking-cancel-btn" },
      cancelButtonProps: { className: "booking-submit-btn" },
      onOk: async () => {
        // TODO: Call cancel booking API here, pass id or needed info
        // Example:
        // await api.cancelBooking(history[idx].id);
        // After API success, update UI:
        setHistory((prev) => prev.filter((_, i) => i !== idx));
        message.success("Hủy lịch thành công.");
      },
    });
  };

  // Custom submit handler to check login before submit
  const handleFormSubmit = (values) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    onFinish(values);
  };

  return (
    <div className="container py-4" style={{ maxWidth: 900 }}>
      {/* Show booking form for all users, login not required */}
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Đặt lịch tư vấn" key="1">
          <Card title="Chọn chuyên gia tư vấn" className="mb-4">
            <Select
              value={selectedAdvisorId}
              onChange={setSelectedAdvisorId}
              style={{ width: 300, marginBottom: 16 }}
            >
              {advisors.map((a) => (
                <Option key={a.id} value={a.id}>
                  {a.name} - {a.specialty}
                </Option>
              ))}
            </Select>
            <div className="d-flex align-items-center gap-4">
              <Avatar size={80} src={advisor.avatar} icon={<UserOutlined />} />
              <div>
                <h4>{advisor.name}</h4>
                <div>Giới tính: {advisor.gender}</div>
                <div>Chuyên môn: {advisor.specialty}</div>
                <div>Bằng cấp: {advisor.degree}</div>
                <div>Kinh nghiệm: {advisor.experience}</div>
              </div>
            </div>
          </Card>
          <Card>
            <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
              <Form.Item
                label="Họ và tên"
                name="name"
                rules={[
                  { required: true, message: "Vui lòng nhập họ tên!" },
                  { min: 2, message: "Họ tên phải có ít nhất 2 ký tự!" },
                  {
                    pattern: /^[a-zA-ZÀ-ỹà-ỹ\s]+$/,
                    message: "Họ tên không được chứa số hoặc ký tự đặc biệt!",
                  },
                ]}
              >
                <Input placeholder="Nhập họ và tên" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input placeholder="Nhập email" />
              </Form.Item>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số điện thoại!",
                  },
                  {
                    pattern: /^0\d{9}$/,
                    message: "Số điện thoại không hợp lệ!",
                  },
                ]}
              >
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
              <Form.Item
                label="Ngày tư vấn"
                name="date"
                rules={[{ required: true, message: "Vui lòng chọn ngày!" }]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  onChange={handleDateChange}
                  disabledDate={(d) =>
                    !advisor.freeSlots.some(
                      (f) => f.date === d.format("YYYY-MM-DD")
                    )
                  }
                />
              </Form.Item>
              <Form.Item
                label="Khung giờ"
                name="slot"
                rules={[
                  { required: true, message: "Vui lòng chọn khung giờ!" },
                ]}
              >
                <Select
                  placeholder="Chọn khung giờ"
                  disabled={!availableSlots.length}
                >
                  {availableSlots.map((s) => (
                    <Option key={s} value={s}>
                      {s}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Hình thức tư vấn"
                name="method"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn hình thức tư vấn!",
                  },
                ]}
              >
                <Select placeholder="Chọn hình thức tư vấn">
                  {consultMethods.map((m) => (
                    <Option key={m.value} value={m.value}>
                      {m.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Nội dung tư vấn"
                name="content"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "Vui lòng nhập nội dung tư vấn!",
                  },
                ]}
              >
                <Input.TextArea
                  rows={3}
                  placeholder="Nhập nội dung tư vấn..."
                />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="booking-submit-btn"
              >
                Đặt lịch ngay
              </Button>
            </Form>
          </Card>
          <Modal
            open={confirmModal}
            onCancel={() => setConfirmModal(false)}
            onOk={handleConfirm}
            title="Xác nhận đặt lịch tư vấn"
            okButtonProps={{ className: "booking-submit-btn" }}
            cancelButtonProps={{ className: "booking-cancel-btn" }}
            okText="Xác nhận"
            cancelText="Hủy"
          >
            {bookingInfo && (
              <div style={{ color: "#000", fontSize: 16, fontWeight: 500 }}>
                <p>
                  <b>Họ và tên:</b> {bookingInfo.name}
                </p>
                <p>
                  <b>Email:</b> {bookingInfo.email}
                </p>
                <p>
                  <b>Số điện thoại:</b> {bookingInfo.phone}
                </p>
                <p>
                  <b>Ngày tư vấn:</b> {bookingInfo.date}
                </p>
                <p>
                  <b>Khung giờ:</b> {bookingInfo.slot}
                </p>
                <p>
                  <b>Hình thức:</b>{" "}
                  {
                    consultMethods.find((m) => m.value === bookingInfo.method)
                      ?.label
                  }
                </p>
                <p>
                  <b>Nội dung tư vấn:</b> {bookingInfo.content}
                </p>
              </div>
            )}
          </Modal>
          <Modal
            open={showLoginModal}
            onCancel={() => setShowLoginModal(false)}
            onOk={() => {
              setIsLoggedIn(true);
              setShowLoginModal(false);
            }}
            title="Vui lòng đăng nhập để đặt lịch tư vấn"
            okButtonProps={{ className: "booking-submit-btn" }}
            cancelButtonProps={{ className: "booking-cancel-btn" }}
            okText="Đăng nhập"
            cancelText="Hủy"
          >
            <p>Bạn cần đăng nhập để tiếp tục đặt lịch tư vấn.</p>
          </Modal>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Lịch sử & Quản lý đặt lịch" key="2">
          <Card title="Lịch sử đặt lịch">
            <List
              dataSource={history}
              renderItem={(item, idx) => (
                <List.Item
                  actions={[
                    <Button
                      danger
                      onClick={() => handleCancelBooking(idx)}
                      key="cancel"
                      className="booking-cancel-btn"
                    >
                      Hủy lịch
                    </Button>,
                  ]}
                  style={{
                    background: "#fafbfc",
                    borderRadius: 8,
                    marginBottom: 12,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: 18,
                      color: "#fff",
                      background: "#615efc",
                      borderRadius: "50%",
                      marginRight: 20,
                      flexShrink: 0,
                    }}
                  >
                    {idx + 1}
                  </div>
                  <List.Item.Meta
                    title={
                      <span
                        style={{
                          color: "#222",
                          fontWeight: 600,
                          fontSize: 20,
                        }}
                      >
                        {item.date} - {item.slot} (
                        {
                          consultMethods.find((m) => m.value === item.method)
                            ?.label
                        }
                        )
                      </span>
                    }
                    description={
                      <div
                        style={{
                          color: "#444",
                          fontSize: 15,
                          lineHeight: 1.7,
                        }}
                      >
                        <div>
                          <b>Họ và tên:</b> {item.name}
                        </div>
                        <div>
                          <b>Email:</b> {item.email}
                        </div>
                        <div>
                          <b>Số điện thoại:</b> {item.phone}
                        </div>
                        <div>
                          <b>Nội dung tư vấn:</b> {item.content}
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              )}
              locale={{ emptyText: "Chưa có lịch sử đặt lịch." }}
            />
          </Card>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
