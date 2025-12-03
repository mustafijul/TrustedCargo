import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

export default function SendParcel() {
  const { register, handleSubmit, watch } = useForm();
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  
  // Watch form fields for real-time calculations
  const parcelType = watch("parcelType");
  const parcelWeight = watch("parcelWeight");
  const senderWarehouse = watch("senderWarehouse");
  const receiverWarehouse = watch("receiverWarehouse");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  // Calculate price based on pricing structure
  const calculatePrice = () => {
    // Check if we have all required data
    if (!parcelType || !parcelWeight || !senderRegion || !receiverRegion) {
      return 0;
    }

    // this line will accept fractional value
    const weight = parseFloat(parcelWeight);
    
    // Check if within same city (using regions for simplicity)
    // In a real app, you might want to compare warehouses instead
    const isWithinCity = senderRegion === receiverRegion;
    
    let price = 0;
    
    // Apply pricing structure
    if (parcelType === "document") {
      // Document pricing
      price = isWithinCity ? 60 : 80;
    } else if (parcelType === "not-document") {
      // Non-document pricing
      if (weight <= 3) {
        price = isWithinCity ? 110 : 150;
      } else {
        // For weights over 3kg
        const additionalWeight = weight - 3;
        const additionalCharge = additionalWeight * 40;
        
        if (isWithinCity) {
          price = 110 + additionalCharge;
        } else {
          price = 150 + additionalCharge + 40; // +৳40 extra for outside city
        }
      }
    }
    
    return price;
  };

  // Show price toast whenever relevant fields change
  React.useEffect(() => {
    if (parcelType && parcelWeight && senderRegion && receiverRegion) {
      const price = calculatePrice();
      setCalculatedPrice(price);
      
      // Show price information
      toast.dismiss(); // Clear previous price toasts
      
      if (price > 0) {
        const isWithinCity = senderRegion === receiverRegion; //checking same city or not
        const weight = parseFloat(parcelWeight);
        
        let details = "";
        if (parcelType === "document") {
          details = `Document delivery ${isWithinCity ? "within city" : "outside city"}`;
        } else {
          details = `Non-document (${weight}kg) ${isWithinCity ? "within city" : "outside city"}`;
          
          if (weight > 3 && parcelType === "not-document") {
            details += `\nBase: ${isWithinCity ? "110" : "150"} + Additional: ${(weight - 3) * 40}৳`;
            if (!isWithinCity) details += " + 40৳ extra";
          }
        }
        
        toast.success(
          <div>
            <div className="font-bold">Calculated Price: {price}৳</div>
            <div className="text-sm">{details}</div>
          </div>,
          { 
            duration: 5000,
            icon: '💰'
          }
        );
      }
    }
  }, [parcelType, parcelWeight, senderRegion, receiverRegion]);

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

    // Calculate final price
    const finalPrice = calculatePrice();
    
    // Create parcel data with price
    const parcelData = {
      ...data,
      price: finalPrice,
      deliveryType: data.senderRegion === data.receiverRegion ? "Within City" : "Outside City",
      calculatedAt: new Date().toISOString()
    };

    console.log("Parcel Data:", parcelData);
    
    // Show success message with price breakdown
    toast.success(
      <div>
        <div className="font-bold">Parcel added successfully!</div>
        <div>Total Price: {finalPrice}৳</div>
        <div className="text-sm">Delivery: {parcelData.deliveryType}</div>
      </div>,
      { 
        duration: 6000,
        icon: '✅'
      }
    );
    
    // Here you would typically send the data to your API
    // Example: axios.post('/api/parcels', parcelData)
  };

  // Format warehouse options
  const warehouseOptions = [
    "Dhaka", "Sylhet", "Rajshahi", "Khulna", "Chittagong", "Barisal", "Rangpur", "Mymensingh"
  ];

  return (
    <>
      <Toaster position="top-center" />
      <div className="p-8 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Add Parcel</h1>
        
        {/* Price Display Card */}
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
                {...register("parcelWeight", { 
                  required: true,
                  min: 0.1
                })} 
              />
              <p className="text-xs text-gray-500 mt-1">Required field. Use decimal for grams (e.g., 0.5 for 500g)</p>
            </div>
          </div>

          {/* Sender Details */}
          <h2 className="text-2xl font-semibold mt-4">Sender Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input className="input input-bordered w-full" placeholder="Sender Name" {...register("senderName")} />

            <select 
              className="select select-bordered w-full" 
              {...register("senderWarehouse")}
              defaultValue=""
            >
              <option value="" disabled>Select Wire House</option>
              {warehouseOptions.map(wh => (
                <option key={wh} value={wh}>{wh}</option>
              ))}
            </select>

            <input className="input input-bordered w-full" placeholder="Address" {...register("senderAddress")} />
            <input 
              className="input input-bordered w-full" 
              placeholder="Sender Contact No" 
              {...register("senderContact")} 
            />

            <select 
              className="select select-bordered w-full" 
              {...register("senderRegion", { required: true })}
              defaultValue=""
            >
              <option value="" disabled>Select Region *</option>
              {warehouseOptions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>

          <textarea 
            className="textarea textarea-bordered w-full mt-4" 
            placeholder="Pickup Instruction (Optional)" 
            {...register("pickupInstruction")} 
          />

          {/* Receiver Details */}
          <h2 className="text-2xl font-semibold mt-4">Receiver Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input className="input input-bordered w-full" placeholder="Receiver Name" {...register("receiverName")} />

            <select 
              className="select select-bordered w-full" 
              {...register("receiverWarehouse")}
              defaultValue=""
            >
              <option value="" disabled>Select Wire House</option>
              {warehouseOptions.map(wh => (
                <option key={wh} value={wh}>{wh}</option>
              ))}
            </select>

            <input className="input input-bordered w-full" placeholder="Receiver Address" {...register("receiverAddress")} />
            <input 
              className="input input-bordered w-full" 
              placeholder="Receiver Contact No" 
              {...register("receiverContact")} 
            />

            <select 
              className="select select-bordered w-full" 
              {...register("receiverRegion", { required: true })}
              defaultValue=""
            >
              <option value="" disabled>Select Region *</option>
              {warehouseOptions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>

          <textarea 
            className="textarea textarea-bordered w-full mt-4" 
            placeholder="Delivery Instruction (Optional)" 
            {...register("deliveryInstruction")} 
          />

          <p className="text-sm text-gray-600">* Pickup Time 4pm–7pm Approx.</p>

          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div>
              {calculatedPrice > 0 && (
                <p className="font-bold text-lg">
                  Total Price: <span className="text-green-600">{calculatedPrice}৳</span>
                </p>
              )}
            </div>
            <button 
              type="submit" 
              className="btn bg-lime-500 text-white hover:bg-lime-600 w-full md:w-auto"
            >
              Proceed to Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </>
  );
}