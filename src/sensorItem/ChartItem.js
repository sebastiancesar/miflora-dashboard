import React, { Component } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { dataMock } from '../panel/daydata';

const FIELDS_DATA = {
  light: { name: 'lux', color: '#DDDB68' },
  temp: { name: 'temperature', color: '#E56969' },
  moisture: { name: 'moisture', color: '#8EBDDB' },
  fertility: { name: 'fertility', color: '#82641B' }
};

class ChartItem extends Component {

  constructor() {
    super();
    this.getData = this.getData.bind(this);
    this.getField = this.getField.bind(this);
    this.getColor = this.getColor.bind(this);
  }

  getData() {
    return dataMock;
  }

  getField() {
    return FIELDS_DATA[this.props.field].name;
  }

  getColor() {
    return FIELDS_DATA[this.props.field].color;
  }

  render () {
    return (
      <div className="chart-container">
        <AreaChart width={600} height={400} data={this.getData()}
              margin={{top: 10, right: 30, left: 0, bottom: 0}}>
          <CartesianGrid strokeDasharray="1 1"/>
          <XAxis dataKey="date" />
          <YAxis dataKey={this.getField()} />
          <Area type='monotone' dataKey={this.getField()} stroke='#8884d8' fill={this.getColor()} />
        </AreaChart>
      </div>
    );
  };
}

export default ChartItem;