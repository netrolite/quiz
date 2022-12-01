import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"

export default class App extends React.Component {
    render() {
        return (
            <>
                <h1>{this.props.string}</h1>
                <h1>{this.props.bool.toString()}</h1>
            </>
        )
    }
}