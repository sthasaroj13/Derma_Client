import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Contact: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:8000/contact",
        formData
      );
      setSuccess(response.data.message);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => navigate("/"), 2000);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      {/* Get In Touch Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-orange-600 mb-4">
          Get In Touch
        </h1>
        <p className="text-lg text-gray-700">
          We’d love to hear from you! Whether you have questions, feedback, or
          need assistance, reach out to us anytime. Our team is here to help you
          with all your Derma AI needs.
        </p>
      </div>

      {/* Contact Cards */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md flex justify-center  items-center gap-4">
          <div>
            <div className=" pl-[3.5rem]">
              <Mail className="text-orange-500 text-center " size={24} />
            </div>
            <div>
              <h3 className="text-[16px] font-semibold text-gray-800 text-center">
                Email Us
              </h3>
              <p className="text-gray-600 text-[14px] text-center">
                dermaai44@gmail.com
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex justify-center  items-center gap-4">
          <div>
            <div className=" pl-[2.5rem]">
              <Phone className="text-orange-500" size={24} />
            </div>
            <div>
              <h3 className="text-[16px] font-semibold text-gray-800 text-center">
                Call Us
              </h3>
              <p className="text-gray-600  text-[14px]">+977-1-1234567</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex justify-center  items-center gap-4">
          <div>
            <div className=" pl-[5rem]">
              <MapPin className="text-orange-500" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 text-center">
                Visit Us
              </h3>
              <p className="text-gray-600 mt-1">
                <Clock className="inline mr-2 text-[12px]" size={16} />
                <span className=" text-[.75rem]">
                  Sunday to Friday, 10 AM - 5 PM
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-orange-600 text-center mb-6">
          Send Us a Message
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              placeholder="your.email@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="mt-1 block w-full min-h-[5rem] max-h-[5rem] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              placeholder="Your message here..."
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
