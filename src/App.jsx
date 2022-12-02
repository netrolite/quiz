import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"

export default class App extends React.Component {
    state = {
        catFact: ""
    }

    componentDidMount() {
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
            <main>
                {this.state.catFact}
            </main>
        )
    }
}