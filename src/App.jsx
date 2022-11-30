import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"

export default class App extends React.Component {
    render() {
        return (
            <main className="container-xl">
                <div className="row row-cols-sm-2 row-cols-1">
                    <div className="col">
                        <div className="box"></div>
                    </div>
                    <div className="col">
                        <div className="box"></div>
                    </div>
                    <div className="col">
                        <div className="box"></div>
                    </div>
                    <div className="col">
                        <div className="box"></div>
                    </div>
                    <div className="col">
                        <div className="box"></div>
                    </div>
                    <div className="col">
                        <div className="box"></div>
                    </div>
                </div>
            </main>
        )
    }
}