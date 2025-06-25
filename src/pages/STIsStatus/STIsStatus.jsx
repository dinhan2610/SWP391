
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Typography, Progress, Tag } from 'antd';

const { Title, Text } = Typography;

function STIsStatus() {
    const location = useLocation();
    const { category, disease, details, paid } = location.state || {
        category: 'Vi khuẩn STIs',
        disease: 'Lậu (Gonorrhea)',
        details: { fullName: 'Khách hàng', phone: '090xxxxxxx', address: 'HCM' },
        paid: false,
    };
    const currentTime = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
    const progress = paid ? 75 : 50; // Progress increases to 75% if paid

    return (
        <div style={{ padding: '40px 20px', backgroundColor: '#f5f7fa', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
            <Card style={{ maxWidth: '500px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', background: '#ffffff' }}>
                <Title level={2} style={{ color: '#2d3748', textAlign: 'center', marginBottom: '20px' }}>
                    Trạng thái đơn hàng - {disease}
                </Title>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <Tag color={paid ? '#16a34a' : '#4a90e2'} style={{ fontSize: '14px', padding: '4px 12px' }}>
                        {paid ? 'Đã thanh toán' : 'Đang xử lý'}
                    </Tag>
                    <Text style={{ display: 'block', color: '#4a5568', marginTop: '8px' }}>
                        Thời gian: {currentTime}
                    </Text>
                </div>
                <Progress percent={progress} status="active" strokeColor={{ from: '#4a90e2', to: '#63b3ed' }} style={{ marginBottom: '20px' }} />
                <div style={{ color: '#4a5568', padding: '0 20px', textAlign: 'left' }}>
                    <Text strong>Thông tin khách hàng:</Text>
                    <p>Họ và tên: {details.fullName}</p>
                    <p>Số điện thoại: {details.phone}</p>
                    <p>Địa chỉ lấy mẫu: {details.address}</p>
                    <Text strong style={{ marginTop: '20px', display: 'block' }}>Trạng thái:</Text>
                    <p>{paid ? 'Mẫu đã được lấy và đang được phân tích tại phòng lab. Kết quả dự kiến trong 24h.' : 'Mẫu đang được vận chuyển đến phòng lab. Kết quả dự kiến trong 1-2 ngày.'}</p>
                </div>
            </Card>
        </div>
    );
}

export default STIsStatus;
