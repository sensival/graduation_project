// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SelectWard from './components/Ward';
import ExternalRedirect from './components/ExternalRedirect';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<SelectWard />} />
          <Route path="/select-ward" element={<SelectWard />} />

          {/* Django 서버의 로그인/회원가입 페이지로 리디렉트 */}
          <Route path="/login" element={<ExternalRedirect url="http://localhost:8000/gallery/login/" />} />
          <Route path="/signup" element={<ExternalRedirect url="http://localhost:8000/gallery/signup/" />} />
        </Routes>
      </div>
    </Router>
  );
}

//<Route path="/login" element={<Login />} />
//<Route path="/signup" element={<SignUp />} />
export default App;
