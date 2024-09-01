import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { services } from "../../assets/data/services";
import { Clock, User, Phone, MapPin } from "lucide-react";

const ServiceDetails = () => {
  const { id } = useParams();
  const service = services[id];
  const navigate = useNavigate();

  const appointmentHanlder = () => {
    navigate("/doctors");
  }

  if (!service) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-3xl font-bold text-red-600">Service not found</h1>
        <p className="mt-4 text-gray-600">The requested service does not exist.</p>
      </div>
    );
  }

  return (
    <section className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="md:flex flex-row-reverse"> {/* Reversed flex direction */}
            <div className="md:w-1/3 flex-shrink-0">
              <img 
                className="w-full h-full object-cover" 
                src={service.image} 
                alt={service.name} 
              />
            </div>
            <div className="md:w-2/3 p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{service.category}</div>
              <h1 className="mt-2 text-4xl font-extrabold text-gray-900 leading-tight">{service.name}</h1>
              <p className="mt-4 text-xl text-gray-600 leading-relaxed">{service.desc}</p>
            </div>
          </div>
          
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Key Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center">
                <Clock className="h-6 w-6 text-indigo-500 mr-3" />
                <span className="text-gray-700">Duration: {service.duration}</span>
              </div>
              <div className="flex items-center">
                <User className="h-6 w-6 text-indigo-500 mr-3" />
                <span className="text-gray-700">Specialist: Dr. {service.doctor}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-indigo-500 mr-3" />
                <span className="text-gray-700">Location: {service.location}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-6 w-6 text-indigo-500 mr-3" />
                <span className="text-gray-700">Contact: {service.contact}</span>
              </div>
            </div>
          </div>

          <div className="px-8 py-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">What to Expect</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              {service.expectations.map((expectation, index) => (
                <li key={index}>{expectation}</li>
              ))}
            </ul>
          </div>

          <div className="px-8 py-6 bg-indigo-50">
            <h2 className="text-2xl font-bold text-indigo-800 mb-4">Preparing for Your Appointment</h2>
            <p className="text-indigo-700 mb-4">{service.preparation}</p>
          </div>

          <div className="px-8 py-6 flex justify-between items-center border-t border-gray-200">
            <div>
              <span className="text-3xl font-bold text-gray-900">${service.price}</span>
              <span className="text-gray-600 ml-2">per session</span>
            </div>
            <button onClick={appointmentHanlder} className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
              Book an Appointment
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetails;