export const TopRecruitersCard = () => {
  return (
    <div className="card">
      <div className="header">
        {/* company logo */}
        <span className="icon size-14">
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          ></svg>
        </span>

        {/* company name */}
        <p className="alert">Google</p>
      </div>

      <p className="font-bold flex gap-3">
        <span className="text-gray-600 text-xs">New York</span>
        <span className="text-gray-500 text-xs">54 Jobs Open</span>
      </p>
    </div>
  );
};
