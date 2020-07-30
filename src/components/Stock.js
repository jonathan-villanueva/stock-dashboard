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
          60000
        );
        this.tick()
    }

    tick() {
        var api_url = "https://api.tdameritrade.com/v1/marketdata/" + this.state.ticker + "/quotes?apikey=RARVUUUYGVDII7WJVG9GW2JMKXEMCQVA"
        var api_url_prev = "https://api.tdameritrade.com/v1/marketdata/" + this.state.ticker + "/quotes?apikey=RARVUUUYGVDII7WJVG9GW2JMKXEMCQVA"

        fetch(api_url, {
            method: 'get'
          })
          .then(function(body){
            return body.json();
          }).then((data) => this.setState({price: data[this.state.ticker].lastPrice}));

          fetch(api_url_prev, {
            method: 'get'
          })
          .then(function(body){
            return body.json();
          }).then((data) => this.setState({prev_price: data[this.state.ticker].closePrice}, () => {
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
          ));


        console.log(this.state.color);

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