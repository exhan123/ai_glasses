import React, { useState, useEffect } from 'react';
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

export default App;