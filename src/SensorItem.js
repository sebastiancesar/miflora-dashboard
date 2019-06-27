import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faWater, faThermometerFull, faPoo } from '@fortawesome/free-solid-svg-icons'

const FIELDS_ICONS = {
  light: faSun,
  moisture: faWater,
  temp: faThermometerFull,
  fertility: faPoo
};

class SensorItemIcon extends Component {
  
  constructor(props) {
    super();
    this.props = props;
  }

  getIcon() {
    return FIELDS_ICONS[this.props.field];
  }

  render() {
    return(
      <FontAwesomeIcon icon={this.getIcon()}/>
    )
  }

}

class SensorItem extends Component {
  
  constructor(props) {
    super();
    this.props = props;
  }

  render() {
    return (
      <div className="sensor-item">
        <div className={`icon ${this.props.field}`}>
          <SensorItemIcon field={this.props.field} />
        </div>
        <div className="label">
          { this.props.field }: 
          <span className="sensor-friendly-status good"> {this.props.data.pretty} </span>
          <div className="sensor-value"> <small> {this.props.data.formatted}</small></div>
        </div>
      </div>
    );
  }
}

export default SensorItem;