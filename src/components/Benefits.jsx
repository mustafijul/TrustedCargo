import call from '../assets/call.png'
import client from '../assets/client.png'


export default function FeaturesSection() {
  const features = [
    {
      title: "Live Parcel Tracking",
      desc: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment’s journey and get instant status updates for complete peace of mind.",
      img: call,
    },
    {
      title: "100% Safe Delivery",
      desc: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
      img: call,
    },
    {
      title: "24/7 Call Center Support",
      desc: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
      img:client,
    },
  ];

  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-6xl mx-auto space-y-10">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-base-200 rounded-2xl p-8 shadow-sm flex gap-8 items-center"
          >
            {/* Left Illustration */}
            <div className="min-w-[180px] flex justify-center">
              <img
                src={item.img}
                alt={item.title}
                className="w-40 h-40 object-contain"
              />
            </div>

            {/* Divider */}
            <div className="border-l border-dotted border-gray-400 h-32"></div>

            {/* Text */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
