import React, { useState } from 'react';
import { UserInfo } from '../types';

interface Props {
  onSubmit: (data: UserInfo) => void;
}

const UserForm: React.FC<Props> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, phone });
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <input type="text" placeholder="Name" value={name}
        onChange={(e) => setName(e.target.value)} required />
      <input type="tel" placeholder="Phone Number" value={phone}
        onChange={(e) => setPhone(e.target.value)} required />
      <button type="submit">Start Chat</button>
    </form>
  );
};

export default UserForm;
