import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"

export default class App extends React.Component {
    state = {
        catFact: ""
    }

    componentDidMount() {
        this.getFact()
    }

    getFact = () => {
        fetch("https://catfact.ninja/fact")
            .then(res => {
                if (res.ok) return res.json();
            })
            .then(data => {
                this.setState({
                    catFact: data.fact
                })
            })
    }

    render() {
        return (
            <main className="container">
                <button
                    style={{marginBottom: "25px", display: "block"}}
                    onClick={this.getFact}
                >
                    Get Fact
                </button>
                {this.state.catFact}
            </main>
        )
    }
}