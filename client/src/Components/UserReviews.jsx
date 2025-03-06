import { useEffect, useState } from "react";
import { handleGetAllContactsAPI } from "../../Api/getAPI";
import { toast } from "react-toastify";
import { motion } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

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
          className="container  mt-20"
        >
          <div>
            <div className="mx-auto ">
              {/* TITLE HERE LATER  */}
              {/* CONTENT META */}
              <p className="text-xl text-center text-blue-950 font-semibold dark:text-slate-500">
                Here's What Our Users Say About Us
              </p>

              <div className="my-10 text-center">
                <h2 className="text-3xl font-bold mb-6"></h2>

                {!messages ? (
                  <div className="grid place-items-center">
                    <div className="loader"></div>
                  </div>
                ) : (
                  <Swiper
                    slidesPerView={3}
                    spaceBetween={20}
                    loop={messages.length > 3} // Enable loop only if enough slides
                    autoplay={{ delay: 2000 }}
                    modules={[Autoplay]}
                  >
                    {messages.map((msg) => (
                      <SwiperSlide key={msg._id}>
                        <div className="p-3 bg-blue-100 rounded-lg  break-words h-44 overflow-auto dark:bg-zinc-800 dark:text-white">
                          <img
                            src={msg.userID.profile.profilePhoto}
                            alt={msg.userID.username}
                            className="w-16 h-16 rounded-full mx-auto mb-3"
                          />
                          <p className="text-lg font-semibold dark:text-white">
                            {msg.userID.username}
                          </p>
                          <p className="mt-2 text-gray-800 dark:text-white">
                            "{msg.message}"
                          </p>
                        </div>
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
