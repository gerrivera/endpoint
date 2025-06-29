import React from 'react';
import { motion } from 'framer-motion';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  from: 'user' | 'bot';
  text: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ from, text }) => {
  const isUser = from === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start gap-2 mb-2 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center shadow">
          <Bot size={20} />
        </div>
      )}
      <div
        className={`max-w-[70%] p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-md ${
          isUser
            ? 'bg-blue-600 text-white rounded-br-none' 
            : 'bg-gray-100 text-gray-800 rounded-bl-none'
        }`}
      >
        {text}
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow">
          <User size={20} />
        </div>
      )}
    </motion.div>
  );
};
