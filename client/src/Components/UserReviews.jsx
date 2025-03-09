import { useEffect, useState } from "react";
import { handleGetAllContactsAPI } from "../../Api/getAPI";
import { toast } from "react-toastify";
import { motion } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import SpotlightCard from "./ReactBits/SpotlightCard";

/* eslint-disable react/prop-types */
export const UserReviews = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getContacts = async () => {
      try {
        const response = await handleGetAllContactsAPI();
        if (response.data.SUCCESS) {
          setMessages(response.data.allContacts);
        }
      } catch (error) {
        toast.error(error.response.data.MESSAGE);
      }
    };

    getContacts();
  }, []);

  return (
    <>
      <section>
        <motion.div
          initial={{ opacity: 0, y: 150 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "tween" }}
          className="mt-20"
        >
          <div>
            <div className="mx-auto ">
              {/* TITLE HERE LATER  */}
              {/* CONTENT META */}
              <p className="text-xl text-center text-zinc-700 font-semibold dark:text-slate-400">
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
                    slidesPerView={4}
                    spaceBetween={10}
                    loop={messages?.length > 4} // Enable loop only if enough slides
                    autoplay={{ delay: 2000 }}
                    modules={[Autoplay]}
                  >
                    {messages.map((msg) => (
                      <SwiperSlide key={msg?._id}>
                        <SpotlightCard
                          className="custom-spotlight-card "
                          // spotlightColor="gray"
                        >
                          <div className="h-32 ">
                            <div className="flex gap-3">
                              {/* PFP */}
                              <div>
                                <img
                                  src={msg?.userID?.profile?.profilePhoto}
                                  alt={msg?.userID?.username}
                                  className="size-10 rounded-full mx-auto "
                                />
                              </div>
                              {/* USERNAME */}
                              <div className="grid place-items-center ">
                                <p className="text-md font-semibold dark:text-white  ">
                                  ~ {msg?.userID?.username}
                                </p>
                              </div>
                            </div>

                            <div className="h-2/3 overflow-auto ">
                              <p className=" text-gray-800 dark:text-gray-300 text-sm text-start pl-4 mt-2 break-words ">
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
