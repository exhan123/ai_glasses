import React, { useEffect } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

const Dictaphone = () => {
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition()
  const startListening = () => SpeechRecognition.startListening({ continuous: true })

  if (!browserSupportsSpeechRecognition) {
    return null
  }

  return (
    <div>
      <button onClick={startListening}>Start</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  )
}
export default Dictaphone