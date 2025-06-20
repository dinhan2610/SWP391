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
    name: "Nguyen Van A",
    gender: "Male",
    specialty: "Psychology",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    degree: "Master of Psychology, National University",
    experience: "5 years of youth counseling",
    freeSlots: [
      { date: "2025-06-22", slots: ["09:00-10:00", "14:00-15:00"] },
      { date: "2025-06-23", slots: ["08:00-09:00", "10:00-11:00"] },
    ],
  },
  {
    id: 2,
    name: "Tran Thi B",
    gender: "Female",
    specialty: "Nutrition",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    degree: "Doctor of Nutrition, Hanoi Medical University",
    experience: "7 years of child nutrition counseling",
    freeSlots: [
      { date: "2025-06-22", slots: ["10:00-11:00", "15:00-16:00"] },
      { date: "2025-06-24", slots: ["09:00-10:00", "14:00-15:00"] },
    ],
  },
  {
    id: 3,
    name: "Le Quoc C",
    gender: "Male",
    specialty: "Marriage Counseling",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    degree: "PhD in Psychology, International University",
    experience: "10 years of marriage and family counseling",
    freeSlots: [
      { date: "2025-06-23", slots: ["09:00-10:00", "16:00-17:00"] },
      { date: "2025-06-25", slots: ["08:00-09:00", "10:00-11:00"] },
    ],
  },
];

const consultMethods = [
  { value: "video", label: "Video call" },
  { value: "chat", label: "Chat" },
  { value: "call", label: "Phone call" },
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
      message.error("This time slot is already booked, please choose another!");
      return;
    }
    setBookingInfo({ ...values, date: values.date.format("YYYY-MM-DD") });
    setConfirmModal(true);
  };

  // Submit booking (replace with API)
  const handleConfirm = () => {
    setHistory((prev) => [bookingInfo, ...prev]);
    setConfirmModal(false);
    message.success("Booking successful! Confirmation will be sent via email.");
    form.resetFields();
    setAvailableSlots([]);
    // TODO: Call booking API, send email, send notification...
  };

  // Cancel booking (ready for API integration)
  const handleCancelBooking = (idx) => {
    Modal.confirm({
      title: "Are you sure you want to cancel this booking?",
      content: "This booking will be removed from your list.",
      okText: "Yes, cancel",
      cancelText: "No",
      okButtonProps: { className: "booking-cancel-btn" },
      cancelButtonProps: { className: "booking-submit-btn" },
      onOk: async () => {
        // TODO: Call cancel booking API here, pass id or needed info
        // Example:
        // await api.cancelBooking(history[idx].id);
        // After API success, update UI:
        setHistory((prev) => prev.filter((_, i) => i !== idx));
        message.success("Booking cancelled successfully.");
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
        <Tabs.TabPane tab="Book Consultation" key="1">
          <Card title="Choose an Advisor" className="mb-4">
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
                <div>Gender: {advisor.gender}</div>
                <div>Specialty: {advisor.specialty}</div>
                <div>Degree: {advisor.degree}</div>
                <div>Experience: {advisor.experience}</div>
              </div>
            </div>
          </Card>
          <Card>
            <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
              <Form.Item
                label="Full Name"
                name="name"
                rules={[
                  { required: true, message: "Please enter your name!" },
                  { min: 2, message: "Name must be at least 2 characters!" },
                  {
                    pattern: /^[^\d]+$/,
                    message: "Name cannot contain numbers!",
                  },
                ]}
              >
                <Input placeholder="Enter your name" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email!" },
                  { type: "email", message: "Invalid email!" },
                ]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>
              <Form.Item
                label="Phone Number"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please enter your phone number!",
                  },
                  {
                    pattern: /^0\d{9}$/,
                    message: "Invalid phone number!",
                  },
                ]}
              >
                <Input placeholder="Enter your phone number" />
              </Form.Item>
              <Form.Item
                label="Consultation Date"
                name="date"
                rules={[{ required: true, message: "Please select a date!" }]}
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
                label="Time Slot"
                name="slot"
                rules={[
                  { required: true, message: "Please select a time slot!" },
                ]}
              >
                <Select
                  placeholder="Select a time slot"
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
                label="Consultation Method"
                name="method"
                rules={[
                  {
                    required: true,
                    message: "Please select a consultation method!",
                  },
                ]}
              >
                <Select placeholder="Select a method">
                  {consultMethods.map((m) => (
                    <Option key={m.value} value={m.value}>
                      {m.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Consultation Content"
                name="content"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "Please enter your content!",
                  },
                ]}
              >
                <Input.TextArea rows={3} placeholder="Enter your content..." />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="booking-submit-btn"
              >
                Book Now
              </Button>
            </Form>
          </Card>
          <Modal
            open={confirmModal}
            onCancel={() => setConfirmModal(false)}
            onOk={handleConfirm}
            title="Confirm Booking"
            okButtonProps={{ className: "booking-submit-btn" }}
            cancelButtonProps={{ className: "booking-cancel-btn" }}
            okText="Confirm"
            cancelText="Cancel"
          >
            {bookingInfo && (
              <div style={{ color: "#000", fontSize: 16, fontWeight: 500 }}>
                <p>
                  <b>Full Name:</b> {bookingInfo.name}
                </p>
                <p>
                  <b>Email:</b> {bookingInfo.email}
                </p>
                <p>
                  <b>Phone Number:</b> {bookingInfo.phone}
                </p>
                <p>
                  <b>Date:</b> {bookingInfo.date}
                </p>
                <p>
                  <b>Time Slot:</b> {bookingInfo.slot}
                </p>
                <p>
                  <b>Method:</b>{" "}
                  {
                    consultMethods.find((m) => m.value === bookingInfo.method)
                      ?.label
                  }
                </p>
                <p>
                  <b>Content:</b> {bookingInfo.content}
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
            title="Please login to book a consultation"
            okButtonProps={{ className: "booking-submit-btn" }}
            cancelButtonProps={{ className: "booking-cancel-btn" }}
            okText="Login"
            cancelText="Cancel"
          >
            <p>You need to login to continue booking a consultation.</p>
          </Modal>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Booking History & Management" key="2">
          <Card title="Booking History">
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
                      Cancel
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
                          <b>Full Name:</b> {item.name}
                        </div>
                        <div>
                          <b>Email:</b> {item.email}
                        </div>
                        <div>
                          <b>Phone Number:</b> {item.phone}
                        </div>
                        <div>
                          <b>Content:</b> {item.content}
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              )}
              locale={{ emptyText: "No booking history yet." }}
            />
          </Card>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
