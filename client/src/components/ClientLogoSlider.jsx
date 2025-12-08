import Marquee from "react-fast-marquee";
import logo1 from '../assets/brands/amazon.png'
import logo2 from '../assets/brands/casio.png'
import logo3 from '../assets/brands/moonstar.png'
import logo4 from '../assets/brands/randstad.png'
import logo5 from '../assets/brands/star.png'
import logo6 from '../assets/brands/start_people.png'
import logo7 from '../assets/brands/amazon_vector.png'


export default function LogoMarquee() {
  const logos = [
    logo1, logo2, logo3,logo4, logo5, logo6, logo7
  ];

  return (
    <section className="bg-base-200 py-12">
      <h2 className="text-2xl font-semibold text-center mb-10">
        We've helped thousands of sales teams
      </h2>

      {/* Right-to-left marquee */}
      <Marquee
        direction="left"  // 👈 scrolls from right → left
        speed={50}
        gradient={false}
      >
        <div className="flex items-center gap-20">
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`Logo ${index}`}
              className="h-6 opacity-80 hover:opacity-100 transition"
            />
          ))}
        </div>
      </Marquee>
    </section>
  );
}
