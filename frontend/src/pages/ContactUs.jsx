import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import toast from 'react-hot-toast';

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Your message has been sent. We will get back to you soon!');
  };

  return (
    <div className="px-[5%] py-16 bg-white min-h-screen text-left">
      <div className="max-w-6xl mx-auto flex flex-wrap gap-16">
        <div className="flex-1 min-w-[300px]">
          <h1 className="text-4xl font-black text-gray-900 mb-6 tracking-tight">Get in Touch</h1>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            Have a question about an order or just want to say hi? We'd love to hear from you. Fill out the form or use our contact details.
          </p>

          <div className="space-y-8">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-green-50 text-primary rounded-2xl flex items-center justify-center">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Phone</h4>
                <p className="text-gray-600">+880 123 456 789</p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-orange-50 text-accent rounded-2xl flex items-center justify-center">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Email</h4>
                <p className="text-gray-600">support@groceryfresh.com</p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Office</h4>
                <p className="text-gray-600">Level 4, Fresh Tower, Uttara Sector 7, Dhaka</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-[350px] bg-gray-50 p-10 rounded-[30px] border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-black mb-2 text-gray-700 uppercase tracking-wider">Full Name</label>
              <input type="text" placeholder="John Doe" className="w-full p-4 bg-white border border-gray-200 rounded-2xl outline-none focus:border-primary transition-all" required />
            </div>
            <div>
              <label className="block text-xs font-black mb-2 text-gray-700 uppercase tracking-wider">Email Address</label>
              <input type="email" placeholder="john@example.com" className="w-full p-4 bg-white border border-gray-200 rounded-2xl outline-none focus:border-primary transition-all" required />
            </div>
            <div>
              <label className="block text-xs font-black mb-2 text-gray-700 uppercase tracking-wider">Message</label>
              <textarea rows="5" placeholder="How can we help?" className="w-full p-4 bg-white border border-gray-200 rounded-2xl outline-none focus:border-primary transition-all resize-none" required></textarea>
            </div>
            <button type="submit" className="w-full py-4 bg-primary text-white border-none rounded-2xl text-lg font-black flex items-center justify-center gap-3 cursor-pointer shadow-xl shadow-green-900/10 hover:bg-secondary transition-all">
              Send Message <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
