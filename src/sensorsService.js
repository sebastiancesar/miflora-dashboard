import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as Paho from 'paho-mqtt/paho-mqtt';

const flespiUrl = 'mqtt.flespi.io';
const flespiToken = 'fGkkNsoVw2vmaXUyHocCrD3pHXoCMHPPbXZOfbzz4UM2GuqbGrDXUxbpipRSWuvV';

class FlespiService {
  
  constructor() {
    console.log('FlespiService constructor');
    this.observable = new Observable((observer) => {
      this.observer = observer;
    });
  }

  connect() {
    try {
      this.client = new Paho.Client(flespiUrl, Number(443), 'drafon');
      this.client.onMessageArrived = (message) => {
        console.log('message from flespi' , message.payloadString);
        this.observer.next(JSON.parse(message.payloadString));
      }

      this.client.connect({ 
        useSSL: true,
        mqttVersion: 3,
        userName: flespiToken,
        onSuccess: () => {
          console.log('connected');
          this.client.subscribe('drafon/cherry');
        },
        onFailure: (err) => {
          console.error(err);
        }
      })
    } catch (err) {
      console.error(err);
    }
  }

  getData() {
    return this.observable;
  }
}

class SensorsService {

  
  constructor() {
    this.maqiattoService = new FlespiService();
    this.maqiattoService.connect();
  }

  parseData(data) {
    return {
      light: {
        formatted: data.light + ' lx',
        pretty: 'good'
      },
      temperature: {
        formatted: data.temperature + ' °',
        pretty: 'good'
      },
      moisture: {
        formatted: data.moisture + ' %',
        pretty: 'good'
      },
      fertility: {
        formatted: data.conductivity + ' s/m',
        pretty: 'good'
      }
    }
  }

  getRandomData() {
    return { 
      'light': Math.floor(Math.random() * 3200) + 32010, 
      'temperature': Math.floor(Math.random() * 29) + 1, 
      'moisture': Math.floor(Math.random() * 20) + 18  , 
      'conductivity': Math.floor(Math.random() * 346) + 333 , 
    };
  }

  getData() {
    return this.maqiattoService.getData()
      .pipe(
        map((data) => {
          return this.parseData(data);
        })
      );
  }
  
}

export default SensorsService;