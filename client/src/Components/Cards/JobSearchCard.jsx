import { SearchBox } from "../SearchBox";

export const JobSearchCard = () => {
  return (
    <section className="">
      {/* JOB HEADER || SEARCH */}
      <div className="py-8 flex flex-col gap-4 my-10 rounded-2xl shadow-xl bg-slate-50  ">
        {/* content */}
        <div className=" flex flex-col gap-2 max-w-96 mx-auto">
          <h3 className="text-center text-3xl font-extrabold">
            <span className="text-blue-700 ">22 Jobs</span> Available Now
          </h3>
          <p className="text-center text-slate-900 text-sm">
            Find your dream job with our powerful job search platform—browse
            thousands of openings and apply with ease!
          </p>
        </div>

        {/* JOB SEARCH */}
        <div className="w-1/2 mx-auto">
          <SearchBox />
        </div>
      </div>
    </section>
  );
};
