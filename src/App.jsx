import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"

export default class App extends React.Component {
    state = {
        character: {},
        characterHomeworld: {}
    }

    componentDidMount() {
        console.log("Component did mount");
        fetch("https://swapi.dev/api/people/1")
            .then(res => {
                if (res.ok) return res.json();
            })
            .then(data => {
                this.setState({ character: data })
            });

        fetch("https://swapi.dev/api/planets/1/")
            .then(res => {
                if (res.ok) return res.json();
            })
            .then(data => {
                this.setState({characterHomeworld: data})
            })
    }

    render() {
        console.log(this.state.characterHomeworld, "characterHomeworld")
        console.log(this.state.character, "character")
        return (
            <main className="container">
                <h1>Character properties</h1>
                {
                    (
                        Object.keys(this.state.character).length > 0 
                        && Object.keys(this.state.characterHomeworld).length > 0
                    )
                    ?
                        <ul>
                            <li>Full name: {this.state.character.name}</li>
                            <li>Weight: {this.state.character.mass}</li>
                            <li>Eye color: {this.state.character.eye_color}</li>
                            <li>Height: {this.state.character.height}</li>
                            <li>Homeworld: {this.state.characterHomeworld.name}</li>
                        </ul>
                    :
                        "Loading..."
                }
                
            </main>
        )
    }
}