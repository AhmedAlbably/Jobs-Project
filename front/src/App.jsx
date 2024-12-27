import "./App.css";
import Navbar from "./components/Navbar";
import NotFound from "./components/pages/NotFound";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import JobsPage from "./components/pages/JobsPage";
import ShowJob from "./components/pages/ShowJob";
import AddJobPage from "./components/pages/AddJobPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditJobPage from "./components/pages/EditJobPage";






export const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/:id" element={<ShowJob />} />
          <Route path="/editJob/:id" element={<EditJobPage />} />
          <Route path="/AddJob" element={<AddJobPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </Router>
    </>
  );
};

export default App;
