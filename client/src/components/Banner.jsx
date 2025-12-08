import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from "../assets/banner/banner1.jpg";
import banner2 from "../assets/banner/banner2.jpg";
import banner3 from "../assets/banner/banner3.jpg";
import toast, { Toaster } from 'react-hot-toast';

export default function Banner() {
  const success = () => {
    toast.success('Successfully toasted!'); // Changed to toast.success for better styling
  };

  return (
    <div>
      {/* Place Toaster once at the root level */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toasterId="default"
        toastOptions={{
          // Define default options
          className: '',
          duration: 5000,
          removeDelay: 1000,
         style: {
            background: '#ffffff',  // White background
            color: '#000000',      // Black text for contrast
            border: '1px solid #e5e5e5',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          },

          // Default options for specific types
          success: {
            duration: 3000,
            iconTheme: {
              primary: 'green',
              secondary: 'white',
            },
          },
        }}
      />

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
              <button onClick={success} className="btn btn-primary">Get Started</button>
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
            <div className="max-w-lg">
              <h1 className="mb-5 text-5xl font-bold">Delivery in 30 minutes at your doorstep</h1>
              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
}