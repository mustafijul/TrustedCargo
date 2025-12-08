import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import useAuth from "../hooks/useAuth";

export default function SendParcel() {
  const { register, handleSubmit, watch } = useForm();
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const { user } = useAuth();

  // Watch form fields
  const parcelType = watch("parcelType");
  const parcelWeight = watch("parcelWeight");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  // SIMPLE TRACKING ID FUNCTION
  const generateTrackingId = () => {
    // Get current timestamp
    const timestamp = Date.now();
    
    // Generate random number (100000 to 999999)
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    
    // Format: TRK-XXXXXX (6 digits)
    return `TRK-${randomNum}`;
  };

  // Calculate price (existing code)
  const calculatePrice = () => {
    if (!parcelType || !parcelWeight || !senderRegion || !receiverRegion) {
      return 0;
    }
    const weight = parseFloat(parcelWeight);
    const isWithinCity = senderRegion === receiverRegion;
    let price = 0;
    
    if (parcelType === "document") {
      price = isWithinCity ? 60 : 80;
    } else if (parcelType === "not-document") {
      if (weight <= 3) {
        price = isWithinCity ? 110 : 150;
      } else {
        const additionalWeight = weight - 3;
        const additionalCharge = additionalWeight * 40;
        if (isWithinCity) {
          price = 110 + additionalCharge;
        } else {
          price = 150 + additionalCharge + 40;
        }
      }
    }
    return price;
  };

  // Price effect (existing code)
  React.useEffect(() => {
    if (parcelType && parcelWeight && senderRegion && receiverRegion) {
      const price = calculatePrice();
      setCalculatedPrice(price);
      
      if (price > 0) {
        toast.dismiss();
        toast.success(`Calculated Price: ${price}৳`, { duration: 5000 });
      }
    }
  }, [parcelType, parcelWeight, senderRegion, receiverRegion]);

  // FORM SUBMIT HANDLER
  const onSubmit = (data) => {
    // Validation
    if (!data.parcelName || !data.parcelWeight) {
      toast.error("Please fill all required fields!");
      return;
    }
    
    if (!data.parcelType) {
      toast.error("Please select parcel type!");
      return;
    }
    
    if (!data.senderRegion || !data.receiverRegion) {
      toast.error("Please select both sender and receiver regions!");
      return;
    }

    // Generate tracking ID
    const trackingId = generateTrackingId();
    
    // Calculate price
    const finalPrice = calculatePrice();
    
    // Create parcel data
    const parcelData = {
      ...data,
      created_by: user?.email || "guest",
      price: finalPrice,
      deliveryType: data.senderRegion === data.receiverRegion ? "Within City" : "Outside City",
      calculatedAt: new Date().toISOString(),
      status: "pending",
      tracking_id: generateTrackingId()  // Add tracking ID here
    };

    console.log(parcelData);

    // Backend: Save data from here
    

    // Show success
    toast.success(
      <div>
        <div className="font-bold">Parcel added successfully!</div>
        <div>Tracking ID: <span className="font-bold text-blue-600">{trackingId}</span></div>
        <div>Price: {finalPrice}৳</div>
        <div className="text-xs">Check console for full details</div>
      </div>,
      { duration: 6000 }
    );

    
  };

  // Warehouse options
  const warehouseOptions = [
    "Dhaka", "Sylhet", "Rajshahi", "Khulna", "Chittagong", "Barisal", "Rangpur", "Mymensingh"
  ];

  return (
    <>
      <Toaster position="top-center" />
      <div className="p-8 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Add Parcel</h1>
        
        {/* Price Display */}
        {(parcelType && parcelWeight && calculatedPrice > 0) && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg text-blue-800">Estimated Price</h3>
                <p className="text-sm text-blue-600">
                  {parcelType === "document" ? "Document" : "Non-Document"} • 
                  {senderRegion === receiverRegion ? " Within City" : " Outside City"}
                </p>
              </div>
              <div className="text-2xl font-bold text-blue-800">{calculatedPrice}৳</div>
            </div>
          </div>
        )}

        <p className="mb-4 text-lg font-medium">Enter your parcel details</p>

        <div className="flex items-center gap-6 mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              value="document" 
              {...register("parcelType")} 
              className="radio radio-success" 
              required
            />
            <span>Document</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              value="not-document" 
              {...register("parcelType")} 
              className="radio" 
              required
            />
            <span>Not-Document</span>
          </label>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Parcel Details */}
          <h2 className="text-2xl font-semibold">Parcel Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <input 
                className="input input-bordered w-full" 
                placeholder="Parcel Name *" 
                {...register("parcelName", { required: true })} 
              />
              <p className="text-xs text-gray-500 mt-1">Required field</p>
            </div>
            <div>
              <input 
                className="input input-bordered w-full" 
                placeholder="Parcel Weight (KG) *" 
                type="number"
                step="0.1"
                min="0.1"
                {...register("parcelWeight", { required: true, min: 0.1 })} 
              />
              <p className="text-xs text-gray-500 mt-1">Required field</p>
            </div>
          </div>

          {/* Sender Details */}
          <h2 className="text-2xl font-semibold mt-4">Sender Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input className="input input-bordered w-full" placeholder="Sender Name" {...register("senderName")} />
            <select className="select select-bordered w-full" {...register("senderWarehouse")} defaultValue="">
              <option value="" disabled>Select Wire House</option>
              {warehouseOptions.map(wh => <option key={wh} value={wh}>{wh}</option>)}
            </select>
            <input className="input input-bordered w-full" placeholder="Address" {...register("senderAddress")} />
            <input className="input input-bordered w-full" placeholder="Sender Contact No" {...register("senderContact")} />
            <select className="select select-bordered w-full" {...register("senderRegion", { required: true })} defaultValue="">
              <option value="" disabled>Select Region *</option>
              {warehouseOptions.map(region => <option key={region} value={region}>{region}</option>)}
            </select>
          </div>

          <textarea className="textarea textarea-bordered w-full mt-4" placeholder="Pickup Instruction (Optional)" {...register("pickupInstruction")} />

          {/* Receiver Details */}
          <h2 className="text-2xl font-semibold mt-4">Receiver Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input className="input input-bordered w-full" placeholder="Receiver Name" {...register("receiverName")} />
            <select className="select select-bordered w-full" {...register("receiverWarehouse")} defaultValue="">
              <option value="" disabled>Select Wire House</option>
              {warehouseOptions.map(wh => <option key={wh} value={wh}>{wh}</option>)}
            </select>
            <input className="input input-bordered w-full" placeholder="Receiver Address" {...register("receiverAddress")} />
            <input className="input input-bordered w-full" placeholder="Receiver Contact No" {...register("receiverContact")} />
            <select className="select select-bordered w-full" {...register("receiverRegion", { required: true })} defaultValue="">
              <option value="" disabled>Select Region *</option>
              {warehouseOptions.map(region => <option key={region} value={region}>{region}</option>)}
            </select>
          </div>

          <textarea className="textarea textarea-bordered w-full mt-4" placeholder="Delivery Instruction (Optional)" {...register("deliveryInstruction")} />

          <p className="text-sm text-gray-600">* Pickup Time 4pm–7pm Approx.</p>

          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div>
              {calculatedPrice > 0 && (
                <p className="font-bold text-lg">
                  Total Price: <span className="text-green-600">{calculatedPrice}৳</span>
                </p>
              )}
            </div>
            <button type="submit" className="btn bg-lime-500 text-white hover:bg-lime-600 w-full md:w-auto">
              Submit Parcel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}