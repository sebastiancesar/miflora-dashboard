import React, { Component } from "react";
import SensorItem from '../sensorItem/SensorItem';
import SensorsService from '../services/sensorsService';

const EMPTY_READ = { lastRead: '-' , light: '-', moisture: '-', temperature: '-', fertility: '-' };

class SensorsGrid extends Component {
  
  constructor(props) {
    super();
    this.props = props;
    this.sensorsService = new SensorsService();
    this.startFetchingDataFromDevice = this.startFetchingDataFromDevice.bind(this);
    this.stopFetchingDataFromDevice = this.stopFetchingDataFromDevice.bind(this);
    this.state = { data: EMPTY_READ };
  }

  componentDidMount() {
    this.startFetchingDataFromDevice();
  }

  componentWillUnmount() {
    this.stopFetchingDataFromDevice();
  }

  stopFetchingDataFromDevice() {
    this.dataSensors.unsubscribe();
  }

  startFetchingDataFromDevice() {
    this.sensorsService.getData()
      .then((observable) => {
        observable.subscribe((data) => {
          console.log('Panel subscribed ', data);
          this.setState({ data });
        });
      })
      .catch(() => {
        // The final user doesn't care about technical details 
        console.error('Sorry, something went wrong with the connection ...');
      });
  }

  render() {
    const lastRead = this.state.data;
    return (
      <div className="sensors-grid">
        <SensorItem field="light" data={lastRead.light} />
        <SensorItem field="moisture" data={lastRead.moisture} />
        <SensorItem field="temp" data={lastRead.temperature} />
        <SensorItem field="fertility" data={lastRead.fertility} />
        <span className="last-read"> last read: {lastRead.timestamp} </span>
      </div>
    );
  }
}

export default SensorsGrid;