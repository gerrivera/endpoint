import React from 'react';
//import ChatComponent from './ChatComponent';
import  {Chat}  from './components/Chat';

/*
function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <ChatComponent />
    </div>
  );
}
*/
function App() {
  return (
     <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-3xl h-[90vh] bg-gray-800 rounded-xl shadow-lg overflow-hidden p-6">
        <Chat />
      </div>
    </div>
  );
}

export default App;