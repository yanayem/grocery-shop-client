import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
  const faqs = [
    {
      q: "How fast is the delivery?",
      a: "We aim to deliver within 60 minutes for most areas in Dhaka. During high demand or heavy traffic, it might take a bit longer, but we'll always keep you updated."
    },
    {
      q: "What are your delivery hours?",
      a: "Our delivery service operates from 8:00 AM to 10:00 PM every day, including weekends and public holidays."
    },
    {
      q: "How do I pay for my order?",
      a: "We currently accept Cash on Delivery (COD) and mobile payments like bKash and Rocket. Online credit/debit card payments are coming soon!"
    },
    {
      q: "Is there a minimum order amount?",
      a: "No, there is no minimum order amount! However, a standard delivery fee of ৳45 applies to all orders."
    },
    {
      q: "What if I receive a damaged product?",
      a: "Customer satisfaction is our priority. If you receive a damaged or incorrect item, please notify the delivery rider immediately or contact our support team within 12 hours for a full refund or exchange."
    }
  ];

  return (
    <div className="px-[5%] py-16 bg-white min-h-screen text-left">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Frequently Asked Questions</h1>
        <p className="text-gray-500 mb-12">Everything you need to know about our service and products.</p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} {...faq} />
          ))}
        </div>
      </div>
    </div>
  );
};

const FAQItem = ({ q, a }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden bg-gray-50/50">
      <button
        className="w-full p-6 flex justify-between items-center text-left bg-transparent border-none cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-bold text-gray-800 text-lg">{q}</span>
        {isOpen ? <Minus size={20} className="text-primary" /> : <Plus size={20} className="text-gray-400" />}
      </button>
      {isOpen && (
        <div className="px-6 pb-6 text-gray-600 leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
          {a}
        </div>
      )}
    </div>
  );
};

export default FAQ;
