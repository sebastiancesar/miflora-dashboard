import React, { Component } from "react";
import plantImage from './cherry.jpg';
import './Panel.css';
import SensorItem from './SensorItem';
import SensorsService from './sensorsService';

class PlantImage extends Component {
  render() {
    return (
      <img src={plantImage} className="App-logo" alt="logo" />
    );
  }
}

class SensorsGrid extends Component {
  
  sensorsService = new SensorsService();

  constructor(props) {
    super();
    this.props = props;
  }

  render() {
    return (
      <div className="sensors-grid">
        <SensorItem field="light" data={this.props.data.light} />
        <SensorItem field="moisture" data={this.props.data.moisture} />
        <SensorItem field="temp" data={this.props.data.temperature} />
        <SensorItem field="fertility" data={this.props.data.fertility} />
      </div>
    );
  }
}

class PlantDescription extends Component {
  
  constructor(props) {
    super();
    this.props = props;
  }

  render() {
    return (
      <div className="plant-description">
        <div className="plan-logo">
          <PlantImage />
        </div>
        <div className="plant-name">
          Hermosos tomatitos cherry.
        </div>
        <small> last read: {this.props.timestamp} </small>
      </div>
    );
  }
}

class Panel extends Component {

  sensorsService = new SensorsService();

  constructor(props) {
    super();
    this.props = props;
    this.state = { data: { light: '', moisture: '', temperature: '', fertility: '' }};
  }
  
  getDate() {
    const date = new Date();
    return date.toLocaleDateString() + ' ' + date.getHours() + ':' + date.getMinutes() 
      + ':' + date.getSeconds();
  }

  componentDidMount() {
    this.dataSensors = this.sensorsService.getData();
    this.dataSensors
      .subscribe((data) => {
        console.log('Panel subscribed ', data);
        this.setState({ data: data, timestamp: this.getDate() });
      });
  }

  componentWillUnmount() {
    this.dataSensors.unsubscribe();
  }


  render() {
    return (
      <div className="content">
        <PlantDescription timestamp={this.state.timestamp} />
        <SensorsGrid data={this.state.data} />
      </div>
    );
  }
}

export default Panel;