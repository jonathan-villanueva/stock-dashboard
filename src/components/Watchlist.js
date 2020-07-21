import React, { Component } from "react"

import "./Watchlist.css"

import Stock from "./Stock"

class Watchlist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            color: "white"
        }
    }
    

    render() {
        var stockEntries = this.props.entries
        var listItems = stockEntries.map((stock) => <Stock color={this.state.color} ticker={stock.ticker}/>)

        return (
            <div className="WatchlistMain">
                <ul className="theStocks">
                    <div className="tickers">
                        {listItems}
                    </div>
                </ul>

                <button>Update</button>
            </div>
        );
    }
}

export default Watchlist