// src/components/Chat.tsx
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';

export const Chat = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ from: 'user' | 'bot'; text: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message.trim();
    setChatHistory(prev => [...prev, { from: 'user', text: userMessage }]);
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:4000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message_from_client: userMessage }),
      });

      const data = await response.json();

      setChatHistory(prev => [
        ...prev,
        { from: 'bot', text: data.message_from_server || '[sin respuesta]' },
      ]);
    } catch (error) {
      setChatHistory(prev => [
        ...prev,
        { from: 'bot', text: 'Error al comunicarse con el servidor.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded-xl shadow-lg bg-white dark:bg-gray-800 transition-colors duration-500">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">
        Chat con el Servidor
      </h2>

      <div className="h-80 overflow-y-auto border rounded-md p-2 bg-gray-100 dark:bg-gray-700 mb-4 space-y-2">
        {chatHistory.map((msg, index) => (
          <ChatMessage key={index} from={msg.from} text={msg.text} />
        ))}

        {loading && <ChatMessage from="bot" text="Escribiendo..." />}

        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-grow border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-900 dark:text-white transition-colors"
          placeholder="Escribe tu mensaje..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-all"
          disabled={loading}
        >
          Enviar
        </button>
      </div>
    </div>
  );
};
