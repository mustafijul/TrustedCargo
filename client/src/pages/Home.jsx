import React from "react";
import Banner from "../components/Banner";
import ServicesSection from "../components/ServicesSection";
import ClientLogoSlider from "../components/ClientLogoSlider";
import Benefits from "../components/Benefits";
import BeMarchent from "../components/BeMarchent";
import AccordionSection from "../components/AccordionSection";


export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <ServicesSection></ServicesSection>
      <ClientLogoSlider></ClientLogoSlider>
      <Benefits></Benefits>
      <BeMarchent></BeMarchent>
      <AccordionSection></AccordionSection>
    </div>
  );
}
