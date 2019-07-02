import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faWater, faThermometerFull, faPoo, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import './SensorItem.css';
import ChartItem from './ChartItem';

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
      <i className={this.props.field}>
        <FontAwesomeIcon icon={this.getIcon()}/>
      </i> 
    )
  }

}

class ItemToggleChart extends Component {

  render() {
    return (
      <div onClick={this.props.toggleAction}>
        { this.props.showChart ? 
          (<FontAwesomeIcon icon={faMinus} />)
          : (<FontAwesomeIcon icon={faPlus} />)
        }
      </div>
    );
  }

}

class SensorItem extends Component {
  
  constructor(props) {
    super();
    this.toggleChart = this.toggleChart.bind(this);
    this.props = props;
    this.state = { showChart: false };
  }

  toggleChart() {
    this.setState( state => { return { showChart: !state.showChart }; } );
  }

  render() {
    return (
      <div className="sensor-item">
        <div className="sensor-realtime">
          <div className="icon">
            <SensorItemIcon field={this.props.field} />
          </div>
          <div className="sensor-label">
            { this.props.field }: &nbsp;
            <span className="sensor-friendly-status good"> 
              {this.props.data.pretty} 
            </span>
            <div className="sensor-value"> 
              <small> {this.props.data.formatted} </small>
            </div>
          </div>
          <div className="sensor-action">
            <ItemToggleChart showChart={this.state.showChart} toggleAction={this.toggleChart} />
          </div>
        </div>
        <div className="sensor-chart">
          { this.state.showChart ?
            <ChartItem field={this.props.field} />
            : null 
          }
        </div>
      </div>
    );
  }
}

export default SensorItem;