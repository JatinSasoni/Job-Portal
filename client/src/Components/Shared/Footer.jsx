import { Link } from "react-router-dom";
import { motion } from "motion/react";
import FooterNavItems from "./Footer Components/FooterNavItems";

export const Footer = () => {
  return (
    <>
      <footer className=" dark:bg-zinc-900 m-2 ">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8 max-sm:pt-8 ">
          <div className="sm:flex sm:items-center sm:justify-between">
            <Link
              href="https://flowbite.com/"
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse max-sm:justify-center"
            >
              <img
                src="/Logo/newlogodark.png"
                className="size-10 md:size-16 bg-black  rounded-full"
                alt="Flowbite Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                TalentNest
              </span>
            </Link>

            <FooterNavItems />
          </div>

          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <motion.p
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="block text-xs text-gray-500 text-center dark:text-gray-400"
          >
            © 2023{" "}
            <Link href="https://flowbite.com/" className="hover:underline">
              Jatin@8084™
            </Link>
            . All Rights Reserved.
          </motion.p>
        </div>
      </footer>
    </>
  );
};
