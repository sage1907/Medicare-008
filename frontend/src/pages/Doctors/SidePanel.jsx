import React from "react";
import { BASE_URL, token } from "./../../config";
import convertTime from "../../utils/convertTime";
import { toast } from 'react-toastify';

const SidePanel = ({ doctorId, ticketPrice, timeSlots }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user._id : null;

  const bookingHandler = async () => {
    try {
      const res = await fetch(`${BASE_URL}/bookings/checkout-session/${doctorId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId }) // Pass user ID in the request body
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message + " Please try again!");
      }

      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text__para mt-0 font-semibold">Ticket Price</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leadinf-8 text-headingColor font-bold">
          {ticketPrice} INR
        </span>
      </div>

      <div className="mt-[30px]">
        <p className="text__para mt-0 font-semibold text-headingColor">
          Available time slots:
        </p>

        <ul className="mt-3">
          {timeSlots?.map((item, index) => (
            <li key={index} className="flex items-center justify-between mb-2">
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
              </p>
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {convertTime(item.startingTime)} - {convertTime(item.endingTime)}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <button className="btn px-2 w-full rounded-md" onClick={bookingHandler}>
        Book Appointment
      </button>
    </div>
  );
};

export default SidePanel;
