import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const TESTS = [
  {
    key: "hiv",
    name: "HIV",
    desc: "Virus gây suy giảm miễn dịch, không chữa khỏi",
    who: "Người có quan hệ không an toàn, nhiều bạn tình, tiêm chích ma túy",
    sample: "Xét nghiệm máu",
    time: "1–2 ngày làm việc",
    price: 250000,
  },
  {
    key: "syphilis",
    name: "Giang mai (Syphilis)",
    desc: "Gây loét sinh dục, tổn thương tim, não nếu không điều trị",
    who: "Có vết loét, nổi hạch, quan hệ không an toàn",
    sample: "Máu / dịch thương tổn",
    time: "1–2 ngày làm việc",
    price: 220000,
  },
  {
    key: "gonorrhea",
    name: "Lậu (Gonorrhea)",
    desc: "Vi khuẩn gây viêm niệu đạo, đau rát khi đi tiểu",
    who: "Nam/nữ có triệu chứng tiểu buốt, khí hư bất thường",
    sample: "Nước tiểu / dịch niệu đạo",
    time: "2 ngày làm việc",
    price: 270000,
  },
  {
    key: "chlamydia",
    name: "Chlamydia",
    desc: "Nhiễm khuẩn âm thầm nhưng có thể gây vô sinh nếu kéo dài",
    who: "Người có quan hệ tình dục không an toàn, đặc biệt là nữ trẻ tuổi",
    sample: "Nước tiểu / dịch âm đạo",
    time: "2 ngày làm việc",
    price: 260000,
  },
  {
    key: "hpv",
    name: "HPV",
    desc: "Virus gây mụn cóc sinh dục, ung thư cổ tử cung",
    who: "Phụ nữ từ 21 tuổi, người có nhiều bạn tình",
    sample: "Dịch cổ tử cung / xét nghiệm Pap",
    time: "5–7 ngày làm việc",
    price: 400000,
  },
  {
    key: "hepatitis",
    name: "Viêm gan B/C",
    desc: "Virus tấn công gan, có thể dẫn đến ung thư gan",
    who: "Người có tiền sử truyền máu, quan hệ không an toàn",
    sample: "Máu",
    time: "1–2 ngày làm việc",
    price: 230000,
  },
  {
    key: "herpes",
    name: "Herpes sinh dục",
    desc: "Gây mụn nước, lở loét ở bộ phận sinh dục",
    who: "Người có triệu chứng mụn rộp, lở loét, ngứa vùng kín",
    sample: "Dịch từ vết loét / máu",
    time: "2–3 ngày làm việc",
    price: 280000,
  },
];

const PACKAGES = [
  {
    name: "Gói Cơ bản",
    tests: ["HIV", "Giang mai (Syphilis)", "Lậu (Gonorrhea)"],
    price: 690000,
    save: 50000,
  },
  {
    name: "Gói Phổ biến",
    tests: ["HIV", "Giang mai (Syphilis)", "Lậu (Gonorrhea)", "Chlamydia"],
    price: 920000,
    save: 80000,
  },
  {
    name: "Gói Nâng cao",
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

export default function STIsTest() {
  const [selected, setSelected] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false); // loading khi đăng ký
  const [sampleType, setSampleType] = useState("clinic"); // "clinic" hoặc "home"
  const historyRef = useRef(null); // ref để cuộn tới lịch sử
  const navigate = useNavigate();
  const location = useLocation();

  // Nhận thông tin đơn hàng đã thanh toán từ PaymentPage và cập nhật lịch sử
  useEffect(() => {
    if (location.state && location.state.paidOrder) {
      const paidOrder = location.state.paidOrder;
      setHistory((prev) => {
        // Tìm mục lịch sử khớp với tests, total, time
        const idx = prev.findIndex(
          (item) =>
            JSON.stringify(item.tests) === JSON.stringify(paidOrder.tests) &&
            item.total === paidOrder.price &&
            new Date(item.time).toLocaleString("vi-VN") === paidOrder.time
        );
        if (idx !== -1 && !prev[idx].paid) {
          // Cập nhật trạng thái paid
          const updated = [...prev];
          updated[idx] = { ...updated[idx], paid: true };
          return updated;
        }
        return prev;
      });
      // Xóa state sau khi xử lý để tránh cập nhật lại khi reload
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleSelect = (key) => {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleSelectPackage = (pkg) => {
    setSelected(
      TESTS.filter((t) => pkg.tests.includes(t.name)).map((t) => t.key)
    );
  };

  // Tính tổng phí, cộng thêm 50,000 nếu lấy mẫu tại nhà
  const total =
    selected.reduce(
      (sum, key) => sum + (TESTS.find((t) => t.key === key)?.price || 0),
      0
    ) + (sampleType === "home" && selected.length > 0 ? 50000 : 0);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
      if (selected.length > 0) {
        setHistory((prev) => [
          {
            time: new Date(),
            tests: TESTS.filter((t) => selected.includes(t.key)).map(
              (t) => t.name
            ),
            total,
            paid: false,
            sampleType,
          },
          ...prev,
        ]);
        setSelected([]);
        setSampleType("clinic");
        setTimeout(() => {
          if (historyRef.current) {
            historyRef.current.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        }, 200);
      }
      setLoading(false);
    }, 1000);
    // Thực tế: gửi dữ liệu lên server tại đây
  };

  // Hàm xử lý thanh toán cho từng mục lịch sử
  const handlePay = (idx) => {
    // Lấy thông tin đơn hàng từ lịch sử
    const item = history[idx];
    // Chuyển sang trang /payment và truyền thông tin đơn hàng qua state
    navigate("/payment", {
      state: {
        tests: item.tests,
        total: item.total,
        time: item.time,
        paid: item.paid,
        sampleType: item.sampleType, // truyền thêm phương thức lấy mẫu
      },
    });
    // Nếu muốn đánh dấu đã thanh toán sau khi thanh toán thành công, hãy xử lý ở trang /payment và truyền lại trạng thái về đây nếu cần
  };

  // Hàm hủy đăng ký trong lịch sử
  const handleCancel = (idx) => {
    setHistory((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div
      className="container py-5"
      style={{
        maxWidth: 1100,
        // Loại bỏ mọi thuộc tính height/minHeight/overflow không cần thiết ở container ngoài cùng
        // Đảm bảo không có overflow: hidden hoặc height: 100vh ở đây
      }}
    >
      <div className="text-center mb-4">
        <div
          style={{
            fontSize: 44,
            fontWeight: 900,
            color: "#615efc",
            fontFamily:
              "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
            letterSpacing: 1,
            textShadow: "0 2px 8px #e0e7ef",
          }}
        >
          Đăng ký xét nghiệm STIs tại HealthWise
        </div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#222",
            margin: "18px 0 8px",
            fontFamily:
              "Be Vietnam Pro, Montserrat, Segoe UI, Arial, sans-serif",
          }}
        >
          🎯 Mục tiêu của chúng tôi:
        </div>
        <div
          style={{
            fontSize: 18,
            color: "#444",
            fontWeight: 500,
            maxWidth: 700,
            margin: "0 auto 8px",
            fontFamily:
              "Be Vietnam Pro, Montserrat, Segoe UI, Arial, sans-serif",
          }}
        >
          Phát hiện sớm các bệnh lây truyền qua đường tình dục (STIs) để bảo vệ
          sức khỏe bản thân, bạn đời và cộng đồng.
          <br />
          <span style={{ color: "#615efc", fontWeight: 600 }}>
            Tất cả thông tin và kết quả được bảo mật tuyệt đối.
          </span>
        </div>
      </div>
      <div className="mb-5">
        <div className="d-flex flex-wrap gap-3 justify-content-center mb-3">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className="card border-0 shadow rounded-4 px-4 py-3 d-flex flex-column align-items-stretch"
              style={{
                minWidth: 280,
                maxWidth: 340,
                minHeight: 240,
                background: "#f8fafc",
                cursor: "pointer",
                transition: "box-shadow 0.2s",
                borderLeft: "6px solid #615efc",
                flex: 1,
                justifyContent: "space-between",
                display: "flex",
                fontFamily:
                  "Be Vietnam Pro, Montserrat, Segoe UI, Arial, sans-serif",
              }}
              onClick={() => handleSelectPackage(pkg)}
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: 20,
                    color: "#615efc",
                    marginBottom: 6,
                    fontFamily:
                      "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                  }}
                >
                  {pkg.name}
                </div>
                <div
                  style={{
                    fontSize: 15,
                    color: "#222",
                    fontWeight: 600,
                    fontFamily:
                      "Be Vietnam Pro, Montserrat, Segoe UI, Arial, sans-serif",
                  }}
                >
                  Bao gồm: {pkg.tests.join(", ")}
                </div>
                <div
                  style={{
                    fontSize: 17,
                    fontWeight: 800,
                    color: "#16a34a",
                    margin: "8px 0 0",
                    fontFamily:
                      "Be Vietnam Pro, Montserrat, Segoe UI, Arial, sans-serif",
                  }}
                >
                  {pkg.price.toLocaleString()}đ
                  <span
                    style={{
                      fontSize: 14,
                      color: "#888",
                      fontWeight: 500,
                      fontFamily:
                        "Be Vietnam Pro, Montserrat, Segoe UI, Arial, sans-serif",
                    }}
                  >
                    (Tiết kiệm {pkg.save.toLocaleString()}đ)
                  </span>
                </div>
              </div>
              <button
                className="btn btn-outline-primary btn-lg mt-3 rounded-pill w-100 stis-btn-hover"
                style={{
                  fontWeight: 800,
                  fontSize: 17,
                  padding: "10px 0",
                  fontFamily:
                    "Be Vietnam Pro, Montserrat, Segoe UI, Arial, sans-serif",
                  borderColor: "#615efc",
                  color: "#615efc",
                  background: "#fff",
                  transition: "all 0.2s",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectPackage(pkg);
                }}
              >
                Chọn gói này
              </button>
            </div>
          ))}
        </div>
        <div className="text-center text-muted mb-2" style={{ fontSize: 15 }}>
          Gợi ý các gói xét nghiệm tiết kiệm – chọn nhanh chỉ với 1 click!
        </div>
      </div>
      {/* Chọn phương thức lấy mẫu */}
      <div className="d-flex flex-column flex-md-row align-items-center gap-3 mb-3 justify-content-center">
        <div
          className="card border-0 shadow-sm px-4 py-3 d-flex flex-row align-items-center gap-3"
          style={{
            background: sampleType === "clinic" ? "#f5f7ff" : "#fff",
            border:
              sampleType === "clinic"
                ? "2px solid #615efc"
                : "1.5px solid #e0e7ef",
            borderRadius: 16,
            cursor: "pointer",
            minWidth: 220,
            transition: "all 0.2s",
            fontWeight: 700,
            color: sampleType === "clinic" ? "#615efc" : "#222",
            boxShadow:
              sampleType === "clinic"
                ? "0 2px 8px #615efc22"
                : "0 1px 4px #e0e7ef",
          }}
          onClick={() => setSampleType("clinic")}
          tabIndex={0}
          onKeyDown={(e) =>
            (e.key === "Enter" || e.key === " ") && setSampleType("clinic")
          }
          aria-checked={sampleType === "clinic"}
          role="radio"
        >
          <input
            type="radio"
            name="sampleType"
            value="clinic"
            checked={sampleType === "clinic"}
            onChange={() => setSampleType("clinic")}
            style={{
              marginRight: 10,
              accentColor: "#615efc",
              width: 20,
              height: 20,
            }}
            aria-label="Lấy mẫu tại phòng khám HealthWise"
          />
          Lấy mẫu tại phòng khám HealthWise
        </div>
        <div
          className="card border-0 shadow-sm px-4 py-3 d-flex flex-row align-items-center gap-3"
          style={{
            background: sampleType === "home" ? "#f5f7ff" : "#fff",
            border:
              sampleType === "home"
                ? "2px solid #615efc"
                : "1.5px solid #e0e7ef",
            borderRadius: 16,
            cursor: "pointer",
            minWidth: 220,
            transition: "all 0.2s",
            fontWeight: 700,
            color: sampleType === "home" ? "#615efc" : "#222",
            boxShadow:
              sampleType === "home"
                ? "0 2px 8px #615efc22"
                : "0 1px 4px #e0e7ef",
          }}
          onClick={() => setSampleType("home")}
          tabIndex={0}
          onKeyDown={(e) =>
            (e.key === "Enter" || e.key === " ") && setSampleType("home")
          }
          aria-checked={sampleType === "home"}
          role="radio"
        >
          <input
            type="radio"
            name="sampleType"
            value="home"
            checked={sampleType === "home"}
            onChange={() => setSampleType("home")}
            style={{
              marginRight: 10,
              accentColor: "#615efc",
              width: 20,
              height: 20,
            }}
            aria-label="Lấy mẫu tại nhà"
          />
          Lấy mẫu tại nhà{" "}
          <span style={{ color: "#16a34a", fontWeight: 800, marginLeft: 4 }}>
            (+50,000đ)
          </span>
          <span
            className="d-none d-md-inline"
            style={{
              color: "#888",
              fontWeight: 500,
              marginLeft: 6,
              fontSize: 14,
            }}
          >
            (Chỉ áp dụng tại TP.HCM)
          </span>
        </div>
      </div>
      <div
        className="card shadow-lg border-0 rounded-4 p-4 mb-5"
        style={{
          background: "linear-gradient(120deg,#f8fafc 80%,#e0e7ef 100%)",
          fontFamily: "Be Vietnam Pro, Montserrat, Segoe UI, Arial, sans-serif",
        }}
      >
        <h4
          className="mb-3"
          style={{
            fontWeight: 800,
            color: "#615efc",
            fontFamily:
              "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
            fontSize: 24,
            marginTop: 0,
            letterSpacing: 0.5,
          }}
        >
          🧪 Chọn danh mục xét nghiệm phù hợp với bạn
        </h4>
        <div className="table-responsive">
          <table
            className="table table-hover align-middle text-center"
            style={{
              fontFamily:
                "Be Vietnam Pro, Montserrat, Segoe UI, Arial, sans-serif",
              fontSize: 17,
            }}
          >
            <thead className="table-light">
              <tr style={{ fontWeight: 700, fontSize: 18 }}>
                <th></th>
                <th>BỆNH</th>
                <th>MÔ TẢ NGẮN</th>
                <th>AI NÊN XÉT NGHIỆM</th>
                <th>PHƯƠNG PHÁP LẤY MẪU</th>
                <th>THỜI GIAN TRẢ KQ</th>
                <th>GIÁ TIỀN</th>
              </tr>
            </thead>
            <tbody>
              {TESTS.map((test) => (
                <tr
                  key={test.key}
                  style={{
                    background: selected.includes(test.key)
                      ? "rgba(37,99,235,0.10)"
                      : undefined,
                    fontWeight: selected.includes(test.key) ? 700 : 500,
                    color: selected.includes(test.key) ? "#615efc" : undefined,
                    transition: "background 0.2s, color 0.2s",
                    cursor: "pointer",
                  }}
                  onClick={() => handleSelect(test.key)}
                  tabIndex={0}
                  onKeyDown={(e) =>
                    (e.key === "Enter" || e.key === " ") &&
                    handleSelect(test.key)
                  }
                  aria-checked={selected.includes(test.key)}
                >
                  <td onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selected.includes(test.key)}
                      onChange={() => handleSelect(test.key)}
                      style={{
                        width: 20,
                        height: 20,
                        accentColor: "#615efc",
                        cursor: "pointer",
                      }}
                      aria-label={`Chọn ${test.name}`}
                    />
                  </td>
                  <td>{test.name}</td>
                  <td style={{ minWidth: 180 }}>{test.desc}</td>
                  <td style={{ minWidth: 180 }}>{test.who}</td>
                  <td>{test.sample}</td>
                  <td>{test.time}</td>
                  <td style={{ fontWeight: 800, color: "#615efc" }}>
                    {test.price.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3 flex-wrap gap-2">
          <div
            style={{
              fontWeight: 700,
              fontSize: 18,
              color: "#615efc",
              fontFamily:
                "Be Vietnam Pro, Montserrat, Segoe UI, Arial, sans-serif",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span role="img" aria-label="money"></span> Tổng phí:
            <span style={{ fontSize: 22, marginLeft: 4 }}>
              {total.toLocaleString()}đ
            </span>
          </div>
          <button
            className="btn btn-primary btn-lg px-4 rounded-pill shadow stis-btn-hover position-relative"
            disabled={selected.length === 0 || loading}
            style={{
              fontWeight: 800,
              fontSize: 18,
              letterSpacing: 0.5,
              background: "#615efc",
              border: "none",
              boxShadow: "0 2px 8px #615efc33",
              transition: "background 0.2s, box-shadow 0.2s, color 0.2s",
              opacity: selected.length === 0 || loading ? 0.6 : 1,
              pointerEvents: selected.length === 0 || loading ? "none" : "auto",
              fontFamily:
                "Be Vietnam Pro, Montserrat, Segoe UI, Arial, sans-serif",
              color: "#fff",
              minWidth: 180,
            }}
            onClick={handleSubmit}
            aria-disabled={selected.length === 0 || loading}
          >
            {loading ? (
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              ""
            )}{" "}
            Đăng ký xét nghiệm
          </button>
        </div>
        {/* Lịch sử đăng ký */}
        <div className="mt-3" ref={historyRef}>
          <div
            style={{
              fontWeight: 700,
              fontSize: 17,
              color: "#615efc",
              fontFamily:
                "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
              marginBottom: 6,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span role="img" aria-label="history">
              📝
            </span>{" "}
            Lịch sử đăng ký
          </div>
          <div
            style={{
              maxHeight: 220,
              overflowY: history.length > 2 ? "auto" : "visible",
              borderRadius: 12,
              boxShadow: history.length > 0 ? "0 2px 8px #e0e7ef" : "none",
              background: history.length > 0 ? "#f8fafc" : "none",
              padding: history.length > 0 ? 8 : 0,
              transition: "all 0.2s",
            }}
          >
            {history.length === 0 ? (
              <div style={{ color: "#888", fontSize: 15, fontStyle: "italic" }}>
                Chưa có đăng ký nào.
              </div>
            ) : (
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {history.map((item, idx) => (
                  <li
                    key={idx}
                    className="mb-2 p-2 rounded-3 stis-history-item"
                    style={{
                      background: "#fff",
                      borderLeft: "4px solid #615efc",
                      boxShadow: "0 1px 4px #e0e7ef",
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      transition: "background 0.2s, box-shadow 0.2s",
                      cursor: "pointer",
                      fontSize: 15,
                    }}
                    tabIndex={0}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.background = "#f3f4f6")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.background = "#fff")
                    }
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <span
                        style={{
                          fontWeight: 700,
                          color: "#615efc",
                          fontSize: 15,
                        }}
                      >
                        {idx + 1}.
                      </span>
                      <span style={{ fontWeight: 600, color: "#222" }}>
                        {item.tests.join(", ")}
                      </span>
                    </div>
                    <div
                      style={{
                        color: "#615efc",
                        fontWeight: 700,
                        fontSize: 15,
                      }}
                    >
                      <span role="img" aria-label="money">
                        💸
                      </span>{" "}
                      Tổng phí: {item.total.toLocaleString()}đ
                    </div>
                    <div style={{ color: "#888", fontSize: 13 }}>
                      {item.time.toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                      ,{" "}
                      {item.time.toLocaleTimeString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false,
                      })}
                    </div>
                    <div
                      style={{
                        color: item.sampleType === "home" ? "#eab308" : "#888",
                        fontSize: 13,
                        fontWeight: 600,
                        marginTop: 2,
                      }}
                    >
                      {item.sampleType === "home"
                        ? "Lấy mẫu tại nhà (+50,000đ)"
                        : "Lấy mẫu tại phòng khám"}
                    </div>
                    <div style={{ marginTop: 4 }}>
                      {item.paid ? (
                        <span
                          style={{
                            color: "#16a34a",
                            fontWeight: 700,
                            fontSize: 15,
                          }}
                        >
                          Đã thanh toán
                        </span>
                      ) : (
                        <div style={{ display: "flex", gap: 8 }}>
                          <button
                            className="btn btn-success btn-sm rounded-pill px-3"
                            style={{ fontWeight: 700, fontSize: 15 }}
                            onClick={() => handlePay(idx)}
                          >
                            Thanh toán
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm rounded-pill px-3"
                            style={{ fontWeight: 700, fontSize: 15 }}
                            onClick={() => handleCancel(idx)}
                          >
                            Hủy
                          </button>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {showSuccess && (
          <div
            className="alert alert-success mt-4 text-center rounded-pill fw-bold"
            style={{
              fontSize: 18,
              background: "#e0f2fe",
              color: "#615efc",
              border: "none",
            }}
          >
            Đăng ký thành công! Chúng tôi sẽ liên hệ tư vấn sớm nhất.
          </div>
        )}
      </div>
      <div className="row g-4 mb-5">
        <div className="col-md-6">
          <div
            className="p-4 h-100 rounded-4 shadow-sm"
            style={{
              background: "#fff",
              fontFamily:
                "Be Vietnam Pro, Montserrat, Segoe UI, Arial, sans-serif",
            }}
          >
            <h5
              className="mb-3"
              style={{
                fontWeight: 800,
                color: "#615efc",
                fontFamily:
                  "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                fontSize: 20,
                marginTop: 0,
                letterSpacing: 0.2,
              }}
            >
              🧭 Phương thức lấy mẫu
            </h5>
            <ul
              style={{
                fontSize: 16,
                marginBottom: 0,
                fontWeight: 500,
                color: "#222",
                fontFamily:
                  "Be Vietnam Pro, Montserrat, Segoe UI, Arial, sans-serif",
              }}
            >
              <li>Lấy mẫu tại phòng khám HealthWise (giờ hành chính)</li>
              <li>
                Đặt lịch hẹn tại nhà (có phụ phí +50,000đ – chỉ áp dụng tại
                TP.HCM)
              </li>
              <li>
                Có nhân viên tư vấn hướng dẫn chuẩn bị trước khi lấy mẫu (nhịn
                tiểu, vệ sinh, ngưng thuốc...)
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-6">
          <div
            className="p-4 h-100 rounded-4 shadow-sm"
            style={{
              background: "#fff",
              fontFamily:
                "Be Vietnam Pro, Montserrat, Segoe UI, Arial, sans-serif",
            }}
          >
            <h5
              className="mb-3"
              style={{
                fontWeight: 800,
                color: "#615efc",
                fontFamily:
                  "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                fontSize: 20,
                marginTop: 0,
                letterSpacing: 0.2,
              }}
            >
              🛡️ Chính sách bảo mật và hỗ trợ
            </h5>
            <ul
              style={{
                fontSize: 16,
                marginBottom: 0,
                fontWeight: 500,
                color: "#222",
                fontFamily:
                  "Be Vietnam Pro, Montserrat, Segoe UI, Arial, sans-serif",
              }}
            >
              <li>Mọi thông tin cá nhân và kết quả được bảo mật tuyệt đối.</li>
              <li>
                Kết quả được gửi qua: Email cá nhân hoặc in trực tiếp tại cơ sở
              </li>
              <li>
                Tư vấn miễn phí 1-1 với chuyên gia y tế sau khi nhận kết quả
              </li>
              <li>Có hỗ trợ hóa đơn bảo hiểm nếu bạn yêu cầu</li>
            </ul>
          </div>
        </div>
      </div>
      <div
        className="card border-0 shadow-sm rounded-4 p-4 mb-4"
        style={{
          background: "#f8fafc",
          fontFamily: "Be Vietnam Pro, Montserrat, Segoe UI, Arial, sans-serif",
        }}
      >
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#615efc",
              fontFamily:
                "Be Vietnam Pro, Montserrat, Segoe UI, Arial, sans-serif",
            }}
          >
            📞 Bạn cần hỗ trợ? Gọi hotline:{" "}
            <span style={{ color: "#16a34a", fontWeight: 800 }}>
              0123 456 789
            </span>
          </div>
          <div
            style={{
              fontSize: 16,
              color: "#222",
              fontWeight: 500,
              fontFamily:
                "Be Vietnam Pro, Montserrat, Segoe UI, Arial, sans-serif",
            }}
          >
            Chat với bác sĩ tư vấn hoặc gửi yêu cầu tại đây:{" "}
            <a
              href="/booking-consultation"
              className="btn btn-outline-primary btn-lg rounded-pill ms-2"
              style={{
                fontWeight: 700,
                fontFamily:
                  "Be Vietnam Pro, Montserrat, Segoe UI, Arial, sans-serif",
                fontSize: 15,
                padding: "10px 28px",
                borderRadius: 32,
                minHeight: 40,
                minWidth: 60,
                letterSpacing: 0.5,
                boxShadow: "0 2px 8px #615efc22",
                transition: "all 0.2s",
              }}
            >
              📩 Tư vấn & Đặt lịch
            </a>
          </div>
        </div>
      </div>
      <div
        className="text-center text-muted"
        style={{
          fontSize: 16,
          marginTop: 20,
          fontWeight: 500,
          fontFamily: "Be Vietnam Pro, Montserrat, Segoe UI, Arial, sans-serif",
          color: "#615efc",
        }}
      >
        <em>
          ✅ Đăng ký ngay để bảo vệ chính mình và người thân.
          <br />
          👉 Chỉ cần vài phút để đăng ký, nhưng có thể bảo vệ cả tương lai của
          bạn.
          <br />
          🕒 Nhận kết quả nhanh chóng – Tư vấn tận tâm – Chi phí minh bạch.
        </em>
      </div>
      {/* Thêm CSS tối ưu UX/UI cho radio lấy mẫu */}
      <style>{`
        [role="radio"][aria-checked="true"] {
          outline: 2px solid #615efc !important;
          outline-offset: 2px;
        }
        [role="radio"]:hover {
          background: #f0f4ff !important;
          box-shadow: 0 2px 8px #615efc22 !important;
          color: #615efc !important;
        }
        [role="radio"]:active {
          background: #e0e7ef !important;
        }
        .stis-btn-hover:hover, .stis-btn-hover:focus {
          background: #111 !important;
          color: #fff !important;
          border-color: #111 !important;
          box-shadow: 0 2px 8px #1113 !important;
        }
        @media (max-width: 600px) {
          .stis-history-item { font-size: 13px !important; padding: 8px 6px !important; }
        }
      `}</style>
    </div>
  );
}
