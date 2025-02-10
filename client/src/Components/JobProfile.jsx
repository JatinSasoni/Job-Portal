export const JobProfile = () => {
  const alreadyApplied = false;
  return (
    <>
      <section className="mx-auto max-w-7xl my-4 p-6">
        {/* NAME AND APPLY BUTTON */}
        <div className="flex justify-between ">
          <h1 className="text-3xl font-bold">Frontend Developer</h1>
          <button
            className={`${alreadyApplied ? "button-1" : "button-34"}`}
            disabled={alreadyApplied}
          >
            {alreadyApplied ? "Already applied" : "Apply now"}
          </button>
        </div>
        {/* positions and all */}
        <div className=" p-2 flex gap-3">
          <span className="p-2 border bg-blue-50 rounded-3xl text-blue-800">
            12 Positions
          </span>
          <span className="p-2 border bg-blue-50 rounded-3xl text-red-600">
            Full time
          </span>
          <span className="p-2 border bg-blue-50 rounded-3xl text-purple-500">
            21LPA
          </span>
        </div>

        {/* JOB DESCRIPTION */}
        <div>
          <h2 className="text-xl border-b-2 py-3">Job Description</h2>

          <div className="flex flex-col gap-2">
            <div>
              <span className="text-xl font-semibold">Role </span>
              Frontend Developer
            </div>
            <div>
              <span className="text-xl font-semibold">Location </span>
              Mohali
            </div>
            <div>
              <span className="text-xl font-semibold">Description </span>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Incidunt, iusto.
            </div>
            <div>
              <span className="text-xl font-semibold">Experience </span>2 Years
            </div>
            <div>
              <span className="text-xl font-semibold">Salary </span>
              24LPA
            </div>
            <div>
              <span className="text-xl font-semibold">Total Applicants </span>4
            </div>
            <div>
              <span className="text-xl font-semibold">Posted Date </span>
              17-03-2010
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
