import { JobSearchCard } from "../Components/Cards/JobSearchCard";
import { AllJobsSection } from "../Components/JobPage/AllJobsSection";
import { FilterAside } from "../Components/JobPage/FilterAside";
// import Pagination from "../Components/JobPage/Pagination";

export const Jobs = () => {
  return (
    <section className=" mx-auto max-w-screen-xl  dark:text-white">
      {/* Search JOB HEADER  */}
      <JobSearchCard />

      {/* JOBS VIEW CARD */}
      <main className="xl:flex gap-2 pb-10 mb-16">
        {/* FILTER LEFT SIDE */}
        <FilterAside />
        {/* JOBS RIGHT SIDE */}
        <AllJobsSection />
      </main>
      {/* PAGINATION */}
      {/* <Pagination /> */}
    </section>
  );
};
