export default function ServicesSection() {
  const services = [
    {
      title: "Express & Standard Delivery",
      desc: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    },
    {
      title: "Nationwide Delivery",
      desc: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
      highlight: true,
    },
    {
      title: "Fulfillment Solution",
      desc: "We offer customized service with inventory management support, online order processing, packaging, and after-sales support.",
    },
    {
      title: "Cash on Home Delivery",
      desc: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    },
    {
      title: "Corporate Service / Contract In Logistics",
      desc: "Customized corporate services which include warehouse and inventory management support.",
    },
    {
      title: "Parcel Return",
      desc: "Through our reverse logistics facility we allow end customers to return or exchange their products with online merchants.",
    },
  ];

  return (
    <section className="bg-[#003C47] py-16 rounded-t-[40px] rounded-b-[40px] mt-8">
      {/* Header Section */}
      <div className="text-center mb-10">
        <div className="inline-block border border-dashed border-cyan-300 px-6 py-3 rounded-xl">
          <h2 className="text-3xl font-bold text-white">Our Services</h2>
          <p className="text-gray-300 mt-2 w-full md:w-[600px] mx-auto">
            Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
            From personal packages to business shipments — we deliver on time, every time.
          </p>
        </div>
      </div>

      {/* Services Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-20 ">
        {services.map((service, index) => (
          <div
            key={index}
            className={`p-6 rounded-[25px] shadow-md border border-cyan-200 bg-white hover:bg-green-300 transition-all duration-300 ease-in-out
           cursor-pointer`}
          >
            <div className="flex justify-center mb-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2554/2554960.png"
                alt="service icon"
                className="w-12 h-12"
              />
            </div>

            <h3 className="text-xl font-bold text-center mb-2">
              {service.title}
            </h3>
            <p className="text-gray-600 text-center">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
