import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Quiz from "./Quiz";
import StartScreen from "./StartScreen";
import NotFound from "./NotFound";
import "bootstrap/dist/css/bootstrap.min.css"

export default function App() {
    return (
        <main>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<StartScreen />} />
                    <Route path="/quiz" element={<Quiz />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </main>
    )
}