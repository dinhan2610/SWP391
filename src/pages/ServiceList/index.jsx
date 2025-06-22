import React, { useEffect, useState } from "react";
import axios from "axios";

export default function TestServicesList() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/admin/test-services")
      .then((res) => setServices(res.data))
      .catch(() => setError("Không thể tải danh sách dịch vụ."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-5">Đang tải...</div>;
  if (error) return <div className="text-center text-danger py-5">{error}</div>;

  return (
    <div className="container py-5">
      <h2
        className="mb-4 text-2xl font-bold text-center text-blue-700"
        style={{ fontWeight: 800, letterSpacing: 0.5 }}
      >
        Danh sách dịch vụ xét nghiệm
      </h2>
      <div className="row g-4">
        {services.length === 0 && (
          <div
            className="col-12 text-center text-muted"
            style={{ fontWeight: 500, fontSize: 18 }}
          >
            Chưa có dịch vụ nào.
          </div>
        )}
        {services.map((service) => (
          <div className="col-md-6 col-lg-4" key={service.id}>
            <div className="card h-100 shadow-sm border-0 rounded-3">
              <div className="card-body">
                <h5
                  className="card-title mb-2 text-blue-800"
                  style={{ fontWeight: 700, fontSize: 22 }}
                >
                  {service.name}
                </h5>
                <p
                  className="card-text mb-2 text-muted"
                  style={{ minHeight: 48, fontSize: 16, fontWeight: 500 }}
                >
                  {service.description}
                </p>
                <div className="mb-2" style={{ fontSize: 15, fontWeight: 500 }}>
                  <strong>Giá:</strong> {service.price?.toLocaleString()} VNĐ
                </div>
                <div className="mb-2" style={{ fontSize: 15, fontWeight: 500 }}>
                  <strong>Thời gian xét nghiệm:</strong> {service.duration}
                </div>
                <div>
                  <span
                    className={`badge ${
                      service.isActive ? "bg-success" : "bg-secondary"
                    }`}
                    style={{
                      fontWeight: 600,
                      fontSize: 14,
                      padding: "6px 14px",
                      borderRadius: 8,
                    }}
                  >
                    {service.isActive ? "Đang hoạt động" : "Ngừng hoạt động"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
