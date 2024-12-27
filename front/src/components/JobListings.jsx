import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import JobListing from "./JobListing";
import axios from "axios";
const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiUrl = isHome
    ? "https://jobs-project-rho.vercel.app//jobs?_limit=3"
    : "https://jobs-project-rho.vercel.app//jobs";
  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        setJobs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [apiUrl]);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? "Featured Jobs" : "All Jobs"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            <Spinner loading={loading} />
          ) : (
            jobs.map((job) => <JobListing key={job._id} job={job} />)
          )}
        </div>
      </div>
    </section>
  );
};

export default JobListings;
