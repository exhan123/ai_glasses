import React, { useEffect, useState} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import App from './App';

const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const [keepListening, setListening] = useState(null);

  useEffect(() => {
    if (listening) {
      SpeechRecognition.startListening({ continuous: true});
    }
  }, [listening]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleStart = () => {
    setListening(true);
    SpeechRecognition.startListening({ continuous: true});
  };

  const handleStop = () => {
    SpeechRecognition.stopListening();
  };

  const last50words = transcript.split(' ').slice(-50).join(' ');

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <App transcript={transcript} />
      <p>{last50words}</p>
    </div>
  );
};

export default Dictaphone;
