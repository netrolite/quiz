import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            firstName: "John",
            lastName: "Doe",
            phone: "+1-(719)-555-12-12",
            email: "gofuckyourself@gmail.com",
            isStarred: false
        }
        this.toggleStar = this.toggleStar.bind(this);
    }

    toggleStar() {this.setState(prevState => ({isStarred: !prevState.isStarred}))}

    render() {
        return (
            <main>
                <article className="card">
                    <div className="card--info">
                        <button onClick={this.toggleStar}>{this.state.isStarred ? "Starred" : "Star"}</button>
                        <h2 className="card--name">
                            {this.state.firstName} {this.state.lastName}
                        </h2>
                        <p className="card--contact">{this.state.phone}</p>
                        <p className="card--contact">{this.state.email}</p>
                    </div>
                </article>
            </main>
        )
    }
}