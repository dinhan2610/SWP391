import Aboutus from "./About";
import Appointment from "./Appoinment";
import Carousel from "./Carousel";

import ShortServices from "./ShortServices";
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
        <WhyChoose />
        <Testimonials />
        <Appointment />
      </WowProvider>
    </>
  );
}
