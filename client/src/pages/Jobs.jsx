import { JobSearchCard } from "../Components/Cards/JobSearchCard";
import { AllJobsSection } from "../Components/JobPage/AllJobsSection";
import { FilterAside } from "../Components/JobPage/FilterAside";

export const Jobs = () => {
  return (
    <section className="container  mx-auto max-w-screen-xl">
      {/* Search JOB HEADER  */}
      <JobSearchCard />

      {/* JOBS VIEW CARD */}
      <main className="flex gap-2">
        {/* FILTER LEFT SIDE */}
        <FilterAside />
        {/* JOBS RIGHT SIDE */}
        <AllJobsSection />
      </main>
    </section>
  );
};
