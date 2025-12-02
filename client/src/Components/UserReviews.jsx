import { useEffect, useState } from "react";
import { handleGetAllContactsAPI } from "../../Api/getAPI";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import SpotlightCard from "./ReactBits/SpotlightCard";
import { SWIPER_SLIDES, SWIPER_SPACE_BETWEEN } from "../../util/Constants";

/* eslint-disable react/prop-types */
export const UserReviews = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getContacts = async () => {
      try {
        const response = await handleGetAllContactsAPI();
        if (response.data.SUCCESS) {
          setMessages(response.data.allContacts);
        }
      } catch (error) {
        toast.error(error.response.data.MESSAGE);
      } finally {
        setLoading(false);
      }
    };

    getContacts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <>
      <section>
        <motion.div
          initial={{ opacity: 0, translateY: 50 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.7, type: "tween" }}
          className=" mask-gradient"
        >
          <div>
            <div className="mx-auto ">
              {/* TITLE HERE LATER  */}
              {/* CONTENT META */}
              <p className="md:text-xl text-center text-zinc-700 font-semibold dark:text-slate-400">
                Here's What Our Users Say About Us
              </p>

              <div className="my-10 text-center">
                <h2 className="text-3xl font-bold mb-6"></h2>

                {!messages?.length ? (
                  <div className="grid place-items-center">
                    <div className="loader"></div>
                  </div>
                ) : (
                  <Swiper
                    slidesPerView={SWIPER_SLIDES}
                    spaceBetween={SWIPER_SPACE_BETWEEN}
                    loop={messages?.length > SWIPER_SLIDES} // Enable loop only if enough slides
                    autoplay={{ delay: 2000 }}
                    modules={[Autoplay]}
                    breakpoints={{
                      0: { slidesPerView: 1, autoplay: { delay: 2000 } }, // 1 slide on mobile
                      640: { slidesPerView: 2, autoplay: { delay: 1500 } }, // 2 slides on small screens (optional)
                      1024: { slidesPerView: 3, autoplay: { delay: 2000 } }, // 3 slides on large screens
                      1280: { slidesPerView: 4 }, // 4 slides on Xl screens
                    }}
                  >
                    {messages.map((msg) => (
                      <SwiperSlide key={msg?._id}>
                        <SpotlightCard className="custom-spotlight-card ">
                          <div className="h-36 p-4 flex flex-col gap-3 bg-white dark:bg-gray-800 rounded-lg  shadow-lg">
                            {/* Top Section: User Info and Timestamp */}
                            <div className="flex justify-between items-start">
                              {/* User Info */}
                              <div className="flex items-center gap-3">
                                {/* Profile Photo */}
                                <div>
                                  <img
                                    src={msg?.userID?.profile?.profilePhoto}
                                    alt={msg?.userID?.username}
                                    className="size-12 rounded-full border-2 border-purple-500"
                                  />
                                </div>
                                {/* Username */}
                                <div>
                                  <p className="text-md font-semibold text-gray-800 dark:text-white">
                                    ~ {msg?.userID?.username}
                                  </p>
                                </div>
                              </div>

                              {/* Timestamp */}
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {new Date(msg?.createdAt).toLocaleDateString()}
                              </p>
                            </div>

                            {/* Message Section */}
                            <div className="flex-1 overflow-y-auto">
                              <p className="text-gray-600 dark:text-gray-300 text-sm text-start break-words">
                                {msg?.message}
                              </p>
                            </div>
                          </div>
                        </SpotlightCard>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
};
