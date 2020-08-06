import React from "react"
import Watchlist from "./Watchlist.js"
import './Adder.css'

class Adder extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            items: []
        }

        this.addItem = this.addItem.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
    }

    addItem(e) {
        if(this._inputElement.value !== "") {
            var newItem = {
                ticker: this._inputElement.value.toUpperCase(),
                key: Date.now(),
                color: "white"
            }

            this.setState((prevState) => {
                return {
                    items: prevState.items.concat(newItem)
                }
            })

            this._inputElement.value = ""
        }

        console.log(this.state.items)

        e.preventDefault()
    }

    handleRemove(ticker) {
        console.log(ticker)
        const newList = this.state.items.filter((item) => item.ticker !== ticker);
        this.setState({
            items: newList
        })
    }


    render() {
        return (
            <div>
                <form onSubmit={this.addItem}>
                    <div className="AdderMain">
                        <h2>Watchlist</h2> 
                        <input type="text" ref={(a) => this._inputElement = a} placeholder="Ticker Symbol"/>
                        <button id="AddButton" type="submit">Add</button>
                    </div>

                    <Watchlist entries={this.state.items} remove={this.handleRemove}/>
                </form>
            </div>
        )
    }
}

export default Adder