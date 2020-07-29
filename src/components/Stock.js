import React, { Component } from "react"

import './Stock.css';

class Stock extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            ticker: this.props.ticker,
            color: this.props.color,
            price: 0,
            prev_price: 0
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
        var api_url_prev = "https://cloud.iexapis.com/stable/stock/" + this.state.ticker + "/previous?token=pk_da183058d14d4805bf7614f9da7fe0ba"
        fetch(api_url, {
            method: 'get'
          })
          .then(function(body){
            return body.text();
          }).then((data) => this.setState({price: data}));

          fetch(api_url_prev, {
            method: 'get'
          })
          .then(function(body){
            return body.json();
          }).then((data) => this.setState({prev_price: data.close}));

        if(this.state.price > this.state.prev_price) {
            this.setState({color: "green"})
        } else
        if(this.state.price === this.state.prev_price) {
            this.setState({color: "black"})
        } else
        if(this.state.price < this.state.prev_price) {
            this.setState({color: "red"})
        }

    }

    render() {
        return (
            <div className="StockMain">
                <li className="StockContainer" key={this.props.key} style={{color: this.state.color}}>{this.state.ticker} <p className="price">{this.state.price}</p> </li>
            </div>
        )
    }
}

export default Stock