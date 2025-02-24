import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "motion/react";

export const About = () => {
  const { loggedInUser } = useSelector((store) => store.auth);
  return (
    <>
      <main>
        <section className="max-w-7xl mx-auto my-8">
          <div className=" grid grid-cols-2">
            <div className=" p-4 flex flex-col gap-3">
              <motion.p
                initial={{
                  y: 100,
                }}
                animate={{
                  y: 0,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="text-3xl dark:text-white "
              >
                Welcome{" "}
                <span className="text-blue-900 font-bold inline-block dark:text-blue-200 ">
                  {loggedInUser && loggedInUser?.username}
                </span>{" "}
                to our website
              </motion.p>

              <motion.h1
                initial={{
                  y: 100,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                transition={{
                  duration: 0.9,
                  type: "spring",
                }}
                className="text-6xl font-bold dark:text-white "
              >
                Why Choose Us?{" "}
              </motion.h1>
              <p className="text-xl text-slate-600 leading-6  ">
                Expertise: Our team consists of experienced IT professionals who
                are passionate about staying up-to-date with the latest industry
                trends.
              </p>
              <p className="text-xl text-slate-600 leading-6 ">
                Customization: We understand that every business is unique.
                Thats why we create solutions that are tailored to your specific
                needs and goals.
              </p>
              <p className="text-xl text-slate-600 leading-6 ">
                Customer-Centric Approach: We prioritize your satisfaction and
                provide top-notch support to address your IT concerns.
              </p>
              <p className="text-xl text-slate-600 leading-6 ">
                Affordability: We offer competitive pricing without compromising
                on the quality of our services.
              </p>
              <p className="text-xl text-slate-600 leading-6 ">
                Reliability: Count on us to be there when you need us. We are
                committed to ensuring your IT environment is reliable and
                available 24/7.
              </p>
              <div>
                <NavLink to="/browse">
                  <button className="w-full p-2 rounded-md bg-blue-500 text-white">
                    Search now
                  </button>
                </NavLink>
              </div>
            </div>
            <div className="grid place-items-center">
              <img src="/images/webdev.png" alt="coding buddies " width="550" />
            </div>
          </div>
        </section>
      </main>

      {/* <Analytics /> */}
    </>
  );
};
