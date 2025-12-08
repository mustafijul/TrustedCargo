import React from "react";
import delivery from "../assets/login_delivery.jpg";
import { Outlet } from "react-router";
export default function AuthLayout() {
  return (
    <div>
      <div className="hero bg-base-200">
        <div className="p-12 hero-content flex-col lg:flex-row-reverse">
          <div className="flex-1">
            <img className="h-[300px] w-[500px]" src={delivery} />
          </div>
          <div className="flex-1">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
}
