export const FilterAside = () => {
  return (
    <aside>
      <section className="flex flex-col gap-8">
        {/* heading */}
        <div className="w-52">
          <div className="flex justify-between py-4 px-2 border-b-2">
            <p className="text-gray-500">Advance Filter</p>

            <p>Reset</p>
          </div>
        </div>

        {/* INDUSTRY */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-xl">Industry</h3>
          <div>
            <form action="" className="flex flex-col gap-3">
              <div className="grid grid-cols-2 ">
                <label htmlFor="">All</label>
                <input type="checkbox" />
              </div>

              <div className="grid grid-cols-2 ">
                <label htmlFor="">Software</label>
                <input type="checkbox" className="bg-black " />
              </div>

              <div className="grid grid-cols-2 ">
                <label htmlFor="">Finance</label>
                <input type="checkbox" />
              </div>

              <div className="grid grid-cols-2 ">
                <label htmlFor="">Recruiting</label>
                <input type="checkbox" />
              </div>

              <div className="grid grid-cols-2 ">
                <label htmlFor="">Management</label>
                <input type="checkbox" />
              </div>

              <div className="grid grid-cols-2 ">
                <label htmlFor="">Advertisement</label>
                <input type="checkbox" />
              </div>
            </form>
          </div>
        </div>
        {/* SALARY RANGE */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-xl">Salary Range</h3>
          <div>
            <form action="" className="flex flex-col gap-3">
              <div className="grid grid-cols-2 ">
                <label htmlFor="">All</label>
                <input type="checkbox" />
              </div>

              <div className="grid grid-cols-2 ">
                <label htmlFor="">$0-$20</label>
                <input type="checkbox" />
              </div>

              <div className="grid grid-cols-2 ">
                <label htmlFor="">$0-$20</label>
                <input type="checkbox" />
              </div>

              <div className="grid grid-cols-2 ">
                <label htmlFor="">$0-$20</label>
                <input type="checkbox" />
              </div>

              <div className="grid grid-cols-2 ">
                <label htmlFor="">$0-$20</label>
                <input type="checkbox" />
              </div>

              <div className="grid grid-cols-2 ">
                <label htmlFor="">$0-$20</label>
                <input type="checkbox" />
              </div>
            </form>
          </div>
        </div>
        {/* POPULAR KEYWORD*/}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-xl">Popular keyword</h3>
          <div>
            <form action="" className="flex flex-col gap-3">
              <div className="grid grid-cols-2 ">
                <label htmlFor="">Software</label>
                <input type="checkbox" />
              </div>

              <div className="grid grid-cols-2 ">
                <label htmlFor="">Developer</label>
                <input type="checkbox" />
              </div>

              <div className="grid grid-cols-2 ">
                <label htmlFor="">Web</label>
                <input type="checkbox" />
              </div>
            </form>
          </div>
        </div>
        {/* JOB TYPE */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-xl">Job Type</h3>
          <div>
            <form action="" className="flex flex-col gap-3">
              <div className="grid grid-cols-2 ">
                <label htmlFor="">Full time</label>
                <input type="checkbox" />
              </div>

              <div className="grid grid-cols-2 ">
                <label htmlFor="">Part time</label>
                <input type="checkbox" />
              </div>

              <div className="grid grid-cols-2 ">
                <label htmlFor="">Remote job</label>
                <input type="checkbox" />
              </div>

              <div className="grid grid-cols-2 ">
                <label htmlFor="">Freelancer</label>
                <input type="checkbox" />
              </div>
            </form>
          </div>
        </div>
      </section>
    </aside>
  );
};
