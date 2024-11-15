import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import App from './App'


const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

 
  /**const handleChange = (transcript) => {
    const options =  {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        
      "hello")
    }
     fetch('http://localhost:3000/', options)
     .then(response => response.json())
     .then(data => console.log(data))
     .catch(error => console.error(error));
  };**/
  // Effect that runs when `transcript` changes
  /**useEffect(() => {
    if (transcript) {
      const postData = async () => {
        try {
          const response = await fetch('http://localhost:3000/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ transcript }),
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          console.log('Data from server:', data);
        } catch (error) {
          console.error('Error posting data:', error);
        }
      };

      // Send the post request every time transcript changes
      postData();
    }
  }, [transcript]); **/

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

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
