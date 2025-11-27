import React from "react";
import Banner from "../../components/Banner";
import ServicesSection from "../../components/ServicesSection";
import ClientLogoSlider from "../../components/ClientLogoSlider";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <ServicesSection></ServicesSection>
      <ClientLogoSlider></ClientLogoSlider>
    </div>
  );
}
