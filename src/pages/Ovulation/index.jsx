"use client";

import React, { useState } from "react";
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
} from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Select,
  Form,
  Row,
  Col,
  Collapse,
  Card,
  Typography,
  Breadcrumb,
  Popover,
} from "antd";

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { Panel } = Collapse;

export default function Ovulation() {
  const [lastPeriodDate, setLastPeriodDate] = useState(undefined);
  const [cycleLength, setCycleLength] = useState("28");
  const [showResults, setShowResults] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(undefined);
  const [results, setResults] = useState(null);
  const [activeKey, setActiveKey] = useState([]);

  const handleCalculate = () => {
    if (lastPeriodDate) {
      const cycleLengthNum = Number.parseInt(cycleLength);
      const ovulationDate = addDays(lastPeriodDate, cycleLengthNum - 14);
      const fertileStart = subDays(ovulationDate, 5);
      const fertileEnd = addDays(ovulationDate, 1);
      const nextPeriod = addDays(lastPeriodDate, cycleLengthNum);
      const dueDate = addDays(lastPeriodDate, 280);

      setResults({
        ovulationDate,
        fertileStart,
        fertileEnd,
        nextPeriod,
        dueDate,
      });

      setCurrentMonth(fertileStart);
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
  };

  const togglePanel = (key) => {
    if (Array.isArray(activeKey) && activeKey.includes(key)) {
      setActiveKey(activeKey.filter((k) => k !== key));
    } else {
      setActiveKey([...(Array.isArray(activeKey) ? activeKey : []), key]);
    }
  };

  const renderCalendar = () => {
    if (!results || !currentMonth) return null;

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    const isFertileDay = (date) => {
      return date >= results.fertileStart && date <= results.fertileEnd;
    };

    const isNextPeriod = (date) => {
      return isSameDay(date, results.nextPeriod);
    };

    const isOvulationDay = (date) => {
      return isSameDay(date, results.ovulationDate);
    };

    return (
      <Card className="mt-4">
        <div className="d-flex align-items-center justify-content-between p-2 bg-light">
          <Button icon={<LeftOutlined />} onClick={prevMonth} size="small" />
          <Title level={5} className="m-0">
            {format(currentMonth, "MMMM yyyy")}
          </Title>
          <Button icon={<RightOutlined />} onClick={nextMonth} size="small" />
        </div>

        <div className="container-fluid p-0">
          <Row className="text-center">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
              <Col span={3} key={i} className="py-2">
                <Text type="secondary" strong>
                  {day}
                </Text>
              </Col>
            ))}
          </Row>

          <Row className="text-center">
            {Array.from({
              length: new Date(monthStart).getDay(),
            }).map((_, i) => (
              <Col span={3} key={`empty-${i}`} className="p-2" />
            ))}

            {days.map((day, i) => {
              let bgClass = "";
              if (isOvulationDay(day)) bgClass = "bg-info";
              else if (isFertileDay(day)) bgClass = "bg-info bg-opacity-25";
              else if (isNextPeriod(day)) bgClass = "bg-warning bg-opacity-50";

              return (
                <Col
                  span={3}
                  key={i}
                  className="p-2 text-center position-relative"
                >
                  <div
                    className={`d-flex h-8 w-8  rounded-circle ${bgClass} mx-auto align-items-center justify-content-center`}
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                    }}
                  >
                    {format(day, "d")}
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>

        <div className="text-center p-3">
          <Button type="default" onClick={resetCalculator}>
            Start over
          </Button>
        </div>
      </Card>
    );
  };

  return (
    <div
      className="container py-4"
      style={{
        maxWidth: "800px",
      }}
    >
      <Breadcrumb className="mb-3">
        <Breadcrumb.Item>
          <a href="#" className="text-success">
            Getting Pregnant
          </a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="#" className="text-success">
            Ovulation
          </a>
        </Breadcrumb.Item>
      </Breadcrumb>

      <Title level={1}>Ovulation Calculator</Title>

      <Paragraph className="mb-4">
        Use our ovulation calculator to predict when you might ovulate and boost
        your chances of getting pregnant. This tool helps you pinpoint your
        likely ovulation date and your most fertile window to set you up for
        baby-making success!
      </Paragraph>

      {!showResults ? (
        <Card className="bg-light bg-opacity-25" style={{ maxWidth: "800px" }}>
          <Form layout="vertical">
            <Form.Item label="First day of your last period" className="mb-4">
              <DatePicker
                style={{ width: "100%", height: "40px" }}
                onChange={(date) => setLastPeriodDate(date?.toDate())}
                format="MM-DD-YYYY"
                placeholder="Select a date"
              />
            </Form.Item>

            <Form.Item label="How long was your last cycle" className="mb-4">
              <Select
                value={cycleLength}
                onChange={setCycleLength}
                style={{ width: "100%", height: "40px" }}
              >
                {Array.from({ length: 15 }, (_, i) => i + 21).map((days) => (
                  <Option key={days} value={days.toString()}>
                    {days} days
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Button
              type="primary"
              style={{ backgroundColor: "#20B2AA" }}
              onClick={handleCalculate}
              size="large"
            >
              See my fertile days
            </Button>
          </Form>
        </Card>
      ) : (
        <div>
          {results && (
            <Card
              style={{ maxWidth: "800px" }}
              className="bg-light bg-opacity-25"
            >
              <div
                className="p-2 mb-4 text-center text-white rounded"
                style={{ backgroundColor: "#20B2AA" }}
              >
                Cycle 1/6
              </div>

              <div className="d-flex flex-column gap-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="p-2 rounded-circle bg-warning bg-opacity-25">
                    <div
                      className="rounded-circle bg-warning"
                      style={{
                        width: "32px",
                        height: "32px",
                      }}
                    ></div>
                  </div>
                  <div>
                    <Text type="secondary" strong>
                      Menstruation date
                    </Text>
                    <div className="fs-5">
                      {lastPeriodDate
                        ? format(lastPeriodDate, "MMM d, yyyy")
                        : "N/A"}
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3">
                  <div className="p-2 rounded-circle bg-info bg-opacity-25">
                    <div
                      className="rounded-circle bg-info d-flex align-items-center justify-content-center"
                      style={{
                        width: "32px",
                        height: "32px",
                      }}
                    >
                      <CalendarOutlined style={{ color: "white" }} />
                    </div>
                  </div>
                  <div>
                    <Text type="secondary" strong>
                      Fertile days
                    </Text>
                    <div className="fs-5">
                      {format(results.fertileStart, "MMM d, yyyy")} -{" "}
                      {format(results.fertileEnd, "MMM d, yyyy")}
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3">
                  <div className="p-2 rounded-circle bg-warning bg-opacity-25">
                    <div
                      className="rounded-circle bg-warning d-flex align-items-center justify-content-center"
                      style={{
                        width: "32px",
                        height: "32px",
                      }}
                    >
                      <CalendarOutlined style={{ color: "white" }} />
                    </div>
                  </div>
                  <div>
                    <Text type="secondary" strong>
                      Expected due date
                    </Text>
                    <div className="fs-5">
                      {format(results.dueDate, "MMM d, yyyy")}
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-center mt-4">
                <Button type="primary" style={{ backgroundColor: "#20B2AA" }}>
                  Next Cycle <RightOutlined />
                </Button>
              </div>
            </Card>
          )}

          {renderCalendar()}

          <div className="mt-4 pt-4 border-top">
            <Paragraph>
              Most couples get pregnant within three months. If you try for a
              year without success (or six months if you're 35 or older), seek
              help from a{" "}
              <a href="#" className="fw-medium text-decoration-underline">
                fertility specialist
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
                Tips for getting pregnant
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
                    Find out when you'll ovulate using our calculator or an
                    ovulation predictor kit, or by tracking your symptoms.
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
                    Have sex every other day around the time of ovulation.
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
                    Start taking a prenatal vitamin with folic acid at least one
                    month before you start trying (6 months is ideal).
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
                    See your healthcare provider and make sure they're managing
                    any pre-existing health conditions you may have. Staying
                    up-to-date with vaccinations and regular check-ups can lower
                    the risk of complications during pregnancy.
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
                    Take good care of yourself. You'll want to kick unhealthy
                    habits like smoking and start incorporating regular exercise
                    into your routine if you aren't exercising already. Eating a
                    healthy, nutrient-dense diet can help, too.
                  </Paragraph>
                </li>
              </ul>
            </section>
          </div>

          <div className="col-12 my-5">
            <section>
              <Title level={2} className="mb-4">
                How moms calculate ovulation
              </Title>
              <Paragraph className="mb-3">
                In addition to using an ovulation calculator, here are ways that
                moms in the BabyCenter Community know they're ovulating:
              </Paragraph>
              <div className="d-flex flex-column gap-3">
                <blockquote
                  className="blockquote border-start border-info ps-3"
                  style={{ borderLeftWidth: "4px" }}
                >
                  <p className="fst-italic mb-0">
                    "I usually get ovulation cramping or pain on my left side" –
                    mommy1johnson
                  </p>
                </blockquote>
                <blockquote
                  className="blockquote border-start border-info ps-3"
                  style={{ borderLeftWidth: "4px" }}
                >
                  <p className="fst-italic mb-0">
                    "My ovulation signs are cervical mucus that looks like egg
                    whites; occasional, very mild, one-sided ovarian discomfort;
                    a higher sex drive; and increased appetite." – krt1987
                  </p>
                </blockquote>
                <blockquote
                  className="blockquote border-start border-info ps-3"
                  style={{ borderLeftWidth: "4px" }}
                >
                  <p className="fst-italic mb-0">
                    "I get bloated and my lower abdomen feels very sore." –
                    Kmarvin91
                  </p>
                </blockquote>
                <blockquote
                  className="blockquote border-start border-info ps-3"
                  style={{ borderLeftWidth: "4px" }}
                >
                  <p className="fst-italic mb-0">
                    "My BBT typically rises incrementally over three days, for a
                    total rise of .8 or .9 over pre-ovulation temperatures." –
                    Rikkubug
                  </p>
                </blockquote>
                <blockquote
                  className="blockquote border-start border-info ps-3"
                  style={{ borderLeftWidth: "4px" }}
                >
                  <p className="fst-italic mb-0">
                    "I woke up in the middle of the night and had an increase in
                    body temperature and lower back pain on the left side." –
                    Newwifelife
                  </p>
                </blockquote>
                <blockquote
                  className="blockquote border-start border-info ps-3"
                  style={{ borderLeftWidth: "4px" }}
                >
                  <p className="fst-italic mb-0">
                    "I have slight bloating, increased appetite, and light
                    cramps like the ones I get before my period. Plus, I'm in a
                    great mood!" – NadiaFlower
                  </p>
                </blockquote>
              </div>
            </section>
          </div>

          <div className="col-12 my-5">
            <section>
              <Title level={2} className="mb-4">
                Signs of ovulation
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
                    Rise in basal body temperature
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
                    Cervical mucus is the texture of egg whites
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
                  <Paragraph className="m-0">Breast tenderness</Paragraph>
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
                    Mild cramps or twinges in the abdomen
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
                  <Paragraph className="m-0">Very mild spotting</Paragraph>
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
                    Heightened sense of smell
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
                  <Paragraph className="m-0">Increased sex drive</Paragraph>
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
                    Changes in appetite or mood
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
                  <Paragraph className="m-0">Bloating</Paragraph>
                </li>
              </ul>
            </section>
          </div>

          <div className="col-12 my-5">
            <section>
              <Title level={2} className="mb-4">
                Frequently asked questions
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
                    <span className="fw-medium">What is ovulation?</span>
                    <RightOutlined
                      className={`transition ${
                        activeKey.includes("1") ? "rotate-90" : ""
                      }`}
                    />
                  </Button>
                  {activeKey.includes("1") && (
                    <div className="p-3">
                      <Paragraph>
                        Ovulation is when one of your ovaries releases an egg.
                        This egg travels down the fallopian tube where it may be
                        fertilized by sperm.
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
                    <span className="fw-medium">When do you ovulate?</span>
                    <RightOutlined
                      className={`transition ${
                        activeKey.includes("2") ? "rotate-90" : ""
                      }`}
                    />
                  </Button>
                  {activeKey.includes("2") && (
                    <div className="p-3">
                      <Paragraph>
                        Most women ovulate about 14 days before their period
                        starts. In a typical 28-day cycle, this would be around
                        day 14.
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
                      How to know when you're ovulating
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
                        You can track your basal body temperature, observe
                        changes in cervical mucus, use ovulation predictor kits,
                        or notice physical symptoms like mild cramping or
                        increased sex drive.
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
                      What does ovulation feel like?
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
                        Some women experience mild cramping, bloating, breast
                        tenderness, or increased sex drive. Others may not feel
                        anything at all.
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
                      How long does ovulation last?
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
                        The egg is only viable for about 24 hours after it's
                        released. However, sperm can live in the female
                        reproductive tract for up to 5 days, so your fertile
                        window is about 6 days.
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
  );
}
