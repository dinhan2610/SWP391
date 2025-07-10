import React, { useEffect, useState } from "react";
import {
  Table,
  Card,
  Button,
  Modal,
  Tag,
  message,
  Select,
  Input,
  DatePicker,
  Form,
} from "antd";
import dayjs from "dayjs";

const { Option } = Select;

const consultMethods = [
  { value: "video", label: "Gọi video" },
  { value: "chat", label: "Chat" },
  { value: "call", label: "Gọi điện thoại" },
];

export default function AdminBookingConsultation() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [filter, setFilter] = useState({ method: "", date: null, search: "" });

  // Lấy danh sách booking từ API
  const fetchBookings = () => {
    setLoading(true);
    fetch("https://ghsm.eposh.io.vn/api/BookingConsultation/get-all")
      .then((res) => res.json())
      .then((data) => {
        let arr = [];
        if (Array.isArray(data)) arr = data;
        else if (Array.isArray(data?.data)) arr = data.data;
        setBookings(arr);
      })
      .catch(() => {
        setBookings([]);
        message.error("Không lấy được danh sách đặt lịch!");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Xử lý filter
  const filteredBookings = bookings.filter((b) => {
    const matchMethod = filter.method ? b.method === filter.method : true;
    const matchDate = filter.date
      ? dayjs(b.date).isSame(filter.date, "day")
      : true;
    const matchSearch = filter.search
      ? (b.name + b.email + b.phone + b.specialty)
          .toLowerCase()
          .includes(filter.search.toLowerCase())
      : true;
    return matchMethod && matchDate && matchSearch;
  });

  // Xóa booking
  const handleDelete = (id) => {
    Modal.confirm({
      title: "Bạn có chắc muốn xóa lịch này?",
      content: "Hành động này không thể hoàn tác.",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: () => {
        fetch(`https://ghsm.eposh.io.vn/api/BookingConsultation/delete/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.success || res.status === 200) {
              message.success("Đã xóa lịch!");
              fetchBookings();
            } else {
              message.error(res.message || "Xóa thất bại!");
            }
          })
          .catch(() => message.error("Xóa thất bại!"));
      },
    });
  };

  // Xem chi tiết booking
  const handleView = (record) => {
    setSelectedBooking(record);
    setViewModal(true);
  };

  const columns = [
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "SĐT",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Chuyên môn",
      dataIndex: "specialty",
      key: "specialty",
    },
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
      render: (d) => (d ? dayjs(d).format("DD/MM/YYYY") : ""),
    },
    {
      title: "Khung giờ",
      dataIndex: "slot",
      key: "slot",
    },
    {
      title: "Hình thức",
      dataIndex: "method",
      key: "method",
      render: (m) => {
        const found = consultMethods.find((x) => x.value === m);
        return found ? <Tag color="#615efc">{found.label}</Tag> : m;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (s) => (
        <Tag color={s === "done" ? "green" : s === "cancel" ? "red" : "orange"}>
          {s === "done"
            ? "Hoàn thành"
            : s === "cancel"
            ? "Đã hủy"
            : "Chờ xác nhận"}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            size="small"
            style={{ marginRight: 8 }}
            onClick={() => handleView(record)}
          >
            Xem
          </Button>
          <Button
            danger
            size="small"
            style={{
              background: "#fff",
              color: "#ff4d4f",
              outline: "none",
              boxShadow: "none",
              fontWeight: 600,
              borderRadius: 6,
              border: "1px solid #ff4d4f",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "#ff4d4f";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderColor = "#ff4d4f";
              e.currentTarget.style.boxShadow = "0 2px 8px #ff4d4f33";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.color = "#ff4d4f";
              e.currentTarget.style.borderColor = "#ff4d4f";
              e.currentTarget.style.boxShadow = "none";
            }}
            onClick={() => handleDelete(record.id)}
          >
            Xóa
          </Button>
        </>
      ),
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 60%, #e0e7ff 100%)",
        padding: "40px 0",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 16px" }}>
        <Card
          title={
            <span
              style={{
                color: "#615efc",
                fontWeight: 700,
                fontSize: 24,
                letterSpacing: 0.5,
              }}
            >
              Quản lý đặt lịch tư vấn
            </span>
          }
          style={{
            borderRadius: 18,
            boxShadow: "0 2px 16px #e0e7ff",
            marginBottom: 32,
          }}
        >
          <div
            style={{
              marginBottom: 28,
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{ display: "flex", gap: 16, flexWrap: "wrap", flex: 1 }}
            >
              <Select
                allowClear
                placeholder="Lọc theo hình thức"
                style={{ minWidth: 160 }}
                value={filter.method || undefined}
                onChange={(v) => setFilter((f) => ({ ...f, method: v }))}
              >
                {consultMethods.map((m) => (
                  <Option key={m.value} value={m.value}>
                    {m.label}
                  </Option>
                ))}
              </Select>
              <DatePicker
                allowClear
                placeholder="Lọc theo ngày"
                style={{ minWidth: 140 }}
                value={filter.date}
                onChange={(d) => setFilter((f) => ({ ...f, date: d }))}
                format="DD/MM/YYYY"
              />
              <Input.Search
                allowClear
                placeholder="Tìm kiếm họ tên, email, SĐT, chuyên môn..."
                style={{ minWidth: 260, flex: 1 }}
                value={filter.search}
                onChange={(e) =>
                  setFilter((f) => ({ ...f, search: e.target.value }))
                }
              />
            </div>
            <Button
              onClick={fetchBookings}
              style={{
                minWidth: 120,
                height: 40,
                borderRadius: 8,
                fontWeight: 600,
              }}
            >
              Làm mới
            </Button>
          </div>
          <Table
            columns={columns}
            dataSource={filteredBookings}
            rowKey="id"
            loading={loading}
            pagination={{ pageSize: 10, showSizeChanger: false }}
            bordered
            scroll={{ x: true }}
            style={{ background: "#fff", borderRadius: 12 }}
          />
        </Card>
      </div>
      <Modal
        open={viewModal}
        onCancel={() => setViewModal(false)}
        title={
          <span style={{ fontWeight: 700, color: "#615efc", fontSize: 20 }}>
            Chi tiết đặt lịch tư vấn
          </span>
        }
        footer={null}
        destroyOnClose
        bodyStyle={{ padding: 28, fontSize: 16, borderRadius: 12 }}
        style={{ top: 80 }}
      >
        {selectedBooking && (
          <div style={{ fontSize: 16, lineHeight: 1.7, color: "#222" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
              <div style={{ flex: 1, minWidth: 220 }}>
                <p>
                  <b>Họ tên:</b> {selectedBooking.name}
                </p>
                <p>
                  <b>Email:</b> {selectedBooking.email}
                </p>
                <p>
                  <b>SĐT:</b> {selectedBooking.phone}
                </p>
                <p>
                  <b>Chuyên môn:</b> {selectedBooking.specialty}
                </p>
              </div>
              <div style={{ flex: 1, minWidth: 220 }}>
                <p>
                  <b>Ngày:</b>{" "}
                  {selectedBooking.date
                    ? dayjs(selectedBooking.date).format("DD/MM/YYYY")
                    : ""}
                </p>
                <p>
                  <b>Khung giờ:</b> {selectedBooking.slot}
                </p>
                <p>
                  <b>Hình thức:</b>{" "}
                  {consultMethods.find(
                    (m) => m.value === selectedBooking.method
                  )?.label || selectedBooking.method}
                </p>
                <p>
                  <b>Trạng thái:</b>{" "}
                  {selectedBooking.status === "done"
                    ? "Hoàn thành"
                    : selectedBooking.status === "cancel"
                    ? "Đã hủy"
                    : "Chờ xác nhận"}
                </p>
              </div>
            </div>
            <div style={{ marginTop: 16 }}>
              <p>
                <b>Nội dung tư vấn:</b> {selectedBooking.content}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
