/**import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import BleManager from 'react-native-ble-manager';

const App = () => {
  const [device, setDevice] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Initialize BLE Manager
    BleManager.start({ showAlert: false });

    // Clean up on component unmount
    return () => {
      if (device && connected) {
        BleManager.disconnect(device.id);
      }
    };
  }, [device, connected]);

  const connectToDevice = (deviceId) => {
    BleManager.connect(deviceId)
      .then(() => {
        console.log('Connected to device:', deviceId);
        setDevice({ id: deviceId });
        setConnected(true);
      })
      .catch((error) => {
        console.log('Connection error:', error);
      });
  };

  const disconnectDevice = () => {
    if (device && connected) {
      BleManager.disconnect(device.id)
        .then(() => {
          console.log('Disconnected from device');
          setConnected(false);
        })
        .catch((error) => {
          console.log('Disconnection error:', error);
        });
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>React Native BLE Example</Text>

      {!connected ? (
        <Button
          title="Connect to Device"
          onPress={() => connectToDevice('your-device-id-here')} // Replace with your actual device ID
        />
      ) : (
        <>
          <Text>Connected to {device.id}</Text>
          <Button title="Disconnect" onPress={disconnectDevice} />
        </>
      )}
    </View>
  );
};
export default App;**/
import React, { useState } from 'react';

function App() {
  const [device, setDevice] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState('');

  // Request a Bluetooth device and connect to it
  const requestDevice = async () => {
    try {
      // Request a device that supports the battery service (you can adjust the service filter if needed)
      const selectedDevice = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true
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