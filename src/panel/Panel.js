import React, { Component } from "react";
import plantImage from './cherry.jpg';
import './Panel.css';
import SensorsGrid from './SensorsGrid';

class PlantImage extends Component {
  render() {
    return (
      <img src={plantImage} className="plant-img" alt="plant" />
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
        <div className="">
          <PlantImage />
        </div>
        <div className="plant-name">
          Hermosos tomatitos cherry.
        </div>
      </div>
    );
  }
}

class Panel extends Component {
  
  constructor(props) {
    super();
    this.props = props;
  }
  
  render() {
    return (
      <div className="content">
        <PlantDescription />
        <SensorsGrid />
      </div>
    );
  }
}

export default Panel;