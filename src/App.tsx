import React, { use, useEffect, useState } from 'react';
import axios from 'axios';
import UserForm from './components/userForm';
import ChatWindow from './components/chatWindow';
import InputBox from './components/inputBox';
import { Message, UserInfo } from './types';
import './styles.css';

const App: React.FC = () => {
  const [user, setUser] = useState<UserInfo | null>();
  const [count, setCount] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  console.log('User:', user);

  useEffect(() => {
    const fetchMessages = async () => {
      if (user) {
        console.log('Fetching messages for user:');
        try {
          const response = await axios.get(`http://localhost:5050/api/chats?user_id=${user.phone}`);
           // Transform API response into Message[]
        const formattedMessages: Message[] = response.data.flatMap((chat: any) => [
          { sender: user.name, text: chat.user_input },
          { sender: 'Amica', text: chat.response?.response_to_user }
        ]);

        setMessages(formattedMessages);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      }
    };

    fetchMessages();
  }, [user,count]);



  const handleSendMessage = async (text: string) => {
    const userMessage: Message = { sender: user?.phone, text };
    setMessages(prev => [...prev, userMessage]);

    const response = await axios.post('http://localhost:5050/api/chat', {
      user_id: user?.phone,
      message: text
    });
    setCount(count + 1);

  };
  const handleAudioSend = (audioBlob: Blob) => {
    setMessages((prev) => [...prev, { sender: 'user', audio: audioBlob }]);

  };
  

 

    
  return (
    <div className="app">
      <h1>Chat Application</h1>
      {!user && <UserForm onSubmit={setUser} />}
      {user && (
        <div className="user-info">
          <h2>Welcome, {user.name}!</h2>
      
          <ChatWindow messages={messages} />
          <InputBox onSend={handleSendMessage} onAudioSend={handleAudioSend} />
        
      
        </div>
      )}
    </div>
  );
};

export default App;
