export const JobSearchCard = () => {
  return (
    <section className=" bg-[url(/images/bg2.jpg)] bg-cover ">
      {/* JOB HEADER || SEARCH */}
      <div className="py-8 flex flex-col gap-4  my-10 rounded-2xl shadow-xl border backdrop-blur-sm">
        {/* content */}
        <div className=" flex flex-col gap-2 max-w-96 mx-auto">
          <h3 className="text-center text-3xl font-semibold">
            <span className="text-blue-700 ">22 Jobs</span> Available Now
          </h3>
          <p className="text-center text-slate-500 text-sm">
            Find your dream job with our powerful job search platform—browse
            thousands of openings and apply with ease!
          </p>
        </div>

        {/* JOB SEARCH */}
        <div className="my-3 w-1/2 p-1 mx-auto rounded-2xl bg-white drop-shadow-lg shadow-black ">
          <form
            action=""
            className="grid grid-cols-4  [&>input]:p-3 [&>*]:outline-none "
          >
            <input type="text" placeholder="Enter something." />
            <input type="text" placeholder="Enter something." />
            <input type="text" placeholder="Enter something..." />
            <div className="grid place-items-center">
              <button className="button-34 ">Search</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
