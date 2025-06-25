import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Form, Input, Button, Typography, Row, Col } from 'antd';
import './STIsRegistration.css'; // Add this line

const { Title, Text } = Typography;

function STIsRegistration() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const { category, disease } = location.state || { category: 'Vi khuẩn STIs', disease: 'Lậu (Gonorrhea)' };
    const headerText = `Xét nghiệm ${disease}`;
    const price = 700000; // Fixed price of 700,000 VND

    const onFinish = (values) => {
        const orderDetails = {
            category,
            disease,
            total: price,
            details: values,
            time: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
        };
        navigate('/payment', { state: { order: orderDetails } });
    };

    return (
        <div className="stis-reg-container">
            <Card className="stis-reg-card">
                <Title level={2} className="stis-reg-title">
                    {headerText}
                </Title>
                <Form
                    form={form}
                    name="registration_form"
                    onFinish={onFinish}
                    layout="vertical"
                    className="stis-reg-form"
                >
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Form.Item
                                name="fullName"
                                label="Họ và tên"
                                rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                            >
                                <Input placeholder="Nhập họ và tên" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="phone"
                                label="Số điện thoại"
                                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                            >
                                <Input placeholder="Nhập số điện thoại" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="address"
                                label="Địa chỉ lấy mẫu"
                                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                            >
                                <Input placeholder="Nhập địa chỉ lấy mẫu" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" block>
                                    Xác nhận thanh toán (700,000đ)
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <div className="stis-reg-commitment">
                    <Text>
                        Cam kết: Thông tin của bạn sẽ được bảo mật tuyệt đối. Kết quả xét nghiệm sẽ được gửi qua email hoặc trực tiếp tại cơ sở. Chúng tôi cam kết hỗ trợ tư vấn miễn phí sau khi nhận kết quả.
                    </Text>
                </div>
            </Card>
        </div>
    );
}

export default STIsRegistration;