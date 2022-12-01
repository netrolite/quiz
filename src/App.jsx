import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"

export default class App extends React.Component {
    state = {
        counter: 0
    }

    add = () => {
        this.setState(prevState => (
            {
                ...prevState,
                counter: prevState.counter + 1
            }
        ))
    }

    subtract = () => {
        this.setState(prevState => (
            {
                ...prevState,
                counter: prevState.counter - 1
            }
        ))
    }
    
    render() {
        return (
            <>
                <h1>Go fuck yourself</h1>
                <h1>Ass</h1>
                <main>
                    <button onClick={this.subtract}>Subtract</button>
                    <button onClick={this.add}>Add</button>
                    <div>{this.state.counter}</div>
                </main>
            </>
        )
    }
}