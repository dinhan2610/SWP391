import React, { useState, useEffect } from "react";
import { Card, Button, Form, Input, DatePicker, message, Spin } from "antd";
import { UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

export default function ProfileConsultant() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [freeSlots, setFreeSlots] = useState([]); // [{date: '2025-07-10', slots: ['08:00', ...]}]
  const [saving, setSaving] = useState(false);

  // Lấy thông tin cá nhân và lịch rảnh từ API (giả lập)
  useEffect(() => {
    setLoading(true);
    // TODO: Thay bằng API thực tế
    setTimeout(() => {
      setProfile({
        fullName: "Nguyễn Văn A",
        email: "nguyenvana@example.com",
        phone: "0912345678",
        address: "123 Đường ABC, Quận 1, TP.HCM",
      });
      setFreeSlots([
        {
          date: dayjs().format("YYYY-MM-DD"),
          slots: ["08:00", "09:00", "14:00"],
        },
        {
          date: dayjs().add(1, "day").format("YYYY-MM-DD"),
          slots: ["10:00", "15:00"],
        },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  // Cập nhật thông tin cá nhân
  const handleProfileSave = (values) => {
    setSaving(true);
    // TODO: Gọi API cập nhật thông tin
    setTimeout(() => {
      setProfile(values);
      setSaving(false);
      message.success("Cập nhật thông tin thành công!");
    }, 800);
  };

  // Thêm ngày giờ rảnh mới
  const handleAddSlot = (date, slot) => {
    if (!date || !slot) return;
    setFreeSlots((prev) => {
      const idx = prev.findIndex((d) => d.date === date);
      if (idx > -1) {
        // Đã có ngày này
        if (!prev[idx].slots.includes(slot)) prev[idx].slots.push(slot);
        return [...prev];
      } else {
        return [...prev, { date, slots: [slot] }];
      }
    });
    message.success("Đã thêm khung giờ rảnh!");
  };

  // Xóa khung giờ rảnh
  const handleRemoveSlot = (date, slot) => {
    setFreeSlots((prev) =>
      prev
        .map((d) =>
          d.date === date
            ? { ...d, slots: d.slots.filter((s) => s !== slot) }
            : d
        )
        .filter((d) => d.slots.length > 0)
    );
    message.success("Đã xóa khung giờ!");
  };

  if (loading || !profile) return <Spin style={{ marginTop: 80 }} />;

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "0 auto",
        padding: 24,
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 2px 16px #e0e7ff",
        minHeight: 600,
      }}
    >
      <h2 style={{ color: "#615efc", marginBottom: 24 }}>Thông tin cá nhân</h2>
      <Card style={{ marginBottom: 32 }}>
        <Form
          form={form}
          layout="vertical"
          initialValues={profile}
          onFinish={handleProfileSave}
          style={{ maxWidth: 500 }}
        >
          <Form.Item
            label="Họ và tên"
            name="fullName"
            rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Nhập họ tên" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, type: "email", message: "Email không hợp lệ!" },
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
                pattern: /^0\d{9}$/,
                message: "Số điện thoại không hợp lệ!",
              },
            ]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>
          <Form.Item label="Địa chỉ" name="address">
            <Input placeholder="Nhập địa chỉ" />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={saving}
            style={{ borderRadius: 8, fontWeight: 600 }}
          >
            Lưu thông tin
          </Button>
        </Form>
      </Card>
      <h2 style={{ color: "#615efc", marginBottom: 24 }}>
        Cập nhật ngày giờ rảnh trong tháng
      </h2>
      <Card>
        <AddSlotForm onAdd={handleAddSlot} />
        <div style={{ marginTop: 24 }}>
          <h4 style={{ color: "#615efc" }}>Danh sách ngày giờ rảnh</h4>
          {freeSlots.length === 0 ? (
            <div style={{ color: "#888", marginTop: 12 }}>
              Chưa có ngày giờ rảnh nào.
            </div>
          ) : (
            freeSlots.map((d) => (
              <div key={d.date} style={{ marginBottom: 12 }}>
                <b>{dayjs(d.date).format("DD/MM/YYYY")}:</b>
                {d.slots.map((s) => (
                  <span
                    key={s}
                    style={{
                      display: "inline-block",
                      background: "#e0e7ff",
                      color: "#615efc",
                      borderRadius: 6,
                      padding: "2px 10px",
                      margin: "0 8px 4px 0",
                      fontWeight: 500,
                    }}
                  >
                    {s}
                    <Button
                      size="small"
                      type="link"
                      danger
                      style={{ marginLeft: 4, padding: 0 }}
                      onClick={() => handleRemoveSlot(d.date, s)}
                    >
                      Xóa
                    </Button>
                  </span>
                ))}
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}

// Form thêm ngày giờ rảnh
function AddSlotForm({ onAdd }) {
  const [form] = Form.useForm();
  const [adding, setAdding] = useState(false);
  return (
    <Form
      form={form}
      layout="inline"
      onFinish={({ date, slot }) => {
        setAdding(true);
        setTimeout(() => {
          onAdd(date.format("YYYY-MM-DD"), slot);
          setAdding(false);
          form.resetFields();
        }, 400);
      }}
      style={{ gap: 12 }}
    >
      <Form.Item
        name="date"
        rules={[{ required: true, message: "Chọn ngày!" }]}
      >
        <DatePicker
          style={{ minWidth: 140 }}
          format="DD/MM/YYYY"
          placeholder="Chọn ngày"
          disabledDate={(d) => d.isBefore(dayjs().startOf("day"))}
        />
      </Form.Item>
      <Form.Item name="slot" rules={[{ required: true, message: "Nhập giờ!" }]}>
        <Input placeholder="Ví dụ: 08:00" style={{ minWidth: 90 }} />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={adding}
          style={{ borderRadius: 8 }}
        >
          Thêm
        </Button>
      </Form.Item>
    </Form>
  );
}
