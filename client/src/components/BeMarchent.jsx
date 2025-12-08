export default function BeMarchent() {
  return (
    <div data-aos="flip-left" className="w-full rounded-3xl bg-[#00363D] text-white px-8 py-14 md:px-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-10">

      {/* Text Section */}
      <div className="max-w-xl">
        <h1 className="text-3xl md:text-4xl font-bold leading-snug">
          Merchant and Customer Satisfaction <br /> is Our First Priority
        </h1>

        <p className="mt-4 text-sm md:text-base text-gray-200">
          We offer the lowest delivery charge with the highest value along with
          100% safety of your product. Pathao courier delivers your parcels in every
          corner of Bangladesh right on time.
        </p>

        <div className="flex items-center gap-4 mt-6">
          <button className="btn bg-[#C5FF6B] text-black rounded-full px-6 font-semibold">
            Become a Merchant
          </button>
          <button className="btn bg-transparent border border-[#C5FF6B] text-[#C5FF6B] rounded-full px-6 font-semibold">
            Earn with Profast Courier
          </button>
        </div>
      </div>

      {/* Illustration Box Section */}
      <div className="flex justify-center w-full md:w-auto">
        <svg
          width="330"
          height="220"
          viewBox="0 0 330 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-80"
        >
          <path
            d="M260 50 L180 70 L180 150 L260 130 Z"
            stroke="#5EF1FF"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M180 90 L120 110 L120 180 L180 160 Z"
            stroke="#5EF1FF"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M260 50 C260 30 285 30 285 50 C285 70 260 70 260 50 Z"
            stroke="#5EF1FF"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M120 180 C80 180 70 190 60 200"
            stroke="#5EF1FF"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
