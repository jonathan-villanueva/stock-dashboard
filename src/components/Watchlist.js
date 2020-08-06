import React, { Component } from "react"

import "./Watchlist.css"

import Stock from "./Stock"
import ErrorHandler from "./ErrorHandler.js"

class Watchlist extends Component {

    constructor(props) {
        super(props)

        this.state = {
            ws: null
        }
    }

    sendMessage(data) {
        const {websocket} = this.state.ws // websocket instance passed as props to the child component.
  
        try {
            websocket.send(data) //send data to the server
            console.log("sent: " + data)
        } catch (error) {
            console.log(error) // catch error
        }
      }

    componentDidMount() {
        this.connect()
    }

    timeout = 250

    /**
     * @function connect
     * This function establishes the connect with the websocket and also ensures constant reconnection if connection closes
     */
    connect = () => {
        var ws = new WebSocket("wss://socket.polygon.io/stocks");
        let that = this; // cache the this
        var connectInterval;

        // websocket onopen event listener
        ws.onopen = () => {
            console.log("connected websocket main component");

            this.setState({ ws: ws });

            that.timeout = 250; // reset timer to 250 on open of websocket connection 
            clearTimeout(connectInterval); // clear Interval on on open of websocket connection

            var auth_msg = {
                action: "auth",
                params: "AKSGW7MVZZCXBZ7U4OKS"
            }
            ws.send(JSON.stringify(auth_msg))
            console.log("websocket authenticated")
        };

        // websocket onclose event listener
        ws.onclose = e => {
            console.log(
                `Socket is closed. Reconnect will be attempted in ${Math.min(
                    10000 / 1000,
                    (that.timeout + that.timeout) / 1000
                )} second.`,
                e.reason
            );

            that.timeout = that.timeout + that.timeout; //increment retry interval
            connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); //call check function after timeout
        };

        // websocket onerror event listener
        ws.onerror = err => {
            console.error(
                "Socket encountered error: ",
                err.message,
                "Closing socket"
            );

            ws.close();
        };

        ws.onmessage = evt => {
            // listen to data sent from the websocket server
            const message = JSON.parse(evt.data)
            this.setState({dataFromServer: message})
            console.log(message)
        }
    };

    /**
     * utilited by the @function connect to check if the connection is close, if so attempts to reconnect
     */
    check = () => {
        const { ws } = this.state;
        if (!ws || ws.readyState == WebSocket.CLOSED) this.connect(); //check if websocket instance is closed, if so call `connect` function.
    };

    render() {
        var stockEntries = this.props.entries
        var listItems = stockEntries.map(
        (stock) => 
            <div>
                <Stock key={stock.ticker} color="black" ticker={stock.ticker} websocket={this.ws} remove={this.props.remove}/>
            </div>
        )

        return (
            <div className="WatchlistMain">
                <ul className="theStocks">
                    <div className="tickers">        
                        {listItems}
                    </div>
                </ul>
            </div>
        );
    }
}

export default Watchlist