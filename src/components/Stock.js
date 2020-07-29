import React, { Component } from "react"

import './Stock.css';

class Stock extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            ticker: this.props.ticker,
            color: this.props.color,
            price: 0
        }

        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
          1000
        );
    }

    tick() {
        var api_url = "https://cloud.iexapis.com/stable/stock/" + this.state.ticker + "/quote/latestPrice?token=pk_da183058d14d4805bf7614f9da7fe0ba"
        fetch(api_url, {
            method: 'get'
          })
          .then(function(body){
            return body.text(); // <--- THIS PART WAS MISSING
          }).then((data) => this.setState({price: data}));
    }

    render() {
        return (
            <div className="StockMain">
                <li key={this.props.key} style={{backgroundColor: this.state.color}}>{this.state.ticker} <p className="price">{this.state.price}</p> </li>
            </div>
        )
    }
}

export default Stock