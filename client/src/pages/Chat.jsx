import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getSocket } from '../utilities/socket.utility';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const { user } = useSelector((state) => state.user);
  const socket = getSocket();

  useEffect(() => {
    if (socket) {
      socket.on('message', (message) => {
        setMessages((prev) => [...prev, message]);
      });
    }

    return () => {
      if (socket) {
        socket.off('message');
      }
    };
  }, [socket]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && selectedUser) {
      socket.emit('sendMessage', {
        to: selectedUser.userId,
        message: newMessage,
      });
      setNewMessage('');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 border-r">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Online Users</h2>
          {/* Online users list will go here */}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            {/* Chat header */}
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold">
                Chat with {selectedUser.fullName}
              </h2>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-4 ${
                    msg.from === user.userId ? 'text-right' : 'text-left'
                  }`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg ${
                      msg.from === user.userId
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200'
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>

            {/* Message input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t">
              <div className="flex">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 p-2 border rounded-l-lg focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
                >
                  Send
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500">Select a user to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat; 