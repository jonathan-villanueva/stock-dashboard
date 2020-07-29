import React, { Component } from "react"

import "./Watchlist.css"

import Stock from "./Stock"

class Watchlist extends Component {
    constructor(props) {
        super(props)
    }
    

    render() {
        var stockEntries = this.props.entries
        var listItems = stockEntries.map((stock) => <Stock color="white" ticker={stock.ticker}/>)

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