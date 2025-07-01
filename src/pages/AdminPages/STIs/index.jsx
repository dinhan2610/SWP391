import React, { useState, useMemo, useEffect } from "react";
// Nếu có thể, hãy cài thêm recharts hoặc chart.js để vẽ biểu đồ đẹp hơn
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const MOCK_ORDERS = [
  {
    id: 1,
    time: "2025-07-01T09:15:00",
    name: "Nguyễn Văn A",
    dob: "1995-05-10",
    phone: "0912345678",
    address: "Q1, TP.HCM",
    tests: ["HIV", "Giang mai (Syphilis)"],
    package: "Cơ bản",
    total: 690000,
    sampleType: "clinic",
    status: "pending", // pending, paid, completed, canceled
    emailSent: false,
    resultFile: null,
    note: "",
  },
  {
    id: 2,
    time: "2025-07-01T10:30:00",
    name: "Trần Thị B",
    dob: "1988-12-22",
    phone: "0987654321",
    address: "Q3, TP.HCM",
    tests: ["HIV", "Lậu (Gonorrhea)", "Chlamydia"],
    package: "Phổ biến",
    total: 920000,
    sampleType: "home",
    status: "paid",
    emailSent: true,
    resultFile: "result_2.pdf",
    note: "",
  },
  // ... Thêm nhiều đơn mẫu ...
];

const MOCK_PACKAGES = [
  {
    name: "Cơ bản",
    tests: ["HIV", "Giang mai (Syphilis)", "Lậu (Gonorrhea)"],
    price: 690000,
    save: 50000,
  },
  {
    name: "Phổ biến",
    tests: ["HIV", "Giang mai (Syphilis)", "Lậu (Gonorrhea)", "Chlamydia"],
    price: 920000,
    save: 80000,
  },
  {
    name: "Nâng cao",
    tests: [
      "HIV",
      "Giang mai (Syphilis)",
      "Lậu (Gonorrhea)",
      "Chlamydia",
      "HPV",
      "Viêm gan B/C",
      "Herpes sinh dục",
    ],
    price: 1600000,
    save: 210000,
  },
];

const MOCK_TESTS = [
  {
    name: "HIV",
    desc: "Virus gây suy giảm miễn dịch",
    price: 250000,
    active: true,
  },
  {
    name: "Giang mai (Syphilis)",
    desc: "Loét sinh dục",
    price: 220000,
    active: true,
  },
  {
    name: "Lậu (Gonorrhea)",
    desc: "Viêm niệu đạo",
    price: 270000,
    active: true,
  },
  {
    name: "Chlamydia",
    desc: "Nhiễm khuẩn âm thầm",
    price: 260000,
    active: true,
  },
  {
    name: "HPV",
    desc: "Virus gây mụn cóc sinh dục",
    price: 400000,
    active: true,
  },
  {
    name: "Viêm gan B/C",
    desc: "Virus tấn công gan",
    price: 230000,
    active: true,
  },
  {
    name: "Herpes sinh dục",
    desc: "Mụn nước, lở loét",
    price: 280000,
    active: true,
  },
];

const MOCK_CUSTOMERS = [
  {
    name: "Nguyễn Văn A",
    phone: "0912345678",
    address: "Q1, TP.HCM",
    dob: "1995-05-10",
    orders: [1],
  },
  {
    name: "Trần Thị B",
    phone: "0987654321",
    address: "Q3, TP.HCM",
    dob: "1988-12-22",
    orders: [2],
  },
  // ...
];

const MOCK_ADMINS = [
  { username: "admin", role: "Super Admin", email: "admin@healthwise.vn" },
  { username: "nv1", role: "Nhân viên", email: "nv1@healthwise.vn" },
];

function formatMoney(n) {
  return n.toLocaleString() + "đ";
}

function getLocalOrders() {
  try {
    const data = JSON.parse(localStorage.getItem("stis_history"));
    if (Array.isArray(data)) {
      // Map lại cho đúng định dạng admin cần
      return data.map((item, idx) => ({
        id: idx + 1,
        time: item.time
          ? new Date(item.time).toISOString()
          : new Date().toISOString(),
        name: item.user?.name || "",
        dob: item.user?.dob || "",
        phone: item.user?.phone || "",
        address: item.user?.address || "",
        tests: item.tests || [],
        package: getPackageName(item.tests),
        total: item.total,
        sampleType: item.sampleType,
        status: item.paid
          ? item.resultSent
            ? "completed"
            : "paid"
          : "pending",
        emailSent: !!item.resultSent,
        resultFile: item.resultFile || null,
        note: item.note || "",
      }));
    }
  } catch {
    /* ignore parse error */
  }
  return null;
}

function setLocalOrders(orders) {
  // Chuyển về định dạng stis_history
  const data = orders.map((o) => ({
    time: o.time,
    tests: o.tests,
    total: o.total,
    paid: o.status === "paid" || o.status === "completed",
    sampleType: o.sampleType,
    user: { name: o.name, dob: o.dob, address: o.address, phone: o.phone },
    resultSent: o.status === "completed",
    resultFile: o.resultFile || null,
    note: o.note || "",
  }));
  localStorage.setItem("stis_history", JSON.stringify(data));
}

function getPackageName(tests) {
  if (!Array.isArray(tests)) return "";
  if (tests.length === 7) return "Nâng cao";
  if (tests.length === 4 && tests.includes("Chlamydia")) return "Phổ biến";
  if (tests.length === 3 && tests.includes("Lậu (Gonorrhea)")) return "Cơ bản";
  return "Tùy chọn";
}

const sidebarItems = [
  { key: "dashboard", label: "Tổng quan & Dashboard", icon: "📊" },
  { key: "orders", label: "Quản lý Đơn Đăng Ký", icon: "📝" },
  { key: "packages", label: "Gói & Danh mục Xét nghiệm", icon: "🧪" },
];

// Style tiêu đề đồng bộ, hiện đại
const headingStyle = {
  fontFamily: "Montserrat, Arial, sans-serif",
  fontWeight: 700,
  fontSize: "2rem",
  lineHeight: 1.2,
  letterSpacing: "0.02em",
  textAlign: "left",
  color: "#1a237e",
  margin: "0 0 16px 0",
  textShadow: "0 2px 8px rgba(26,35,126,0.06)",
};
const subHeadingStyle = {
  fontFamily: "Montserrat, Arial, sans-serif",
  fontWeight: 600,
  fontSize: "1.25rem",
  lineHeight: 1.3,
  letterSpacing: "0.01em",
  textAlign: "left",
  color: "#283593",
  margin: "0 0 12px 0",
};
const modalHeadingStyle = {
  ...headingStyle,
  fontSize: "1.5rem",
  color: "#1565c0",
  textAlign: "center",
  margin: "25px 0 20px 0", // Thêm margin-top: 25px
};

// Button hover color constants
const BTN_PRIMARY = "#1565c0";
const BTN_PRIMARY_HOVER = "#0d47a1";
const BTN_SUCCESS = "#43a047";
const BTN_SUCCESS_HOVER = "#2e7031";
const BTN_EDIT_BG = "#e3f2fd";
const BTN_EDIT_HOVER = "#bbdefb";
const BTN_DELETE_BG = "#ffebee";
const BTN_DELETE_HOVER = "#ffcdd2";
const BTN_CANCEL_BG = "#eee";
const BTN_CANCEL_HOVER = "#bdbdbd";
const BTN_EMAIL_BG = "#e1bee7";
const BTN_EMAIL_HOVER = "#ce93d8";
const BTN_WARNING_BG = "#fff3e0";
const BTN_WARNING_HOVER = "#ffe0b2";
const BTN_CONFIRM_BG = "#c8e6c9";
const BTN_CONFIRM_HOVER = "#a5d6a7";

export default function AdminSTIs() {
  const [tab, setTab] = useState("dashboard");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [packageFilter] = useState("");
  const [sampleTypeFilter, setSampleTypeFilter] = useState("");
  const [message, setMessage] = useState("");
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [showTestModal, setShowTestModal] = useState(false);
  const [editingTest, setEditingTest] = useState(null);
  const [packages, setPackages] = useState(MOCK_PACKAGES);
  const [tests, setTests] = useState(MOCK_TESTS);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  // Form state cho modal Package
  const [packageForm, setPackageForm] = useState({
    name: "",
    tests: [],
    price: 0,
    save: 0,
  });
  useEffect(() => {
    if (showPackageModal) {
      setPackageForm(
        editingPackage || { name: "", tests: [], price: 0, save: 0 }
      );
    }
  }, [showPackageModal, editingPackage]);

  // Form state cho modal Test
  const [testForm, setTestForm] = useState({
    name: "",
    desc: "",
    price: 0,
    active: true,
  });
  useEffect(() => {
    if (showTestModal) {
      setTestForm(
        editingTest || { name: "", desc: "", price: 0, active: true }
      );
    }
  }, [showTestModal, editingTest]);

  // Form state cho modal Order
  const [orderForm, setOrderForm] = useState({
    time: new Date().toISOString(),
    name: "",
    dob: "",
    phone: "",
    address: "",
    tests: [],
    package: "",
    total: 0,
    sampleType: "clinic",
    status: "pending",
    emailSent: false,
    resultFile: null,
    note: "",
  });
  useEffect(() => {
    if (showOrderModal) {
      setOrderForm(
        editingOrder || {
          time: new Date().toISOString(),
          name: "",
          dob: "",
          phone: "",
          address: "",
          tests: [],
          package: "",
          total: 0,
          sampleType: "clinic",
          status: "pending",
          emailSent: false,
          resultFile: null,
          note: "",
        }
      );
    }
  }, [showOrderModal, editingOrder]);

  // Load dữ liệu từ localStorage, nếu không có thì dùng mock
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const local = getLocalOrders();
      setOrders(local && local.length > 0 ? local : MOCK_ORDERS);
      setLoading(false);
    }, 300);
  }, []);

  // Khi orders thay đổi, đồng bộ lại localStorage
  useEffect(() => {
    if (!loading) setLocalOrders(orders);
  }, [orders, loading]);

  // Thống kê nhanh
  const today = new Date().toISOString().slice(0, 10);
  const weekAgo = new Date(Date.now() - 7 * 86400000)
    .toISOString()
    .slice(0, 10);
  const monthAgo = new Date(Date.now() - 30 * 86400000)
    .toISOString()
    .slice(0, 10);
  const ordersToday = orders.filter((o) => o.time.slice(0, 10) === today);
  const ordersWeek = orders.filter((o) => o.time.slice(0, 10) >= weekAgo);
  const ordersMonth = orders.filter((o) => o.time.slice(0, 10) >= monthAgo);
  const revenue = orders
    .filter((o) => o.status === "paid" || o.status === "completed")
    .reduce((sum, o) => sum + o.total, 0);
  const pending = orders.filter((o) => o.status === "pending").length;
  const paid = orders.filter((o) => o.status === "paid").length;
  const completed = orders.filter((o) => o.status === "completed").length;
  const canceled = orders.filter((o) => o.status === "canceled").length;

  // Lọc đơn đăng ký
  const filteredOrders = useMemo(() => {
    return orders.filter(
      (o) =>
        (!search ||
          o.name.toLowerCase().includes(search.toLowerCase()) ||
          o.phone.includes(search) ||
          o.address.toLowerCase().includes(search.toLowerCase())) &&
        (!statusFilter || o.status === statusFilter) &&
        (!packageFilter || o.package === packageFilter) &&
        (!sampleTypeFilter || o.sampleType === sampleTypeFilter)
    );
  }, [orders, search, statusFilter, packageFilter, sampleTypeFilter]);

  // Thao tác nhanh (đồng bộ localStorage)
  const handleStatus = (id, status) => {
    setLoading(true);
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    setTimeout(() => {
      setLoading(false);
      setMessage("Cập nhật trạng thái thành công!");
      setTimeout(() => setMessage(""), 1500);
    }, 400);
  };
  const handleSendEmail = (id) => {
    setLoading(true);
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? {
              ...o,
              emailSent: true,
              status: o.status === "paid" ? "completed" : o.status,
            }
          : o
      )
    );
    setTimeout(() => {
      setLoading(false);
      setMessage("Đã gửi email kết quả cho khách hàng!");
      setTimeout(() => setMessage(""), 1500);
    }, 400);
  };
  const handleCancel = (id) => {
    const reason = prompt("Nhập lý do hủy đơn:");
    if (reason) {
      setLoading(true);
      setOrders((prev) =>
        prev.map((o) =>
          o.id === id ? { ...o, status: "canceled", note: reason } : o
        )
      );
      setTimeout(() => {
        setLoading(false);
        setMessage("Đã hủy đơn thành công!");
        setTimeout(() => setMessage(""), 1500);
      }, 400);
    }
  };

  // CRUD cho Packages
  const handleAddPackage = () => {
    setEditingPackage(null);
    setShowPackageModal(true);
  };
  const handleEditPackage = (pkg) => {
    setEditingPackage(pkg);
    setShowPackageModal(true);
  };
  const handleDeletePackage = (name) => {
    if (window.confirm("Bạn có chắc muốn xóa gói này?")) {
      setPackages((prev) => prev.filter((p) => p.name !== name));
      setMessage("Đã xóa gói xét nghiệm!");
      setTimeout(() => setMessage(""), 1500);
    }
  };
  const handleSavePackage = (pkg) => {
    if (editingPackage) {
      setPackages((prev) =>
        prev.map((p) => (p.name === editingPackage.name ? pkg : p))
      );
      setMessage("Đã cập nhật gói!");
    } else {
      setPackages((prev) => [...prev, pkg]);
      setMessage("Đã thêm gói mới!");
    }
    setShowPackageModal(false);
    setTimeout(() => setMessage(""), 1500);
  };

  // CRUD cho Tests
  const handleAddTest = () => {
    setEditingTest(null);
    setShowTestModal(true);
  };
  const handleEditTest = (test) => {
    setEditingTest(test);
    setShowTestModal(true);
  };
  const handleDeleteTest = (key) => {
    if (window.confirm("Bạn có chắc muốn xóa danh mục này?")) {
      setTests((prev) => prev.filter((t) => t.key !== key));
      setMessage("Đã xóa danh mục xét nghiệm!");
      setTimeout(() => setMessage(""), 1500);
    }
  };
  const handleSaveTest = (test) => {
    if (editingTest) {
      setTests((prev) =>
        prev.map((t) => (t.key === editingTest.key ? test : t))
      );
      setMessage("Đã cập nhật danh mục!");
    } else {
      setTests((prev) => [...prev, test]);
      setMessage("Đã thêm danh mục mới!");
    }
    setShowTestModal(false);
    setTimeout(() => setMessage(""), 1500);
  };

  // CRUD cho Đơn đăng ký
  const handleAddOrder = () => {
    setEditingOrder(null);
    setShowOrderModal(true);
  };
  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setShowOrderModal(true);
  };
  const handleDeleteOrder = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa đơn này?")) {
      setOrders((prev) => prev.filter((o) => o.id !== id));
      setMessage("Đã xóa đơn đăng ký!");
      setTimeout(() => setMessage(""), 1500);
    }
  };
  const handleSaveOrder = (order) => {
    if (editingOrder) {
      setOrders((prev) =>
        prev.map((o) => (o.id === editingOrder.id ? order : o))
      );
      setMessage("Đã cập nhật đơn!");
    } else {
      setOrders((prev) => [...prev, { ...order, id: Date.now() }]);
      setMessage("Đã thêm đơn mới!");
    }
    setShowOrderModal(false);
    setTimeout(() => setMessage(""), 1500);
  };

  return (
    <div
      style={{
        fontFamily: "Montserrat, Arial, sans-serif",
        background: "#f7f9fc",
        minHeight: "100vh",
      }}
    >
      {/* Hiển thị message thông báo */}
      {message && (
        <div
          style={{
            position: "fixed",
            top: 24,
            right: 24,
            zIndex: 9999,
            background: "#1565c0",
            color: "#fff",
            padding: "12px 28px",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 16,
            boxShadow: "0 2px 8px #b3c6e7",
          }}
        >
          {message}
        </div>
      )}
      {/* Sidebar và header */}
      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* Sidebar đã bị xóa */}
        {/* Main content */}
        <div style={{ flex: 1, padding: "32px 24px 24px 24px" }}>
          {/* Tiêu đề chính */}
          <h1 style={headingStyle}>Quản trị Xét nghiệm STIs</h1>
          {/* Tabs */}
          <div style={{ display: "flex", gap: 16, marginBottom: 32 }}>
            {sidebarItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setTab(item.key)}
                style={{
                  fontFamily: "Montserrat, Arial, sans-serif",
                  fontWeight: tab === item.key ? 700 : 500,
                  fontSize: "1.25rem",
                  letterSpacing: "0.01em",
                  color: tab === item.key ? BTN_PRIMARY : "#333",
                  background: tab === item.key ? BTN_EDIT_BG : "#fff",
                  border:
                    tab === item.key
                      ? `3px solid ${BTN_PRIMARY}`
                      : "2px solid #e0e0e0",
                  padding: "16px 36px",
                  borderRadius: 12,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  boxShadow: tab === item.key ? "0 4px 16px #e3e7ef" : "none",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = BTN_EDIT_HOVER;
                  e.currentTarget.style.color = BTN_PRIMARY;
                  e.currentTarget.style.border = `3px solid ${BTN_PRIMARY}`;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background =
                    tab === item.key ? BTN_EDIT_BG : "#fff";
                  e.currentTarget.style.color =
                    tab === item.key ? BTN_PRIMARY : "#333";
                  e.currentTarget.style.border =
                    tab === item.key
                      ? `3px solid ${BTN_PRIMARY}`
                      : "2px solid #e0e0e0";
                }}
              >
                <span style={{ marginRight: 12, fontSize: "1.5rem" }}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            ))}
          </div>

          {/* Nội dung từng tab */}
          {tab === "dashboard" && (
            <section>
              <h2 style={subHeadingStyle}>Tổng quan hệ thống</h2>
              {/* Thống kê nhanh */}
              <div style={{ display: "flex", gap: 32, marginBottom: 32 }}>
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 12,
                    boxShadow: "0 2px 8px #e3e7ef",
                    padding: 24,
                    minWidth: 180,
                  }}
                >
                  <div
                    style={{
                      fontSize: 32,
                      fontWeight: 700,
                      color: "#1565c0",
                      marginBottom: 8,
                    }}
                  >
                    {ordersToday.length}
                  </div>
                  <div style={{ color: "#333", fontWeight: 500 }}>
                    Đơn hôm nay
                  </div>
                </div>
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 12,
                    boxShadow: "0 2px 8px #e3e7ef",
                    padding: 24,
                    minWidth: 180,
                  }}
                >
                  <div
                    style={{
                      fontSize: 32,
                      fontWeight: 700,
                      color: "#43a047",
                      marginBottom: 8,
                    }}
                  >
                    {ordersWeek.length}
                  </div>
                  <div style={{ color: "#333", fontWeight: 500 }}>
                    Đơn 7 ngày
                  </div>
                </div>
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 12,
                    boxShadow: "0 2px 8px #e3e7ef",
                    padding: 24,
                    minWidth: 180,
                  }}
                >
                  <div
                    style={{
                      fontSize: 32,
                      fontWeight: 700,
                      color: "#fbc02d",
                      marginBottom: 8,
                    }}
                  >
                    {ordersMonth.length}
                  </div>
                  <div style={{ color: "#333", fontWeight: 500 }}>
                    Đơn 30 ngày
                  </div>
                </div>
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 12,
                    boxShadow: "0 2px 8px #e3e7ef",
                    padding: 24,
                    minWidth: 180,
                  }}
                >
                  <div
                    style={{
                      fontSize: 32,
                      fontWeight: 700,
                      color: "#d32f2f",
                      marginBottom: 8,
                    }}
                  >
                    {revenue.toLocaleString()}đ
                  </div>
                  <div style={{ color: "#333", fontWeight: 500 }}>
                    Doanh thu
                  </div>
                </div>
              </div>
              {/* Biểu đồ tổng quan (ví dụ sử dụng recharts) */}
              <div
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  boxShadow: "0 2px 8px #e3e7ef",
                  padding: 24,
                  marginBottom: 32,
                }}
              >
                <h3 style={{ ...subHeadingStyle, marginBottom: 16 }}>
                  Biểu đồ trạng thái đơn
                </h3>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart
                    data={[
                      { name: "Chờ xử lý", value: pending },
                      { name: "Đã thanh toán", value: paid },
                      { name: "Hoàn thành", value: completed },
                      { name: "Đã hủy", value: canceled },
                    ]}
                  >
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#1565c0" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>
          )}
          {tab === "orders" && (
            <section>
              <h2 style={subHeadingStyle}>Quản lý Đơn đăng ký xét nghiệm</h2>
              {/* Thanh tìm kiếm/filter */}
              <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tìm theo tên, SĐT, địa chỉ..."
                  style={{
                    padding: 8,
                    borderRadius: 8,
                    border: "1px solid #ccc",
                    minWidth: 220,
                  }}
                />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{
                    padding: 8,
                    borderRadius: 8,
                    border: "1px solid #ccc",
                  }}
                >
                  <option value="">Tất cả trạng thái</option>
                  <option value="pending">Chờ xử lý</option>
                  <option value="paid">Đã thanh toán</option>
                  <option value="completed">Hoàn thành</option>
                  <option value="canceled">Đã hủy</option>
                </select>
                <select
                  value={sampleTypeFilter}
                  onChange={(e) => setSampleTypeFilter(e.target.value)}
                  style={{
                    padding: 8,
                    borderRadius: 8,
                    border: "1px solid #ccc",
                  }}
                >
                  <option value="">Tất cả hình thức</option>
                  <option value="clinic">Tại phòng khám</option>
                  <option value="home">Tại nhà</option>
                </select>
                <button
                  onClick={handleAddOrder}
                  style={{
                    padding: "8px 18px",
                    borderRadius: 8,
                    background: BTN_PRIMARY,
                    color: "#fff",
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.background = BTN_PRIMARY_HOVER)
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.background = BTN_PRIMARY)
                  }
                >
                  + Thêm đơn
                </button>
              </div>
              {/* Bảng đơn đăng ký */}
              <div
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  boxShadow: "0 2px 8px #e3e7ef",
                  padding: 16,
                }}
              >
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#f5f7ff" }}>
                      <th style={{ padding: 10, fontWeight: 700 }}>Tên KH</th>
                      <th style={{ padding: 10, fontWeight: 700 }}>SĐT</th>
                      <th style={{ padding: 10, fontWeight: 700 }}>
                        Xét nghiệm
                      </th>
                      <th style={{ padding: 10, fontWeight: 700 }}>
                        Tổng tiền
                      </th>
                      <th style={{ padding: 10, fontWeight: 700 }}>
                        Trạng thái
                      </th>
                      <th style={{ padding: 10, fontWeight: 700 }}>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr
                        key={order.id}
                        style={{ borderBottom: "1px solid #eee" }}
                      >
                        <td style={{ padding: 10 }}>{order.name}</td>
                        <td style={{ padding: 10 }}>{order.phone}</td>
                        <td style={{ padding: 10 }}>
                          {order.tests && order.tests.length
                            ? order.tests.join(", ")
                            : ""}
                        </td>
                        <td style={{ padding: 10 }}>
                          {formatMoney(order.total)}
                        </td>
                        <td style={{ padding: 10 }}>
                          {order.status === "pending"
                            ? "Chờ xử lý"
                            : order.status === "paid"
                            ? "Đã thanh toán"
                            : order.status === "completed"
                            ? "Hoàn thành"
                            : "Đã hủy"}
                        </td>
                        <td style={{ padding: 10 }}>
                          <button
                            onClick={() => handleEditOrder(order)}
                            style={{
                              marginRight: 8,
                              padding: "4px 10px",
                              borderRadius: 6,
                              border: "none",
                              background: BTN_EDIT_BG,
                              color: "#1565c0",
                              fontWeight: 600,
                              cursor: "pointer",
                              transition: "all 0.2s",
                            }}
                            onMouseOver={(e) =>
                              (e.currentTarget.style.background =
                                BTN_EDIT_HOVER)
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.style.background = BTN_EDIT_BG)
                            }
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => handleDeleteOrder(order.id)}
                            style={{
                              marginRight: 8,
                              padding: "4px 10px",
                              borderRadius: 6,
                              border: "none",
                              background: BTN_DELETE_BG,
                              color: "#d32f2f",
                              fontWeight: 600,
                              cursor: "pointer",
                              transition: "all 0.2s",
                            }}
                            onMouseOver={(e) =>
                              (e.currentTarget.style.background =
                                BTN_DELETE_HOVER)
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.style.background = BTN_DELETE_BG)
                            }
                          >
                            Xóa
                          </button>
                          <button
                            onClick={() =>
                              handleStatus(
                                order.id,
                                order.status === "pending"
                                  ? "paid"
                                  : "completed"
                              )
                            }
                            style={{
                              marginRight: 8,
                              padding: "4px 10px",
                              borderRadius: 6,
                              border: "none",
                              background: BTN_CONFIRM_BG,
                              color: "#388e3c",
                              fontWeight: 600,
                              cursor: "pointer",
                              transition: "all 0.2s",
                            }}
                            onMouseOver={(e) =>
                              (e.currentTarget.style.background =
                                BTN_CONFIRM_HOVER)
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.style.background =
                                BTN_CONFIRM_BG)
                            }
                          >
                            {order.status === "pending"
                              ? "Xác nhận"
                              : "Hoàn thành"}
                          </button>
                          <button
                            onClick={() => handleCancel(order.id)}
                            style={{
                              marginRight: 8,
                              padding: "4px 10px",
                              borderRadius: 6,
                              border: "none",
                              background: BTN_WARNING_BG,
                              color: "#fbc02d",
                              fontWeight: 600,
                              cursor: "pointer",
                              transition: "all 0.2s",
                            }}
                            onMouseOver={(e) =>
                              (e.currentTarget.style.background =
                                BTN_WARNING_HOVER)
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.style.background =
                                BTN_WARNING_BG)
                            }
                          >
                            Hủy
                          </button>
                          <button
                            onClick={() => handleSendEmail(order.id)}
                            style={{
                              padding: "4px 10px",
                              borderRadius: 6,
                              border: "none",
                              background: BTN_EMAIL_BG,
                              color: "#6a1b9a",
                              fontWeight: 600,
                              cursor: "pointer",
                              transition: "all 0.2s",
                            }}
                            onMouseOver={(e) =>
                              (e.currentTarget.style.background =
                                BTN_EMAIL_HOVER)
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.style.background = BTN_EMAIL_BG)
                            }
                          >
                            Gửi email
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
          {tab === "packages" && (
            <section>
              <h2 style={subHeadingStyle}>Gói & Danh mục xét nghiệm</h2>
              <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
                <button
                  onClick={handleAddPackage}
                  style={{
                    padding: "8px 18px",
                    borderRadius: 8,
                    background: BTN_PRIMARY,
                    color: "#fff",
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  + Thêm gói
                </button>
                <button
                  onClick={handleAddTest}
                  style={{
                    padding: "8px 18px",
                    borderRadius: 8,
                    background: BTN_SUCCESS,
                    color: "#fff",
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  + Thêm danh mục
                </button>
              </div>
              {/* Danh sách gói xét nghiệm */}
              <div
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  boxShadow: "0 2px 8px #e3e7ef",
                  padding: 16,
                  marginBottom: 24,
                }}
              >
                <h3 style={{ ...subHeadingStyle, marginBottom: 8 }}>
                  Gói xét nghiệm
                </h3>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#f5f7ff" }}>
                      <th style={{ padding: 10, fontWeight: 700 }}>Tên gói</th>
                      <th style={{ padding: 10, fontWeight: 700 }}>Danh mục</th>
                      <th style={{ padding: 10, fontWeight: 700 }}>Giá</th>
                      <th style={{ padding: 10, fontWeight: 700 }}>
                        Tiết kiệm
                      </th>
                      <th style={{ padding: 10, fontWeight: 700 }}>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {packages.map((pkg) => (
                      <tr
                        key={pkg.name}
                        style={{ borderBottom: "1px solid #eee" }}
                      >
                        <td style={{ padding: 10 }}>{pkg.name}</td>
                        <td style={{ padding: 10 }}>{pkg.tests.join(", ")}</td>
                        <td style={{ padding: 10 }}>
                          {formatMoney(pkg.price)}
                        </td>
                        <td style={{ padding: 10 }}>{formatMoney(pkg.save)}</td>
                        <td style={{ padding: 10, display: "flex", gap: 8 }}>
                          <button
                            onClick={() => handleEditPackage(pkg)}
                            style={{
                              marginRight: 0,
                              padding: "4px 10px",
                              borderRadius: 6,
                              border: "none",
                              background: BTN_EDIT_BG,
                              color: "#1565c0",
                              fontWeight: 600,
                              cursor: "pointer",
                              transition: "all 0.2s",
                            }}
                            onMouseOver={(e) =>
                              (e.currentTarget.style.background =
                                BTN_EDIT_HOVER)
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.style.background = BTN_EDIT_BG)
                            }
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => handleDeletePackage(pkg.name)}
                            style={{
                              padding: "4px 10px",
                              borderRadius: 6,
                              border: "none",
                              background: BTN_DELETE_BG,
                              color: "#d32f2f",
                              fontWeight: 600,
                              cursor: "pointer",
                              transition: "all 0.2s",
                            }}
                            onMouseOver={(e) =>
                              (e.currentTarget.style.background =
                                BTN_DELETE_HOVER)
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.style.background = BTN_DELETE_BG)
                            }
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Modal thêm/sửa gói xét nghiệm chỉ hiển thị ở đây */}
                {showPackageModal && (
                  <div className="modal-stis">
                    <div className="modal-content-stis">
                      <div style={modalHeadingStyle}>
                        {editingPackage
                          ? "Chỉnh sửa Gói xét nghiệm"
                          : "Thêm Gói xét nghiệm"}
                      </div>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleSavePackage(packageForm);
                        }}
                      >
                        <input
                          value={packageForm.name}
                          onChange={(e) =>
                            setPackageForm((f) => ({
                              ...f,
                              name: e.target.value,
                            }))
                          }
                          placeholder="Tên gói"
                          style={{
                            marginBottom: 10,
                            padding: 8,
                            borderRadius: 8,
                            border: "1px solid #ccc",
                            width: "100%",
                          }}
                          required
                        />
                        <input
                          value={packageForm.tests.join(", ")}
                          onChange={(e) =>
                            setPackageForm((f) => ({
                              ...f,
                              tests: e.target.value
                                .split(",")
                                .map((s) => s.trim()),
                            }))
                          }
                          placeholder="Danh mục (phẩy)"
                          style={{
                            marginBottom: 10,
                            padding: 8,
                            borderRadius: 8,
                            border: "1px solid #ccc",
                            width: "100%",
                          }}
                          required
                        />
                        <input
                          type="number"
                          value={packageForm.price}
                          onChange={(e) =>
                            setPackageForm((f) => ({
                              ...f,
                              price: +e.target.value,
                            }))
                          }
                          placeholder="Giá"
                          style={{
                            marginBottom: 10,
                            padding: 8,
                            borderRadius: 8,
                            border: "1px solid #ccc",
                            width: "100%",
                          }}
                          required
                        />
                        <input
                          type="number"
                          value={packageForm.save}
                          onChange={(e) =>
                            setPackageForm((f) => ({
                              ...f,
                              save: +e.target.value,
                            }))
                          }
                          placeholder="Tiết kiệm"
                          style={{
                            marginBottom: 16,
                            padding: 8,
                            borderRadius: 8,
                            border: "1px solid #ccc",
                            width: "100%",
                          }}
                        />
                        <div
                          style={{
                            display: "flex",
                            gap: 12,
                            justifyContent: "flex-end",
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => setShowPackageModal(false)}
                            style={{
                              padding: "8px 18px",
                              borderRadius: 8,
                              background: BTN_CANCEL_BG,
                              color: "#333",
                              fontWeight: 600,
                              border: "none",
                              cursor: "pointer",
                              transition: "all 0.2s",
                            }}
                            onMouseOver={(e) =>
                              (e.currentTarget.style.background =
                                BTN_CANCEL_HOVER)
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.style.background = BTN_CANCEL_BG)
                            }
                          >
                            Hủy
                          </button>
                          <button
                            type="submit"
                            style={{
                              padding: "8px 18px",
                              borderRadius: 8,
                              background: "#1565c0",
                              color: "#fff",
                              fontWeight: 600,
                              border: "none",
                              cursor: "pointer",
                              transition: "all 0.2s",
                            }}
                            onMouseOver={(e) =>
                              (e.currentTarget.style.background =
                                BTN_PRIMARY_HOVER)
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.style.background = BTN_PRIMARY)
                            }
                          >
                            Lưu
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
              {/* Danh sách danh mục xét nghiệm */}
              <div
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  boxShadow: "0 2px 8px #e3e7ef",
                  padding: 16,
                }}
              >
                <h3 style={{ ...subHeadingStyle, marginBottom: 8 }}>
                  Danh mục xét nghiệm
                </h3>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#f5f7ff" }}>
                      <th style={{ padding: 10, fontWeight: 700 }}>Tên</th>
                      <th style={{ padding: 10, fontWeight: 700 }}>Mô tả</th>
                      <th style={{ padding: 10, fontWeight: 700 }}>Giá</th>
                      <th style={{ padding: 10, fontWeight: 700 }}>
                        Trạng thái
                      </th>
                      <th style={{ padding: 10, fontWeight: 700 }}>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tests.map((test, idx) => (
                      <tr
                        key={test.name + idx}
                        style={{ borderBottom: "1px solid #eee" }}
                      >
                        <td style={{ padding: 10 }}>{test.name}</td>
                        <td style={{ padding: 10 }}>{test.desc}</td>
                        <td style={{ padding: 10 }}>
                          {formatMoney(test.price)}
                        </td>
                        <td style={{ padding: 10 }}>
                          {test.active ? "Kích hoạt" : "Ẩn"}
                        </td>
                        <td style={{ padding: 10, display: "flex", gap: 8 }}>
                          <button
                            onClick={() => handleEditTest(test)}
                            style={{
                              marginRight: 0,
                              padding: "4px 10px",
                              borderRadius: 6,
                              border: "none",
                              background: BTN_EDIT_BG,
                              color: "#1565c0",
                              fontWeight: 600,
                              cursor: "pointer",
                              transition: "all 0.2s",
                            }}
                            onMouseOver={(e) =>
                              (e.currentTarget.style.background =
                                BTN_EDIT_HOVER)
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.style.background = BTN_EDIT_BG)
                            }
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => handleDeleteTest(test.name)}
                            style={{
                              padding: "4px 10px",
                              borderRadius: 6,
                              border: "none",
                              background: BTN_DELETE_BG,
                              color: "#d32f2f",
                              fontWeight: 600,
                              cursor: "pointer",
                              transition: "all 0.2s",
                            }}
                            onMouseOver={(e) =>
                              (e.currentTarget.style.background =
                                BTN_DELETE_HOVER)
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.style.background = BTN_DELETE_BG)
                            }
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Modal thêm/sửa đơn đăng ký */}
          {showOrderModal && tab === "orders" && (
            <div className="modal-stis">
              <div className="modal-content-stis">
                <div style={modalHeadingStyle}>
                  {editingOrder ? "Chỉnh sửa Đơn đăng ký" : "Thêm Đơn đăng ký"}
                </div>
                {/* Form nhập liệu đơn đăng ký (ví dụ, bạn có thể mở rộng thêm các trường) */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSaveOrder(orderForm);
                  }}
                >
                  <input
                    value={orderForm.name}
                    onChange={(e) =>
                      setOrderForm((f) => ({ ...f, name: e.target.value }))
                    }
                    placeholder="Tên khách hàng"
                    style={{
                      marginBottom: 10,
                      padding: 8,
                      borderRadius: 8,
                      border: "1px solid #ccc",
                      width: "100%",
                    }}
                    required
                  />
                  <input
                    value={orderForm.phone}
                    onChange={(e) =>
                      setOrderForm((f) => ({ ...f, phone: e.target.value }))
                    }
                    placeholder="Số điện thoại"
                    style={{
                      marginBottom: 10,
                      padding: 8,
                      borderRadius: 8,
                      border: "1px solid #ccc",
                      width: "100%",
                    }}
                    required
                  />
                  <input
                    value={orderForm.package}
                    onChange={(e) =>
                      setOrderForm((f) => ({ ...f, package: e.target.value }))
                    }
                    placeholder="Gói"
                    style={{
                      marginBottom: 10,
                      padding: 8,
                      borderRadius: 8,
                      border: "1px solid #ccc",
                      width: "100%",
                    }}
                    required
                  />
                  <input
                    type="number"
                    value={orderForm.total}
                    onChange={(e) =>
                      setOrderForm((f) => ({ ...f, total: +e.target.value }))
                    }
                    placeholder="Tổng tiền"
                    style={{
                      marginBottom: 10,
                      padding: 8,
                      borderRadius: 8,
                      border: "1px solid #ccc",
                      width: "100%",
                    }}
                    required
                  />
                  <select
                    value={orderForm.status}
                    onChange={(e) =>
                      setOrderForm((f) => ({ ...f, status: e.target.value }))
                    }
                    style={{
                      marginBottom: 10,
                      padding: 8,
                      borderRadius: 8,
                      border: "1px solid #ccc",
                      width: "100%",
                    }}
                  >
                    <option value="pending">Chờ xử lý</option>
                    <option value="paid">Đã thanh toán</option>
                    <option value="completed">Hoàn thành</option>
                    <option value="canceled">Đã hủy</option>
                  </select>
                  <select
                    value={orderForm.sampleType}
                    onChange={(e) =>
                      setOrderForm((f) => ({
                        ...f,
                        sampleType: e.target.value,
                      }))
                    }
                    style={{
                      marginBottom: 10,
                      padding: 8,
                      borderRadius: 8,
                      border: "1px solid #ccc",
                      width: "100%",
                    }}
                  >
                    <option value="clinic">Tại phòng khám</option>
                    <option value="home">Tại nhà</option>
                  </select>
                  <input
                    value={orderForm.address}
                    onChange={(e) =>
                      setOrderForm((f) => ({ ...f, address: e.target.value }))
                    }
                    placeholder="Địa chỉ"
                    style={{
                      marginBottom: 10,
                      padding: 8,
                      borderRadius: 8,
                      border: "1px solid #ccc",
                      width: "100%",
                    }}
                  />
                  <input
                    value={orderForm.dob}
                    onChange={(e) =>
                      setOrderForm((f) => ({ ...f, dob: e.target.value }))
                    }
                    placeholder="Ngày sinh"
                    style={{
                      marginBottom: 10,
                      padding: 8,
                      borderRadius: 8,
                      border: "1px solid #ccc",
                      width: "100%",
                    }}
                  />
                  <input
                    value={orderForm.tests.join(", ")}
                    onChange={(e) =>
                      setOrderForm((f) => ({
                        ...f,
                        tests: e.target.value.split(",").map((s) => s.trim()),
                      }))
                    }
                    placeholder="Danh mục (phẩy)"
                    style={{
                      marginBottom: 10,
                      padding: 8,
                      borderRadius: 8,
                      border: "1px solid #ccc",
                      width: "100%",
                    }}
                  />
                  <input
                    value={orderForm.note}
                    onChange={(e) =>
                      setOrderForm((f) => ({ ...f, note: e.target.value }))
                    }
                    placeholder="Ghi chú"
                    style={{
                      marginBottom: 16,
                      padding: 8,
                      borderRadius: 8,
                      border: "1px solid #ccc",
                      width: "100%",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      gap: 12,
                      justifyContent: "flex-end",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setShowOrderModal(false)}
                      style={{
                        padding: "8px 18px",
                        borderRadius: 8,
                        background: BTN_CANCEL_BG,
                        color: "#333",
                        fontWeight: 600,
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.background = BTN_CANCEL_HOVER)
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.background = BTN_CANCEL_BG)
                      }
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      style={{
                        padding: "8px 18px",
                        borderRadius: 8,
                        background: "#1565c0",
                        color: "#fff",
                        fontWeight: 600,
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.background = BTN_PRIMARY_HOVER)
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.background = BTN_PRIMARY)
                      }
                    >
                      Lưu
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Modal thêm/sửa danh mục xét nghiệm */}
          {showTestModal && tab === "packages" && (
            <div className="modal-stis">
              <div className="modal-content-stis">
                <div style={modalHeadingStyle}>
                  {editingTest
                    ? "Chỉnh sửa Danh mục xét nghiệm"
                    : "Thêm Danh mục xét nghiệm"}
                </div>
                {/* Form nhập liệu danh mục xét nghiệm */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSaveTest(testForm);
                  }}
                >
                  <input
                    value={testForm.name}
                    onChange={(e) =>
                      setTestForm((f) => ({ ...f, name: e.target.value }))
                    }
                    placeholder="Tên danh mục"
                    style={{
                      marginBottom: 10,
                      padding: 8,
                      borderRadius: 8,
                      border: "1px solid #ccc",
                      width: "100%",
                    }}
                    required
                  />
                  <input
                    value={testForm.desc}
                    onChange={(e) =>
                      setTestForm((f) => ({ ...f, desc: e.target.value }))
                    }
                    placeholder="Mô tả"
                    style={{
                      marginBottom: 10,
                      padding: 8,
                      borderRadius: 8,
                      border: "1px solid #ccc",
                      width: "100%",
                    }}
                  />
                  <input
                    type="number"
                    value={testForm.price}
                    onChange={(e) =>
                      setTestForm((f) => ({ ...f, price: +e.target.value }))
                    }
                    placeholder="Giá"
                    style={{
                      marginBottom: 10,
                      padding: 8,
                      borderRadius: 8,
                      border: "1px solid #ccc",
                      width: "100%",
                    }}
                    required
                  />
                  <select
                    value={testForm.active ? "1" : "0"}
                    onChange={(e) =>
                      setTestForm((f) => ({
                        ...f,
                        active: e.target.value === "1",
                      }))
                    }
                    style={{
                      marginBottom: 16,
                      padding: 8,
                      borderRadius: 8,
                      border: "1px solid #ccc",
                      width: "100%",
                    }}
                  >
                    <option value="1">Kích hoạt</option>
                    <option value="0">Ẩn</option>
                  </select>
                  <div
                    style={{
                      display: "flex",
                      gap: 12,
                      justifyContent: "flex-end",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setShowTestModal(false)}
                      style={{
                        padding: "8px 18px",
                        borderRadius: 8,
                        background: BTN_CANCEL_BG,
                        color: "#333",
                        fontWeight: 600,
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.background = BTN_CANCEL_HOVER)
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.background = BTN_CANCEL_BG)
                      }
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      style={{
                        padding: "8px 18px",
                        borderRadius: 8,
                        background: "#1565c0",
                        color: "#fff",
                        fontWeight: 600,
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.background = BTN_PRIMARY_HOVER)
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.background = BTN_PRIMARY)
                      }
                    >
                      Lưu
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
