import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'
import React, {useState} from 'react';

function App() {
  let apiKey = process.env.REACT_APP_NEWS_API
  const [progress, setProgress] = useState(0);

  const setLoadingstate = (progress) => {
    setProgress(progress);  // Simply update the progress
  }
  

  return (
    <>
      
      <Router>
      <Navbar/>
      <LoadingBar
      height={3}
        color='#f11946'
        progress={progress}
      />
      <Routes>
        <Route exact path="/" element={<News setLoadingstate = {setLoadingstate} apiKey = {apiKey} key={"general"} pageSize={6} country={"us"} category={"general"}/>} />
        <Route exact path="/business" element={<News setLoadingstate = {setLoadingstate}  apiKey = {apiKey} key={"business"} pageSize={6} country={"us"} category={"business"}/>} />
        <Route exact path="/entertainment" element={<News setLoadingstate = {setLoadingstate}  apiKey = {apiKey} key={"entertainment"} pageSize={6} country={"us"} category={"entertainment"}/>} />
        <Route exact path="/general" element={<News setLoadingstate = {setLoadingstate}  apiKey = {apiKey} key={"general"} pageSize={6} country={"us"} category={"general"}/>} />
        <Route exact path="/health" element={<News setLoadingstate = {setLoadingstate}  apiKey = {apiKey} key={"health"} pageSize={6} country={"us"} category={"health"}/>} />
        <Route exact path="/science" element={<News setLoadingstate = {setLoadingstate}  apiKey = {apiKey} key={"science"} pageSize={6} country={"us"} category={"science"}/>} />
        <Route exact path="/sports" element={<News setLoadingstate = {setLoadingstate}  apiKey = {apiKey} key={"sports"} pageSize={6} country={"us"} category={"sports"}/>} />
        <Route exact path="/technology" element={<News setLoadingstate = {setLoadingstate}  apiKey = {apiKey} key={"technology"} pageSize={6} country={"us"} category={"technology"}/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
