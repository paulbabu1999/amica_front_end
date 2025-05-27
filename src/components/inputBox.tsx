import React, { useState, useRef } from 'react';
// import RecordRTC, { StereoAudioRecorder } from 'recordrtc';

interface Props {
  onSend: (text: string) => void;
  onAudioSend?: (audioBlob: Blob) => void;
}

const InputBox: React.FC<Props> = ({ onSend }) => {
  const [text, setText] = useState('');
  // const [recording, setRecording] = useState(false);
  // const recorderRef = useRef<InstanceType<typeof RecordRTC> | null>(null);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    onSend(text);
    setText('');
  };

  // const startRecording = async () => {
  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

  //     const recorder = new RecordRTC(stream, {
  //       type: 'audio',
  //       mimeType: 'audio/wav',
  //       recorderType: StereoAudioRecorder,
  //       desiredSampRate: 16000,
  //       numberOfAudioChannels: 1,
  //     });

  //     recorder.startRecording();
  //     recorderRef.current = recorder;
  //     setRecording(true);
  //   } catch (err) {
  //     console.error('Microphone access error:', err);
  //   }
  // };

  // const stopRecording = () => {
  //   recorderRef.current?.stopRecording(() => {
  //     const audioBlob = recorderRef.current?.getBlob();
  //     if (audioBlob && onAudioSend) {
  //       onAudioSend(audioBlob);
  //     }
  //     setRecording(false);
  //   });
  // };

  return (
    <form onSubmit={handleSend} className="input-box">
      <input
        type="text"
        value={text}
        placeholder="Type your message..."
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Send</button>
     
    </form>
  );
};

export default InputBox;
