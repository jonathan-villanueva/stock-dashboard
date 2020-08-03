import React, { Component } from "react"

import './Stock.css';
import ErrorHandler from "./ErrorHandler"


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


    sendMessage=(data)=>{
      const {websocket} = this.props // websocket instance passed as props to the child component.

      try {
          websocket.send(data) //send data to the server
      } catch (error) {
          console.log(error) // catch error
      }
    }


    tick() {
        var api_url = "https://api.tdameritrade.com/v1/marketdata/" + this.state.ticker + "/quotes?apikey=RARVUUUYGVDII7WJVG9GW2JMKXEMCQVA"
        var api_url_prev = "https://api.tdameritrade.com/v1/marketdata/" + this.state.ticker + "/quotes?apikey=RARVUUUYGVDII7WJVG9GW2JMKXEMCQVA"

        fetch(api_url, {
            method: 'get'
          })
          .then(function(body){
            return body.json();
          }).then((data) => this.setState(
            {price: data[this.state.ticker].lastPrice
            }
            )
          ).catch(err => console.log(err))

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
          )
          ).catch(err => console.log(err))
    }

    render() {
        return (
            <div className="StockMain">
              <ErrorHandler>
                <li className="StockContainer" key={this.props.key} style={{color: this.state.color}}>{this.state.ticker} <p className="price">{this.state.price}</p> </li>
              </ErrorHandler>
            </div>
        )
    }
}

export default Stock