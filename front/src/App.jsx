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

// Add new Job
const addJobSubmit = async (newJob) => {
  const res = await fetch("/api/jobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newJob),
  });
  return res;
};

// Delete Job
const deleteJob = async (id) => {
  const res = await fetch(`/api/jobs/${id}`, {
    method: "DELETE",
  });
  return res;
};

// Edit Job
const updateJobSubmit = async (id, updatedJob) => {
  const res = await fetch(`/api/jobs/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedJob),
  });
  console.log(id)
  console.log(updatedJob)
  return res;
};

export const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/:id" element={<ShowJob deleteJob={deleteJob} />} />
          <Route path="/editJob/:id" element={<EditJobPage updateJobSubmit={updateJobSubmit}/>} />
          <Route path="/AddJob" element={<AddJobPage addJobSubmit={addJobSubmit} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </Router>
    </>
  );
};

export default App;
