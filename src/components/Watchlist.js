import React, { Component } from "react"

import "./Watchlist.css"

import Stock from "./Stock"
import ErrorHandler from "./ErrorHandler.js"

class Watchlist extends Component {
    constructor(props) {
        super(props)
    }
    

    render() {
        var stockEntries = this.props.entries
        var listItems = stockEntries.map(
        (stock) => 
        <ErrorHandler>
            <Stock color="black" ticker={stock.ticker}/>
        </ErrorHandler>)

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