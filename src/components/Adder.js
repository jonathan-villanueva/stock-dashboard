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
    }

    addItem(e) {
        if(this._inputElement.value !== "") {
            var newItem = {
                ticker: this._inputElement.value,
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


    render() {
        return (
            <div className="AdderMain">
                <form onSubmit={this.addItem}>
                    <h2>Watchlist</h2> 
                    <input type="text" ref={(a) => this._inputElement = a} placeholder="Ticker (ex. FRSX)"/>
                    <button type="submit">Add</button>

                    <Watchlist entries={this.state.items} />
                </form>
            </div>
        )
    }
}

export default Adder