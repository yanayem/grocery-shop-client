import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Assalamu Alaikum! How can we help you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = { id: Date.now(), text: input, sender: 'user' };
    setMessages([...messages, newMsg]);
    setInput('');

    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "Thank you for your message. One of our support human will get back to you soon!",
        sender: 'bot'
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-[30px] right-[30px] z-[1000] font-sans">
      {!isOpen ? (
        <button
          className="w-[60px] h-[60px] rounded-full bg-primary text-white border-none flex items-center justify-center cursor-pointer shadow-lg transition-transform hover:scale-110"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle size={30} />
        </button>
      ) : (
        <div className="absolute bottom-[80px] right-0 w-[350px] h-[450px] bg-white rounded-[20px] shadow-2xl flex flex-col overflow-hidden border border-gray-100 animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-primary text-white p-5 flex justify-between items-center">
            <h4 className="m-0 text-base font-bold">GroceryFresh Support</h4>
            <button className="bg-none border-none text-white cursor-pointer opacity-80" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 p-5 overflow-y-auto bg-gray-50 flex flex-col gap-4">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`max-w-[80%] p-3 rounded-[15px] text-[0.9rem] leading-snug ${
                  msg.sender === 'bot'
                    ? 'bg-[#e1eee3] text-gray-800 self-start rounded-bl-none'
                    : 'bg-primary text-white self-end rounded-br-none'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <form className="p-4 border-t border-gray-100 flex gap-2.5" onSubmit={handleSend}>
            <input
              type="text"
              className="flex-1 border border-gray-200 rounded-xl p-2.5 outline-none text-[0.9rem] focus:border-primary"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="bg-primary text-white border-none w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer hover:opacity-90">
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LiveChat;
