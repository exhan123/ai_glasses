import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Dictaphone from './Dictaphone';
import App from './App'
// @flow

/**export const manager = new BleManager() 
const deviceId = "4fafc201-1fb5-459e-8fcc-c5c9c331914b"

const connect = async () => {  

  try {  
  
  await manager.connectToDevice(deviceId).then(device=>{ 
  
  console.log('Connected to device:', device.name);  
  
  // Add your logic for handling the connected device 
  
  return device.discoverAllServicesAndCharacteristics(); 
  
  }).catch(error => { 
      // Handle errors 
    }) 
  
  } catch (error) {  
  
  console.error('Error connecting to device:', error);  
  
  }  
  
  }; 

function scan () { 
  manager.startDeviceScan(null, null, (error, device) => { 
    if (error) { 
      // Handle error (scanning will be stopped automatically) 
      return 
    } 
 
    // Check if it is a device, you are looking for based on advertisement data 
    // or other criteria. 
    if (device.name === 'TI BLE Sensor Tag' || device.name === 'SensorTag') { 
      // Stop scanning as it's not necessary if you are scanning for one device. 

      connect() 
      manager.stopDeviceScan() 
 
      // Proceed with connection. 
    } 
  }) 
};**/



  
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


