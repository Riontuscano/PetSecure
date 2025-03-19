import { connect } from 'mqtt';
import { Server } from 'socket.io';

const io = new Server(3000, {
  cors: { origin: "*" }
});

const mqttClient = connect('mqtt://localhost:1883');

mqttClient.on('connect', () => {
  console.log('Connected to MQTT Broker');
  mqttClient.subscribe('simulation/data');
});

mqttClient.on('message', (topic, message) => {
  console.log(`Received from MQTT: ${message.toString()}`);
  io.emit('simulationData', message.toString());
});

io.on('connection', (socket) => {
  console.log('Client connected');
});
