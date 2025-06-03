import Aboutus from "./About";
import Appointment from "./Appoinment";
import Carousel from "./Carousel";
import Pricing from "./Pricing";
import ShortServices from "./ShortServices";
import Srvice from "./Srvice";
import Testimonials from "./Testimonials";
import WhyChoose from "./Whychoose";
import WowProvider from "../../components/Wow";
export default function HomeTemplate() {
  return (
    <>
      <WowProvider>
        <Carousel />
        <ShortServices />
        <Aboutus />
        <Srvice />
        <WhyChoose />
        <Pricing />
        <Testimonials />
        <Appointment />
      </WowProvider>
    </>
  );
}
