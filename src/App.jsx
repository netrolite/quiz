import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Quiz from "./routes/Quiz";
import StartScreen from "./routes/StartScreen";
import NotFound from "./routes/NotFound";
import "bootstrap/dist/css/bootstrap.min.css"

export default function App() {
    const [formData, setFormData] = useState({
        numberOfQuestions: "10",
        category: "any",
        difficulty: "any",
        type: "any"
    })

    return (
        <main>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <StartScreen
                                setFormData={setFormData}
                                formData={formData}
                            />
                        }
                    />
                    <Route path="/quiz" element={<Quiz formData={formData} />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </main>
    )
}
