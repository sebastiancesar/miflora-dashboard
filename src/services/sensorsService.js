import { map } from 'rxjs/operators';
import { interval } from 'rxjs';
import FlespiClient from './FlespiClient';


class SensorsService {
  
  constructor() {
    this.mqttClient = new FlespiClient();
  }

  parseData(data) {
    return {
      timestamp: this.getDate(),
      light: { formatted: data.light + ' lx', pretty: 'good' },
      temperature: { formatted: data.temperature + ' °',pretty: 'good' },
      moisture: { formatted: data.moisture + ' %', pretty: 'good' },
      fertility: { formatted: data.conductivity + ' s/m', pretty: 'good' }
    };
  }

  getRandomData() {
    return { 
      'light': Math.floor(Math.random() * 3200) + 32010, 
      'temperature': Math.floor(Math.random() * 29) + 1, 
      'moisture': Math.floor(Math.random() * 20) + 18  , 
      'conductivity': Math.floor(Math.random() * 346) + 333 , 
    };
  }

  mockData() {
    return interval(5000).pipe(
      map(() => {
        return this.parseData(this.getRandomData());
      })
    )
  }

  getDate() {
    const date = new Date();
    return date.toLocaleDateString() + ' ' + date.getHours() + ':' + date.getMinutes() 
      + ':' + date.getSeconds();
  }

  getData() {
    return this.mqttClient.connect()
      .then((observable) => {
        return observable.pipe(
          map((data) => {
            return this.parseData(data);
          })
        );
      })
      .catch(() => {
        // if there is an error while connecting with the back services, it starts to produce
        // some random values.
        return this.mockData();
      })
  }
  
}

export default SensorsService;