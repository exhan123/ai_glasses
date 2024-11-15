
import React, { useEffect, useState } from 'react';


function App({transcript}) {
  const [device, setDevice] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState('');
  const [getCharacteristic, setCharacteristic] = useState(null);


  // Request a Bluetooth device and connect to it
  const requestDevice = async () => {
    try {
      // Request a device that supports the battery service (you can adjust the service filter if needed)
      const selectedDevice = await navigator.bluetooth.requestDevice({
        //acceptAllDevices: true,
        filters: [{services: [ "12345678-1234-1234-1234-123456789abc"]}],

        optionalServices: ['12345678-1234-1234-1234-123456789abc']

      });
      
      setDevice(selectedDevice);
      connectToDevice(selectedDevice);
    } catch (err) {
      setError('Device request failed: ' + err);
    }
  };

  // Connect to the device
  const connectToDevice = async (device) => {
    setConnecting(true);
    try {
      // Connect to the GATT server
      const server = await device.gatt.connect();
      console.log('Connected to', device.name);

      // Optionally, you could interact with the device's services here, e.g., reading or writing characteristics
      const service = await server.getPrimaryService('12345678-1234-1234-1234-123456789abc');
      const char = await service.getCharacteristic('abcd1234-abcd-abcd-abcd-abcd1234abcd');

      setCharacteristic(char); // Store the characteristic for later use
    } catch (err) {
      setError('Connection failed: ' + err);
    } finally {
      setConnecting(false);
    }
  };

  // Disconnect the device
  const disconnectDevice = () => {
    if (device && device.gatt.connected) {
      device.gatt.disconnect();
      console.log('Disconnected from', device.name);
      setDevice(null);
    }
  };

  // Write a value to the characteristic
async function writeToCharacteristic(characteristic, value) {
  try {
    const encodedValue = new TextEncoder().encode(value);

    await characteristic.writeValue(encodedValue);
    console.log('Successfully wrote value to characteristic:', value);
  } catch (error) {
    console.error('Error writing value:', error);
  }
}

    // Method to be executed whenever the transcript changes
    const handleTranscriptChange = (newTranscript) => {
      console.log('New transcript received:', newTranscript);
      writeToCharacteristic(getCharacteristic, transcript)
      // Your custom logic here (e.g., update a UI, make an API call)
    };
  
    // useEffect to monitor changes in transcript
    useEffect(() => {
      if (transcript) {
        handleTranscriptChange(transcript);  // Call the method whenever transcript changes
      }
    }, [transcript]);
  

  return (
    <div className="App">
      <h1>React PWA with Bluetooth (BLE)</h1>
      <button onClick={requestDevice} disabled={connecting}>
        {connecting ? 'Connecting...' : 'Connect to BLE Device'}
      </button>
      
      {device && (
        <div>
          <h2>Connected to: {device.name}</h2>
          <button onClick={disconnectDevice}>Disconnect</button>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;