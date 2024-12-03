import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importing routing components
import Header from './components/header';
import Footer from './components/footer';
import FlipCard from './components/flipcard'; // Import FlipCard component
import Home from './components/home'; // Import FlipCard component
import Login from './components/login'; // Import FlipCard component
import StartQuiz from './components/startquiz'; // Import FlipCard component
import Quiz from './components/quiz'; // Import FlipCard component
import Register from './components/register'; // Import FlipCard component
import './components/style.css'; // Import CSS for HomePage design
import useToken from './useToken';



const App = () => {

  const { token, setToken } = useToken();


  return (
    <Router>
      <div>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/flipcard" element={<FlipCard />} />
            <Route path="/startquiz" element={<StartQuiz />} />
            <Route path="/quiz/:set_id" element={<Quiz />} />
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
