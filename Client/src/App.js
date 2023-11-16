import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './components/homepage/homepage';
import Login from './components/input/login'; 
import Dashboard from './components/dashboard/dashboard'; 
import Signup from './components/input/signup';
import FeedbackForm from './components/Feedback/FeedbackForm';


function App() {
  return (
    <BrowserRouter>
      <div className='main'>
       

        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard/feedback" element={<FeedbackForm/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
