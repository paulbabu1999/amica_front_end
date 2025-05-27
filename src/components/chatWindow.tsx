import React from 'react';
import { Message } from '../types';

interface Props {
  messages: Message[];
}

const ChatWindow: React.FC<Props> = ({ messages }) => {
  console.log('Messages:', messages);
  return (
    <div className="chat-window">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`message-bubble ${msg.sender === 'Amica' ? 'amica' : 'user'}`}
        >
          <div className="sender-name">
            {msg.sender}
          </div>

          {msg.text && (
            <div className="message-text">
              {msg.text}
            </div>
          )}

          {msg.audioBlob && (
            <audio controls className="message-audio">
              <source src={URL.createObjectURL(msg.audioBlob)} type="audio/wav" />
              Your browser does not support the audio element.
            </audio>
          )}
        </div>
      ))}
    </div>
  );
};


export default ChatWindow;
