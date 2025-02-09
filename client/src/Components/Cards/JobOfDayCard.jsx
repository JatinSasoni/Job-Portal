const JobOfDayCard = () => {
  return (
    <div className="card">
      <div className="header">
        {/* company logo */}
        <span className="icon">
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          ></svg>
        </span>

        {/* company name */}
        <p className="alert">Google</p>
      </div>

      {/* TITLE AND JOB TYPE */}
      <h4 className="mt-2 font-semibold">Need a soft enginner</h4>
      <div className="flex gap-4 [&>p]:text-xs ">
        <p>Full Time</p>
        <p>4 Min Ago</p>
      </div>

      {/* JOB DESC */}
      <p className="message">
        Need a frontend dev and backend dev with AI knowelede
      </p>

      <p className="font-bold">
        <span className="text-blue-500 text-xl">$5000</span>/Hour
      </p>

      <div className="actions ">
        <a className="read" href="">
          Take a Look
        </a>

        <a className="mark-as-read" href="">
          Save for later
        </a>
      </div>
    </div>
  );
};

export default JobOfDayCard;
