import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import "./index.css";

const defaultFormData = {
  name: "",
  description: "",
  price: 0,
  duration: "",
  isActive: true,
};

const TestServiceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState(defaultFormData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      axios
        .get(`/api/admin/test-services/${id}`)
        .then((res) => setFormData(res.data))
        .catch((err) => {
          toast.error("Không thể tải dữ liệu dịch vụ.");
          console.error(err);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = value;

    if (type === "checkbox") {
      newValue = checked;
    } else if (name === "price") {
      newValue = parseFloat(value) || 0;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Tên dịch vụ là bắt buộc.";
    if (formData.price <= 0) newErrors.price = "Giá phải lớn hơn 0.";
    if (!formData.duration.trim())
      newErrors.duration = "Thời gian xét nghiệm là bắt buộc.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      if (isEdit) {
        await axios.put(`/api/admin/test-services/${id}`, formData);
        toast.success("Cập nhật dịch vụ thành công");
      } else {
        await axios.post("/api/admin/test-services", formData);
        toast.success("Tạo mới dịch vụ thành công");
      }
      navigate("/admin/test-services");
    } catch (err) {
      toast.error("Lỗi khi lưu dịch vụ. Vui lòng thử lại.");
      console.error("Lỗi khi lưu dịch vụ:", err);
    } finally {
      setLoading(false);
    }
  };
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
  return (
    <div className="admin-test-services-bg">
      <div className="admin-test-services-container">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          {isEdit ? "🛠️ Chỉnh sửa" : "➕ Tạo mới"} Dịch vụ xét nghiệm
        </h2>
        <div className="grid gap-5">
          <div>
            <label className="block mb-1 font-medium">
              Tên dịch vụ <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập tên dịch vụ..."
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Mô tả</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg h-28 resize-none focus:ring-2 focus:ring-blue-500"
              placeholder="Mô tả chi tiết dịch vụ..."
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Giá (VNĐ) <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập giá tiền..."
            />
            {errors.price && (
              <p className="text-sm text-red-600 mt-1">{errors.price}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Thời gian xét nghiệm <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Ví dụ: 2 ngày"
            />
            {errors.duration && (
              <p className="text-sm text-red-600 mt-1">{errors.duration}</p>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-3 mt-4">
            <button
              onClick={() => setShowPreview(true)}
              type="button"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2.5 px-4 rounded-lg w-full"
              tabIndex={-1}
            >
              👁 Xem trước
            </button>

            <button
              onClick={handleSubmit}
              disabled={loading}
              type="submit"
              className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg w-full transition duration-200 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading
                ? "Đang xử lý..."
                : isEdit
                ? "💾 Cập nhật dịch vụ"
                : "➕ Tạo mới dịch vụ"}
            </button>
          </div>
        </div>
      </div>
      {showPreview && (
        <div className="admin-test-services-preview-modal">
          <div className="admin-test-services-preview-content">
            <h3>📋 Xem trước dịch vụ</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <strong>Tên:</strong> {formData.name}
              </li>
              <li>
                <strong>Mô tả:</strong> {formData.description}
              </li>
              <li>
                <strong>Giá:</strong> {formData.price.toLocaleString()} VNĐ
              </li>
              <li>
                <strong>Thời gian xét nghiệm:</strong> {formData.duration}
              </li>
              <li>
                <strong>Trạng thái:</strong>{" "}
                {formData.isActive ? "Đang hoạt động" : "Ngừng hoạt động"}
              </li>
            </ul>
            <button
              onClick={() => setShowPreview(false)}
              className="mt-6 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded w-full"
            >
              Đóng xem trước
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestServiceForm;
