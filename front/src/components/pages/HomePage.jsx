import Hero from "../Hero";
import HomeCards from "../HomeCards";
import JobListings from "../JobListings";
import ViewAllJobs from "../ViewAllJobs";

const HomePage = () => {
  return (
    <>
      <Hero
        title="Become A React Dev"
        subtitle="Find The React Job That Fits Your Skills"
      />
      <HomeCards />
      <JobListings isHome={true} />
      <ViewAllJobs />
    </>
  );
};

export default HomePage;
