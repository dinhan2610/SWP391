import Footer from "../../components/Footer";
import Header from "../../components/Header";
import AIChatbox from "../../components/AIChatbox/AIChatbox";
import { Outlet } from "react-router-dom";

export default function HomePages() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <AIChatbox />
    </>
  );
}
