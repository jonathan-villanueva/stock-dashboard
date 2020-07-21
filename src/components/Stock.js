import React, { Component } from "react"

class Stock extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            ticker: this.props.ticker,
            color: this.props.color
        }
    }

    render() {
        return (
            <div className="StockMain">
                <li key={this.props.key} style={{backgroundColor: this.state.color}}>{this.state.ticker}</li>
            </div>
        )
    }
}

export default Stock