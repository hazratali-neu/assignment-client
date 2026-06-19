import Hero from "@/components/Hero";
// import Image from "next/image";
// import AvailableRooms from "./rooms/page";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import AvailableRooms from "@/components/AvailableRooms";

export default function Home() {
  return (
    <div >
      <Hero></Hero>
      <AvailableRooms></AvailableRooms>
      <WhyChooseUs></WhyChooseUs>
      <Testimonials></Testimonials>
    </div>
  );
}
