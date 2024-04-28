import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Module from "./pages/Module";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NewModule from "./pages/NewModule";
import EditModule from "./pages/EditModule";
import Logged from "./components/Logged";
import Professor from "./components/Professor";
import Quizzes from "./pages/Quizzes";
import NewQuiz from "./pages/NewQuiz";
import Quiz from "./pages/Quiz";
import EditQuiz from "./pages/EditQuiz";
import QuizResults from "./pages/QuizResults";

function App() {
    document.documentElement.classList = "dark";

    return (
        <Router>
            <Routes>
                <Route
                    path="/Signup"
                    element={<Signup />}
                />
                <Route
                    path="/Login"
                    element={<Login />}
                />
                <Route element={<Logged />}>
                    <Route
                        path="/"
                        element={<Home />}
                    />
                    <Route
                        path="/Modules/:id"
                        element={<Module />}
                    />
                    <Route
                        path="/Quizzes"
                        element={<Quizzes />}
                    />

                    <Route
                        path="/Quizzes/:id?/:responses"
                        element={<Quiz />}
                    />

                    <Route
                        path="/QuizResults/:id/:responses"
                        element={<QuizResults />}
                    />

                    <Route element={<Professor />}>
                        <Route
                            path="/NewModule"
                            element={<NewModule />}
                        />
                        <Route
                            path="/EditModule/:id"
                            element={<EditModule />}
                        />
                        <Route
                            path="/NewQuiz"
                            element={<NewQuiz />}
                        />
                        <Route
                            path="/EditQuiz/:id"
                            element={<EditQuiz />}
                        />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
