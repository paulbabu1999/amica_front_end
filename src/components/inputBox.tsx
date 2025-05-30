import React, { useState, useRef } from 'react';
import RecordRTC, { StereoAudioRecorder } from 'recordrtc';

interface Props {
  onSend: (text: string) => void;
  onAudioSend?: (audioBlob: Blob) => void;
}

const InputBox: React.FC<Props> = ({ onSend, onAudioSend }) => {
  const [text, setText] = useState('');
  const [recording, setRecording] = useState(false);
  const recorderRef = useRef<InstanceType<typeof RecordRTC> | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const recorder = new RecordRTC(stream, {
        type: 'audio',
        mimeType: 'audio/wav',
        recorderType: StereoAudioRecorder,
        desiredSampRate: 16000,
        numberOfAudioChannels: 1,
      });

      recorder.startRecording();
      recorderRef.current = recorder;
      setRecording(true);
    } catch (err) {
      console.error('Microphone access error:', err);
    }
  };

  const stopRecording = () => {
    if (!recorderRef.current) return;

    recorderRef.current.stopRecording(() => {
      const audioBlob = recorderRef.current?.getBlob();
      if (audioBlob && onAudioSend) {
        onAudioSend(audioBlob);
      }

      // Clean up
      recorderRef.current?.destroy();
      recorderRef.current = null;

      streamRef.current?.getTracks().forEach(track => track.stop());
      streamRef.current = null;

      setRecording(false);
    });
  };

  const toggleRecording = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="input-container">
      <form onSubmit={handleSend} className="input-box">
        <input
          type="text"
          value={text}
          placeholder="Type your message..."
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Send</button>
        <button onClick={toggleRecording} className="record-button">
          {recording ? 'Stop Recording' : '🎤 Start Recording'}
        </button>
      </form>
    </div>
  );
};

export default InputBox;
