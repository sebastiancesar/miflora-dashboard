import { Observable } from 'rxjs';
import * as Paho from 'paho-mqtt/paho-mqtt';

const FLESPI_URL = 'mqtt.flespi.io';
const FLESPI_TOKEN = 'fGkkNsoVw2vmaXUyHocCrD3pHXoCMHPPbXZOfbzz4UM2GuqbGrDXUxbpipRSWuvV';
const FLESPI_TOPIC = 'drafon/cherry';
const FLESPI_CLIENT_ID = 'drafon';


class FlespiClient {

  constructor() {
    this.client = this.createPahoClient();
  }

  createPahoClient() {
    return new Paho.Client(FLESPI_URL, Number(443), FLESPI_CLIENT_ID);
  }

  registerEventsToClient(observer) {
    this.client.onMessageArrived = (message) => { this.onMessage(message, observer); };
  }

  onMessage(message, observer) {
    console.log('FlespiClient > message from flespi' , message.payloadString);
    observer.next(JSON.parse(message.payloadString));
  }

  onConnect(resolve) {
    console.log('FlespiClient > connected');
    resolve(
      new Observable((observer) => {
        this.client.subscribe(FLESPI_TOPIC);
        this.registerEventsToClient(observer);
      })
    );
  }

  connect() {
    return new Promise(async (resolve, reject) => {
      try {
        this.client.connect({ 
          useSSL: true,
          mqttVersion: 3,
          userName: FLESPI_TOKEN,
          onSuccess: () => { this.onConnect(resolve); },
          onFailure: (err) => {
            console.error(err);
            reject(err);
          }
        });
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  }
}

export default FlespiClient;