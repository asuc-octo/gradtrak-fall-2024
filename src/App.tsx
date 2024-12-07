import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SetUpPage from "./components/SetUpPage"
import AddDegree from "./components/AddDegree/AddDegree";
import SemesterHome from './app/Onboarding/SemesterHome/SemesterHome';
import Header from "./components/Header/header";

function App() {
  return (
    <>
      {/* <Header /> */}
      <Router>
        <Routes>
          <Route path="/" element={<SetUpPage />} />
          <Route path="/add-major" element={<AddDegree isMajor={true}/>} />
          <Route path="/add-minor" element={<AddDegree isMajor={false}/>} />
          <Route path="/next" element={<SemesterHome />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
