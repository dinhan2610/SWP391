import Footer from "../../components/Footer";
import Header from "../../components/Header";
import AIChatbox from "../../components/AIChatbox/AIChatbox";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../../components/ScrollToTop";

export default function HomePages() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
      <AIChatbox />
    </>
  );
}
