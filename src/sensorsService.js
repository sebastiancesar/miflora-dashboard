import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as Paho from 'paho-mqtt/paho-mqtt';

const maqiattoUrl = 'maqiatto.com';
const thingStudioUrl = 'mqtt.thingstud.io';
const testMosquito = 'test.mosquitto.org';

class MaqiattoService {

  constructor() {
    this.observable = new Observable((observer) => {
      this.observer = observer;
    });
  }

  connect() {
    this.client = new Paho.Client(testMosquito, Number(8081), this.TOOL_GenerateUUID());
    this.client.onMessageArrived = (message) => {
      console.log('message from maquiateo' , message.payloadString);
      this.observer.next(JSON.parse(message.payloadString));
    }

    this.client.connect({ 
      useSSL: true,
      onSuccess: () => {
        console.log('connected');
        this.client.subscribe('drafon/cherry');
      },
      onFailure: (err) => {
        console.error(err);
      }
    })
  }

  getData() {
    return this.observable;
  }

  TOOL_GenerateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};

}

class SensorsService {

  maqiattoService = new MaqiattoService();

  constructor() {
    this.maqiattoService.connect();
  }

  parseData(data) {
    console.log('parseData ', data);
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