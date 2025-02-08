import { TopRecruitersCard } from "./Cards/TopRecruitersCard";

/* eslint-disable react/prop-types */
export const TopRecruiters = ({ trustedCompanies }) => {
  return (
    <section>
      <div className="container mx-auto max-w-screen-xl mt-20">
        <div>
          <div className=" container max-w-screen-xl mx-auto flex flex-col gap-6">
            {/* TITLE */}
            <h2 className="text-5xl text-blue-950 text-center font-semibold">
              Top Recruiters
            </h2>

            <p className="text-center text-slate-600 font-semibold">
              Discover your next career move, freelance gig, or internship
            </p>

            {/* JOB GRIDS */}
            <div className="grid grid-cols-5  p-6 gap-y-4 place-items-center">
              {trustedCompanies.map((card, index) => {
                return <TopRecruitersCard key={index} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
