import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import App from './App'



const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const [keepListening, setListening] = useState(null);
  
  useEffect(() => {
    if(keepListening === true){
      SpeechRecognition.startListening();
    }
}, [listening, keepListening]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleStart = () => {
    setListening(true);
    SpeechRecognition.startListening();
  };

  const handleStop = () => {
    setListening(false);
    SpeechRecognition.stopListening();
  }; 


//      <button onClick={() =>SpeechRecognition.startListening({ continuous: true })}>Start</button>

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={() =>SpeechRecognition.startListening({ continuous: true })}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <App transcript = {transcript} />
      <p>{transcript}</p>
    </div>
  );
};
export default Dictaphone;
