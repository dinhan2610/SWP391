import Aboutus from "./About";
import Booking from "./Booking";
import Carousel from "./Carousel";

import ShortServices from "./ShortServices";
import Feedback from "./Feedback";
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
        <Booking />
        <Feedback />
      </WowProvider>
    </>
  );
}
