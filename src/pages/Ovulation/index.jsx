"use client";
import { Tooltip } from "antd";
import React, { useState, useEffect } from "react";
import {
  Select,
  Button,
  Form,
  Card,
  Typography,
  Breadcrumb,
  Table,
  Popconfirm,
  Input,
} from "antd";
import {
  format,
  addDays,
  subDays,
  addMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
} from "date-fns";
import {
  CalendarOutlined,
  LeftOutlined,
  RightOutlined,
  HeartOutlined,
  WarningOutlined,
  MedicineBoxOutlined,
} from "@ant-design/icons";
import { DatePicker, Row, Col, Collapse, Popover } from "antd";
import "./index.css";

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { Panel } = Collapse;

export default function Ovulation() {
  // Đọc state từ localStorage nếu có
  const getInitialState = (key, defaultValue) => {
    try {
      const stored = localStorage.getItem(key);
      if (stored === null) return defaultValue;
      if (key === "lastPeriodDate" && stored) return new Date(stored);
      if (key === "currentMonth" && stored) return new Date(stored);
      return JSON.parse(stored);
    } catch {
      return defaultValue;
    }
  };

  const [pillType, setPillType] = useState(() =>
    getInitialState("pillType", null)
  );
  const [lastPeriodDate, setLastPeriodDate] = useState(() =>
    getInitialState("lastPeriodDate", undefined)
  );
  const [cycleLength, setCycleLength] = useState(() =>
    getInitialState("cycleLength", "28")
  );
  const [showResults, setShowResults] = useState(() =>
    getInitialState("showResults", false)
  );
  const [currentMonth, setCurrentMonth] = useState(() =>
    getInitialState("currentMonth", undefined)
  );
  const [results, setResults] = useState(() =>
    getInitialState("results", null)
  );
  const [multiCycleResults, setMultiCycleResults] = useState(() =>
    getInitialState("multiCycleResults", [])
  );
  const [currentCycleIndex, setCurrentCycleIndex] = useState(() =>
    getInitialState("currentCycleIndex", 0)
  );
  const [activeKey, setActiveKey] = useState(() =>
    getInitialState("activeKey", [])
  );
  const [pillTaken, setPillTaken] = useState(() =>
    getInitialState("pillTaken", {})
  );
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
  // Lưu state vào localStorage khi thay đổi
  useEffect(() => {
    localStorage.setItem("pillType", JSON.stringify(pillType));
  }, [pillType]);
  useEffect(() => {
    localStorage.setItem(
      "lastPeriodDate",
      lastPeriodDate ? lastPeriodDate.toString() : ""
    );
  }, [lastPeriodDate]);
  useEffect(() => {
    localStorage.setItem("cycleLength", JSON.stringify(cycleLength));
  }, [cycleLength]);
  useEffect(() => {
    localStorage.setItem("showResults", JSON.stringify(showResults));
  }, [showResults]);
  useEffect(() => {
    localStorage.setItem(
      "currentMonth",
      currentMonth ? currentMonth.toString() : ""
    );
  }, [currentMonth]);
  useEffect(() => {
    localStorage.setItem("results", JSON.stringify(results));
  }, [results]);
  useEffect(() => {
    localStorage.setItem(
      "multiCycleResults",
      JSON.stringify(multiCycleResults)
    );
  }, [multiCycleResults]);
  useEffect(() => {
    localStorage.setItem(
      "currentCycleIndex",
      JSON.stringify(currentCycleIndex)
    );
  }, [currentCycleIndex]);
  useEffect(() => {
    localStorage.setItem("activeKey", JSON.stringify(activeKey));
  }, [activeKey]);
  useEffect(() => {
    localStorage.setItem("pillTaken", JSON.stringify(pillTaken));
  }, [pillTaken]);

  // Khi thay đổi lastPeriodDate hoặc cycleLength, lưu vào localStorage để các trang khác dùng chung
  useEffect(() => {
    if (lastPeriodDate) {
      localStorage.setItem("shared_lastPeriodDate", lastPeriodDate.toString());
    }
  }, [lastPeriodDate]);
  useEffect(() => {
    if (cycleLength) {
      localStorage.setItem("shared_cycleLength", cycleLength);
    }
  }, [cycleLength]);

  const handleCalculate = () => {
    if (lastPeriodDate) {
      const cycleLengthNum = Number.parseInt(cycleLength);
      const cycles = [];

      for (let i = 0; i < 6; i++) {
        const menstruationDate = addDays(lastPeriodDate, i * cycleLengthNum);
        const ovulationDate = addDays(menstruationDate, cycleLengthNum - 14);
        const fertileStart = subDays(ovulationDate, 5);
        const fertileEnd = addDays(ovulationDate, 1);
        const dueDate = addDays(menstruationDate, 280);

        cycles.push({
          key: i + 1,
          cycle: `Chu kỳ ${i + 1}`,
          menstruationDate,
          ovulationDate,
          fertileStart,
          fertileEnd,
          dueDate,
        });
      }

      setMultiCycleResults(cycles);
      setResults(cycles[0]);
      setCurrentCycleIndex(0);
      setCurrentMonth(cycles[0].fertileStart);
      setShowResults(true);
    }
  };

  const nextMonth = () => {
    if (currentMonth) {
      setCurrentMonth(addMonths(currentMonth, 1));
    }
  };

  const prevMonth = () => {
    if (currentMonth) {
      setCurrentMonth(addMonths(currentMonth, -1));
    }
  };

  const resetCalculator = () => {
    setShowResults(false);
    setResults(null);
    setMultiCycleResults([]);
    setCurrentCycleIndex(0);
    setPillTaken({});
    localStorage.removeItem("pillTaken");
  };

  const togglePanel = (key) => {
    if (Array.isArray(activeKey) && activeKey.includes(key)) {
      setActiveKey(activeKey.filter((k) => k !== key));
    } else {
      setActiveKey([...(Array.isArray(activeKey) ? activeKey : []), key]);
    }
  };

  const goToNextCycle = () => {
    if (currentCycleIndex + 1 < multiCycleResults.length) {
      const nextIndex = currentCycleIndex + 1;
      setCurrentCycleIndex(nextIndex);
      setResults(multiCycleResults[nextIndex]);
      setCurrentMonth(multiCycleResults[nextIndex].fertileStart);
    }
  };

  const goToPreviousCycle = () => {
    if (currentCycleIndex > 0) {
      const prevIndex = currentCycleIndex - 1;
      setCurrentCycleIndex(prevIndex);
      setResults(multiCycleResults[prevIndex]);
      setCurrentMonth(multiCycleResults[prevIndex].fertileStart);
    }
  };

  const renderCalendar = () => {
    if (!results || !currentMonth) return null;

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    const isFertileDay = (date) =>
      date >= results.fertileStart && date <= results.fertileEnd;
    const isOvulationDay = (date) => isSameDay(date, results.ovulationDate);
    const isMenstruationDay = (date) =>
      multiCycleResults.some((cycle) =>
        isSameDay(date, cycle.menstruationDate)
      );
    const isDueDate = (date) => isSameDay(date, results.dueDate);

    return (
      <>
        <Card className="mt-4" style={{ marginTop: 32 }}>
          <div className="d-flex align-items-center justify-content-between p-2 bg-light">
            <Button icon={<LeftOutlined />} onClick={prevMonth} size="small" />
            <Title level={5} className="m-0">
              {format(currentMonth, "MMMM yyyy")}
            </Title>
            <Button icon={<RightOutlined />} onClick={nextMonth} size="small" />
          </div>

          <div className="container-fluid p-0">
            <Row className="text-center">
              {["C", "H", "T", "B", "N", "S", "C"].map((day, i) => (
                <Col span={3} key={i} className="py-2">
                  <Text type="secondary" strong>
                    {day}
                  </Text>
                </Col>
              ))}
            </Row>

            <Row className="text-center">
              {Array.from({ length: new Date(monthStart).getDay() }).map(
                (_, i) => (
                  <Col span={3} key={`empty-${i}`} className="p-2" />
                )
              )}

              {days.map((day, i) => {
                let icon = null;
                let title = null;

                if (isMenstruationDay(day)) {
                  icon = <HeartOutlined style={{ color: "#e74c3c" }} />;
                  title = "Ngày hành kinh";
                } else if (isDueDate(day)) {
                  icon = <WarningOutlined style={{ color: "#f39c12" }} />;
                  title = "Ngày dự sinh";
                } else if (isOvulationDay(day)) {
                  icon = <CalendarOutlined style={{ color: "#17a2b8" }} />;
                  title = "Ngày rụng trứng";
                }

                const bgClass = isFertileDay(day)
                  ? "bg-info bg-opacity-25"
                  : "";

                return (
                  <Col
                    span={3}
                    key={i}
                    className="p-2 text-center position-relative"
                  >
                    <div
                      className={`d-flex h-8 w-8 rounded-circle ${bgClass} mx-auto align-items-center justify-content-center`}
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                      }}
                    >
                      {title ? (
                        <Popover content={title}>{icon}</Popover>
                      ) : (
                        format(day, "d")
                      )}
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>

          <div className="text-start p-3">
            <Title level={5}>Chú giải</Title>
            <div className="d-flex flex-wrap gap-3">
              <div className="d-flex align-items-center gap-2">
                <HeartOutlined style={{ color: "#e74c3c" }} />
                <Text>Ngày hành kinh</Text>
              </div>
              <div className="d-flex align-items-center gap-2">
                <WarningOutlined style={{ color: "#f39c12" }} />
                <Text>Ngày dự sinh</Text>
              </div>
              <div className="d-flex align-items-center gap-2">
                <CalendarOutlined style={{ color: "#17a2b8" }} />
                <Text>Ngày rụng trứng</Text>
              </div>
              <div className="d-flex align-items-center gap-2">
                <div
                  style={{
                    width: 16,
                    height: 16,
                    backgroundColor: "#b8e1f5",
                    borderRadius: 4,
                  }}
                ></div>
                <Text>Cửa sổ thụ thai</Text>
              </div>
            </div>
          </div>

          <div className="text-center p-3">
            <Popconfirm
              title="Bạn có chắc chắn muốn đặt lại không?"
              onConfirm={resetCalculator}
              okText="Có"
              cancelText="Không"
            >
              <Button type="default" className="me-2">
                Bắt đầu lại
              </Button>
            </Popconfirm>
            <Button
              onClick={goToPreviousCycle}
              disabled={currentCycleIndex === 0}
              className="me-2"
            >
              Chu kỳ trước
            </Button>
            <Button
              type="primary"
              onClick={goToNextCycle}
              disabled={currentCycleIndex + 1 >= multiCycleResults.length}
            >
              Chu kỳ tiếp theo <RightOutlined />
            </Button>
          </div>
        </Card>

        <Card className="mt-4">
          <Title level={4}>Gửi lịch nhắc về email</Title>
          <Form
            layout="vertical"
            onFinish={async (values) => {
              if (!multiCycleResults || multiCycleResults.length === 0) return;
              // Tổng hợp lịch nhắc cho 6 chu kỳ
              let content = `Lịch nhắc cá nhân hóa từ HealthWise:\n`;
              multiCycleResults.forEach((cycle, idx) => {
                content += `\n--- Chu kỳ ${idx + 1} ---\n`;
                content += `- Ngày hành kinh: ${format(
                  cycle.menstruationDate,
                  "dd-MM-yyyy"
                )}\n`;
                content += `- Tuần rụng trứng: ${format(
                  cycle.fertileStart,
                  "dd-MM-yyyy"
                )} đến ${format(cycle.fertileEnd, "dd-MM-yyyy")}\n`;
                content += `- Ngày rụng trứng: ${format(
                  cycle.ovulationDate,
                  "dd-MM-yyyy"
                )}\n`;
                content += `- Ngày dự sinh (nếu có thai): ${format(
                  cycle.dueDate,
                  "dd-MM-yyyy"
                )}\n`;
                // Nếu có thuốc tránh thai, liệt kê từng ngày uống thuốc
                if (pillType && pillType !== "none") {
                  let totalDays =
                    pillType === "21" ? 21 : pillType === "28" ? 28 : 30;
                  let pillDates = Array.from({ length: totalDays }, (_, i) =>
                    format(addDays(cycle.menstruationDate, i), "dd-MM-yyyy")
                  );
                  content += `- Lịch uống thuốc tránh thai: ${pillDates.join(
                    ", "
                  )}\n`;
                }
              });
              // Gửi API (giả lập)
              try {
                // Thay bằng API thực tế nếu có
                await fetch("/api/send-reminder", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    email: values.email,
                    content,
                  }),
                });
                window.alert("Đã gửi lịch nhắc về email thành công!");
              } catch {
                window.alert("Gửi email thất bại. Vui lòng thử lại!");
              }
            }}
          >
            <Form.Item
              label="Nhập email để nhận lịch nhắc cá nhân hóa"
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input
                placeholder="Nhập email của bạn"
                style={{ maxWidth: 320 }}
              />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Gửi lịch nhắc
            </Button>
          </Form>
        </Card>
      </>
    );
  };

  return (
    <>
      <div>
        <div className="ovulation-bg">
          <div className="ovulation-container" style={{ paddingTop: 64 }}>
            <div
              className="container py-4"
              style={{
                maxWidth: "800px",
              }}
            >
              <Breadcrumb className="mb-3">
                <Breadcrumb.Item>
                  <a href="#" className="text-success">
                    Theo dõi khả năng sinh sản
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a href="#" className="text-success">
                    Rụng trứng
                  </a>
                </Breadcrumb.Item>
              </Breadcrumb>
              <Title level={1}>Hướng dẫn chu kỳ & rụng trứng</Title>
              <Paragraph className="mb-4">
                Theo dõi chu kỳ kinh nguyệt của bạn với công cụ này để xác định
                ngày rụng trứng và tăng cơ hội thụ thai. Bằng cách dự đoán cửa
                sổ thụ thai và ngày rụng trứng, công cụ hỗ trợ bạn trên hành
                trình làm mẹ!
              </Paragraph>
              {!showResults ? (
                <Card
                  className="bg-light bg-opacity-25 shadow-lg"
                  style={{ maxWidth: "800px", margin: "auto" }}
                >
                  <Form layout="vertical" onFinish={handleCalculate}>
                    <Form.Item
                      label="Ngày đầu tiên của kỳ kinh gần nhất"
                      className="mb-4"
                      name="lastPeriodDate"
                      rules={[
                        {
                          required: true,
                          message:
                            "Vui lòng chọn ngày đầu tiên của kỳ kinh gần nhất!",
                        },
                      ]}
                    >
                      <DatePicker
                        style={{ width: "100%", minHeight: "40px" }}
                        onChange={(date) => setLastPeriodDate(date?.toDate())}
                        format="DD-MM-YYYY"
                        placeholder="Chọn ngày"
                        dropdownAlign={{ offset: [0, 4] }}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Chu kỳ kinh nguyệt của bạn kéo dài bao lâu"
                      className="mb-4"
                      name="cycleLength"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn độ dài chu kỳ!",
                        },
                        {
                          validator: (_, value) =>
                            value !== "none"
                              ? Promise.resolve()
                              : Promise.reject("Vui lòng chọn độ dài chu kỳ!"),
                        },
                      ]}
                    >
                      <Select
                        value={cycleLength}
                        onChange={setCycleLength}
                        style={{ width: "100%", minHeight: "40px" }}
                        placeholder="Chọn độ dài chu kỳ"
                      >
                        <Option value="none" disabled>
                          Không chọn
                        </Option>
                        {Array.from({ length: 15 }, (_, i) => i + 21).map(
                          (days) => (
                            <Option key={days} value={days.toString()}>
                              {days} ngày
                            </Option>
                          )
                        )}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      label="Loại thuốc tránh thai (không bắt buộc)"
                      className="mb-4"
                      name="pillType"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn loại thuốc tránh thai!",
                        },
                      ]}
                    >
                      <Select
                        value={pillType}
                        onChange={(val) => setPillType(val)}
                        placeholder="Chọn loại thuốc"
                        style={{ width: "100%", minHeight: "40px" }}
                      >
                        <Option value="none">Không chọn</Option>
                        <Option value="21">Vỉ 21 viên (nghỉ 7 ngày)</Option>
                        <Option value="28">Vỉ 28 viên (7 viên giả dược)</Option>
                        <Option value="continuous">
                          Dùng liên tục (không nghỉ)
                        </Option>
                      </Select>
                    </Form.Item>

                    <Button
                      type="primary"
                      style={{
                        backgroundColor: "#615efc",
                        width: "30%",
                        padding: "10px 0",
                        transition: "all 0.3s ease",
                      }}
                      htmlType="submit"
                      size="large"
                      className="focus-button"
                    >
                      Xác nhận
                    </Button>
                  </Form>
                </Card>
              ) : (
                <div>
                  {renderCalendar()}
                  <div className="mt-4 pt-4 border-top">
                    <Paragraph>
                      Hầu hết các cặp đôi sẽ có thai trong vòng ba tháng. Nếu
                      bạn cố gắng trong một năm mà không thành công (hoặc sáu
                      tháng nếu bạn trên 35 tuổi), hãy tìm kiếm sự giúp đỡ từ
                      một{" "}
                      <a
                        href="#"
                        className="fw-medium text-decoration-underline"
                      >
                        chuyên gia về sinh sản
                      </a>
                      .
                    </Paragraph>
                  </div>
                </div>
              )}

              <div className="mt-5 container">
                <div className="row">
                  <div className="col-12 my-5">
                    <section>
                      <Title level={2} className="mb-4">
                        Cách uống thuốc tránh thai đúng cách
                      </Title>
                      <ul className="list-unstyled">
                        <li className="d-flex gap-2 mb-3">
                          <div
                            className="rounded-circle bg-info"
                            style={{
                              width: "8px",
                              height: "8px",
                              marginTop: "10px",
                            }}
                          />
                          <Paragraph className="m-0">
                            <Tooltip title="Uống 1 viên mỗi ngày trong 21 ngày, sau đó nghỉ 7 ngày trước khi bắt đầu vỉ mới.">
                              <strong>Vỉ 21 viên:</strong>
                            </Tooltip>{" "}
                            Uống 1 viên mỗi ngày vào cùng một thời điểm trong 21
                            ngày. Sau đó nghỉ 7 ngày (không uống), rồi bắt đầu
                            vỉ mới sau khi nghỉ.
                          </Paragraph>
                        </li>
                        <li className="d-flex gap-2 mb-3">
                          <div
                            className="rounded-circle bg-info"
                            style={{
                              width: "8px",
                              height: "8px",
                              marginTop: "10px",
                            }}
                          />
                          <Paragraph className="m-0">
                            <Tooltip title="Bao gồm 21 viên có hormone và 7 viên nhắc nhở không chứa hormone. Tiếp tục uống mỗi ngày.">
                              <strong>Vỉ 28 viên:</strong>
                            </Tooltip>{" "}
                            Uống 1 viên mỗi ngày liên tục, không nghỉ. 21 viên
                            đầu chứa hormone, 7 viên cuối là giả dược để duy trì
                            thói quen.
                          </Paragraph>
                        </li>
                        <li className="d-flex gap-2 mb-3">
                          <div
                            className="rounded-circle bg-info"
                            style={{
                              width: "8px",
                              height: "8px",
                              marginTop: "10px",
                            }}
                          />
                          <Paragraph className="m-0">
                            <Tooltip title="Bạn uống viên hormone mỗi ngày, không nghỉ. Có thể giúp tránh kinh nguyệt hàng tháng. Luôn hỏi ý kiến bác sĩ.">
                              <strong>Dùng liên tục:</strong>
                            </Tooltip>{" "}
                            Uống 1 viên hormone mỗi ngày, không nghỉ hoặc không
                            có viên giả dược. Có thể giúp bạn không có kinh
                            nguyệt. Hãy hỏi ý kiến bác sĩ trước khi dùng cách
                            này.
                          </Paragraph>
                        </li>
                      </ul>
                    </section>
                  </div>
                </div>
              </div>
              <div className="mt-5 container">
                <div className="row">
                  <div className="col-12 my-5">
                    <section>
                      <Title level={2} className="mb-4">
                        Cách tăng khả năng thụ thai
                      </Title>
                      <ul className="list-unstyled">
                        <li className="d-flex gap-2 mb-3">
                          <div
                            className="rounded-circle bg-info"
                            style={{
                              width: "8px",
                              height: "8px",
                              marginTop: "10px",
                            }}
                          />
                          <Paragraph className="m-0">
                            Sử dụng que thử rụng trứng, theo dõi dấu hiệu cơ thể
                            để xác định ngày dễ thụ thai nhất.
                          </Paragraph>
                        </li>
                        <li className="d-flex gap-2 mb-3">
                          <div
                            className="rounded-circle bg-info"
                            style={{
                              width: "8px",
                              height: "8px",
                              marginTop: "10px",
                            }}
                          />
                          <Paragraph className="m-0">
                            Quan hệ cách ngày trong cửa sổ thụ thai để tăng cơ
                            hội thụ thai.
                          </Paragraph>
                        </li>
                        <li className="d-flex gap-2 mb-3">
                          <div
                            className="rounded-circle bg-info"
                            style={{
                              width: "8px",
                              height: "8px",
                              marginTop: "10px",
                            }}
                          />
                          <Paragraph className="m-0">
                            Bắt đầu bổ sung vitamin tổng hợp có axit folic ít
                            nhất 1 tháng trước khi có ý định mang thai (tốt nhất
                            là 6 tháng).
                          </Paragraph>
                        </li>
                        <li className="d-flex gap-2 mb-3">
                          <div
                            className="rounded-circle bg-info"
                            style={{
                              width: "8px",
                              height: "8px",
                              marginTop: "10px",
                            }}
                          />
                          <Paragraph className="m-0">
                            Tham khảo ý kiến bác sĩ để kiểm soát các bệnh lý
                            nền. Khám sức khỏe và tiêm phòng đầy đủ giúp giảm
                            biến chứng thai kỳ.
                          </Paragraph>
                        </li>
                        <li className="d-flex gap-2 mb-3">
                          <div
                            className="rounded-circle bg-info"
                            style={{
                              width: "8px",
                              height: "8px",
                              marginTop: "10px",
                            }}
                          />
                          <Paragraph className="m-0">
                            Duy trì lối sống lành mạnh: bỏ thuốc lá, tập thể dục
                            đều đặn, ăn uống đủ chất.
                          </Paragraph>
                        </li>
                      </ul>
                    </section>
                  </div>

                  <div className="col-12 my-5">
                    <section>
                      <Title level={2} className="mb-4">
                        Cách các mẹ tính ngày rụng trứng
                      </Title>
                      <Paragraph className="mb-3">
                        Ngoài việc dùng công cụ tính rụng trứng, các mẹ trong
                        cộng đồng BabyCenter còn nhận biết rụng trứng qua các
                        dấu hiệu sau:
                      </Paragraph>
                      <div className="d-flex flex-column gap-3">
                        <blockquote
                          className="blockquote border-start border-info ps-3"
                          style={{ borderLeftWidth: "4px" }}
                        >
                          <p className="fst-italic mb-0">
                            "Tôi thường bị đau hoặc căng nhẹ ở bên trái khi rụng
                            trứng" – mommy1johnson
                          </p>
                        </blockquote>
                        <blockquote
                          className="blockquote border-start border-info ps-3"
                          style={{ borderLeftWidth: "4px" }}
                        >
                          <p className="fst-italic mb-0">
                            "Dịch nhầy cổ tử cung giống lòng trắng trứng; đôi
                            khi đau nhẹ một bên buồng trứng; tăng ham muốn; ăn
                            ngon miệng hơn." – krt1987
                          </p>
                        </blockquote>
                        <blockquote
                          className="blockquote border-start border-info ps-3"
                          style={{ borderLeftWidth: "4px" }}
                        >
                          <p className="fst-italic mb-0">
                            "Tôi bị đầy hơi và vùng bụng dưới rất khó chịu." –
                            Kmarvin91
                          </p>
                        </blockquote>
                        <blockquote
                          className="blockquote border-start border-info ps-3"
                          style={{ borderLeftWidth: "4px" }}
                        >
                          <p className="fst-italic mb-0">
                            "Nhiệt độ cơ thể tăng dần trong 3 ngày, tổng cộng
                            tăng khoảng 0.8-0.9 độ so với trước rụng trứng." –
                            Rikkubug
                          </p>
                        </blockquote>
                        <blockquote
                          className="blockquote border-start border-info ps-3"
                          style={{ borderLeftWidth: "4px" }}
                        >
                          <p className="fst-italic mb-0">
                            "Tôi thức dậy giữa đêm, thấy nhiệt độ cơ thể tăng và
                            đau lưng dưới bên trái." – Newwifelife
                          </p>
                        </blockquote>
                        <blockquote
                          className="blockquote border-start border-info ps-3"
                          style={{ borderLeftWidth: "4px" }}
                        >
                          <p className="fst-italic mb-0">
                            "Tôi hơi đầy hơi, ăn ngon miệng, đau nhẹ như trước
                            kỳ kinh và tâm trạng rất tốt!" – NadiaFlower
                          </p>
                        </blockquote>
                      </div>
                    </section>
                  </div>

                  <div className="col-12 my-5">
                    <section>
                      <Title level={2} className="mb-4">
                        Dấu hiệu rụng trứng
                      </Title>
                      <ul className="list-unstyled">
                        <li className="d-flex gap-2 mb-3">
                          <div
                            className="rounded-circle bg-info"
                            style={{
                              width: "8px",
                              height: "8px",
                              marginTop: "10px",
                            }}
                          />
                          <Paragraph className="m-0">
                            Nhiệt độ cơ thể cơ bản tăng
                          </Paragraph>
                        </li>
                        <li className="d-flex gap-2 mb-3">
                          <div
                            className="rounded-circle bg-info"
                            style={{
                              width: "8px",
                              height: "8px",
                              marginTop: "10px",
                            }}
                          />
                          <Paragraph className="m-0">
                            Dịch nhầy cổ tử cung giống lòng trắng trứng
                          </Paragraph>
                        </li>
                        <li className="d-flex gap-2 mb-3">
                          <div
                            className="rounded-circle bg-info"
                            style={{
                              width: "8px",
                              height: "8px",
                              marginTop: "10px",
                            }}
                          />
                          <Paragraph className="m-0">Ngực căng tức</Paragraph>
                        </li>
                        <li className="d-flex gap-2 mb-3">
                          <div
                            className="rounded-circle bg-info"
                            style={{
                              width: "8px",
                              height: "8px",
                              marginTop: "10px",
                            }}
                          />
                          <Paragraph className="m-0">
                            Đau nhẹ hoặc lâm râm vùng bụng
                          </Paragraph>
                        </li>
                        <li className="d-flex gap-2 mb-3">
                          <div
                            className="rounded-circle bg-info"
                            style={{
                              width: "8px",
                              height: "8px",
                              marginTop: "10px",
                            }}
                          />
                          <Paragraph className="m-0">Ra máu rất nhẹ</Paragraph>
                        </li>
                        <li className="d-flex gap-2 mb-3">
                          <div
                            className="rounded-circle bg-info"
                            style={{
                              width: "8px",
                              height: "8px",
                              marginTop: "10px",
                            }}
                          />
                          <Paragraph className="m-0">
                            Khứu giác nhạy hơn
                          </Paragraph>
                        </li>
                        <li className="d-flex gap-2 mb-3">
                          <div
                            className="rounded-circle bg-info"
                            style={{
                              width: "8px",
                              height: "8px",
                              marginTop: "10px",
                            }}
                          />
                          <Paragraph className="m-0">Tăng ham muốn</Paragraph>
                        </li>
                        <li className="d-flex gap-2 mb-3">
                          <div
                            className="rounded-circle bg-info"
                            style={{
                              width: "8px",
                              height: "8px",
                              marginTop: "10px",
                            }}
                          />
                          <Paragraph className="m-0">
                            Thay đổi khẩu vị hoặc tâm trạng
                          </Paragraph>
                        </li>
                        <li className="d-flex gap-2 mb-3">
                          <div
                            className="rounded-circle bg-info"
                            style={{
                              width: "8px",
                              height: "8px",
                              marginTop: "10px",
                            }}
                          />
                          <Paragraph className="m-0">Đầy hơi</Paragraph>
                        </li>
                      </ul>
                    </section>
                  </div>

                  <div className="col-12 my-5">
                    <section>
                      <Title level={2} className="mb-4">
                        Câu hỏi thường gặp
                      </Title>
                      <div className="d-flex flex-column gap-3">
                        {/* Using custom buttons instead of Collapse for more control over styling */}
                        <div className="border rounded">
                          <Button
                            type="text"
                            block
                            className="text-start d-flex justify-content-between align-items-center py-3 px-4"
                            onClick={() => togglePanel("1")}
                          >
                            <span className="fw-medium">Rụng trứng là gì?</span>
                            <RightOutlined
                              className={`transition ${
                                activeKey.includes("1") ? "rotate-90" : ""
                              }`}
                            />
                          </Button>
                          {activeKey.includes("1") && (
                            <div className="p-3">
                              <Paragraph>
                                Rụng trứng là quá trình buồng trứng phóng thích
                                một trứng. Trứng này sẽ di chuyển vào ống dẫn
                                trứng và có thể được thụ tinh bởi tinh trùng.
                              </Paragraph>
                            </div>
                          )}
                        </div>

                        <div className="border rounded">
                          <Button
                            type="text"
                            block
                            className="text-start d-flex justify-content-between align-items-center py-3 px-4"
                            onClick={() => togglePanel("2")}
                          >
                            <span className="fw-medium">
                              Khi nào rụng trứng?
                            </span>
                            <RightOutlined
                              className={`transition ${
                                activeKey.includes("2") ? "rotate-90" : ""
                              }`}
                            />
                          </Button>
                          {activeKey.includes("2") && (
                            <div className="p-3">
                              <Paragraph>
                                Phụ nữ thường rụng trứng khoảng 14 ngày trước kỳ
                                kinh tiếp theo. Với chu kỳ 28 ngày, rụng trứng
                                thường vào ngày thứ 14.
                              </Paragraph>
                            </div>
                          )}
                        </div>

                        <div className="border rounded">
                          <Button
                            type="text"
                            block
                            className="text-start d-flex justify-content-between align-items-center py-3 px-4"
                            onClick={() => togglePanel("3")}
                          >
                            <span className="fw-medium">
                              Làm sao biết mình đang rụng trứng?
                            </span>
                            <RightOutlined
                              className={`transition ${
                                activeKey.includes("3") ? "rotate-90" : ""
                              }`}
                            />
                          </Button>
                          {activeKey.includes("3") && (
                            <div className="p-3">
                              <Paragraph>
                                Bạn có thể theo dõi nhiệt độ cơ thể cơ bản, quan
                                sát dịch nhầy cổ tử cung, dùng que thử rụng
                                trứng hoặc nhận biết các dấu hiệu như đau nhẹ
                                bụng, tăng ham muốn.
                              </Paragraph>
                            </div>
                          )}
                        </div>

                        <div className="border rounded">
                          <Button
                            type="text"
                            block
                            className="text-start d-flex justify-content-between align-items-center py-3 px-4"
                            onClick={() => togglePanel("4")}
                          >
                            <span className="fw-medium">
                              Cảm giác khi rụng trứng như thế nào?
                            </span>
                            <RightOutlined
                              className={`transition ${
                                activeKey.includes("4") ? "rotate-90" : ""
                              }`}
                            />
                          </Button>
                          {activeKey.includes("4") && (
                            <div className="p-3">
                              <Paragraph>
                                Một số phụ nữ cảm thấy đau nhẹ bụng, đầy hơi,
                                căng ngực hoặc tăng ham muốn. Một số khác không
                                cảm nhận được gì đặc biệt.
                              </Paragraph>
                            </div>
                          )}
                        </div>

                        <div className="border rounded">
                          <Button
                            type="text"
                            block
                            className="text-start d-flex justify-content-between align-items-center py-3 px-4"
                            onClick={() => togglePanel("5")}
                          >
                            <span className="fw-medium">
                              Rụng trứng kéo dài bao lâu?
                            </span>
                            <RightOutlined
                              className={`transition ${
                                activeKey.includes("5") ? "rotate-90" : ""
                              }`}
                            />
                          </Button>
                          {activeKey.includes("5") && (
                            <div className="p-3">
                              <Paragraph>
                                Trứng chỉ sống được khoảng 24 giờ sau khi rụng.
                                Tuy nhiên, tinh trùng có thể sống trong cơ thể
                                nữ giới tới 5 ngày, nên cửa sổ thụ thai kéo dài
                                khoảng 6 ngày.
                              </Paragraph>
                            </div>
                          )}
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
