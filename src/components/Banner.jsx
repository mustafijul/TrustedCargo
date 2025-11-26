import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import banner1 from "../assets/banner/banner1.jpg";
import banner2 from "../assets/banner/banner2.jpg";
import banner3 from "../assets/banner/banner3.jpg";

export default function Banner() {
  return (
    <div>
      <Carousel
        autoPlay
        infiniteLoop
        interval={3000}
        stopOnHover={false}
        showThumbs={false}
        showStatus={false}
        showArrows={true}
        swipeable={true}
        emulateTouch={true}
        className="custom-carousel"
      >
        {/* SLIDE 1 */}
        <div
          className="hero min-h-screen"
          style={{
            backgroundImage: `url(${banner1})`,
          }}
        >
          <div className="hero-overlay"></div>
          <div className="hero-content text-neutral-content text-center">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">We make sure your product arrival ontime</h1>             
              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>

        {/* SLIDE 2 */}
        <div
          className="hero min-h-screen"
          style={{
            backgroundImage: `url(${banner2})`,
          }}
        >
          
          <div className="hero-overlay"></div>
          <div className="hero-content text-neutral-content text-center">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">Fast delivary and easy pickup</h1>
              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>

        {/* SLIDE 3 */}
        <div
          className="hero min-h-screen"
          style={{
            backgroundImage: `url(${banner3})`,
          }}
        >
          
          <div className="hero-overlay"></div>
          <div className="hero-content text-neutral-content text-center">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">Delivary in 30 minutes at your doorstep</h1>
              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>

      </Carousel>
    </div>
  );
}
