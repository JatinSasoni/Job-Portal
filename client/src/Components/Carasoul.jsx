import { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const browseByCarItems = [
  {
    list: "Software engineer",
  },
  {
    list: "Software engineer",
  },
  {
    list: "Software engineer",
  },
  {
    list: "Software engineer",
  },
  {
    list: "Software engineer",
  },
  {
    list: "Software engineer",
  },
];

export class Carasoul extends Component {
  render() {
    return (
      <>
        <div className="max-w-2xl mx-auto  p-10">
          {/* heading */}
          <div className="heading flex flex-col gap-2 mb-3">
            <h1 className="font-bold text-center text-5xl text-blue-950">
              Browse by category
            </h1>
            <p className="text-slate-500 text-md font-semibold text-center">
              Find the job that’s perfect for you. about 800+ new jobs everyday
            </p>
          </div>

          {/* carasaul */}
          <Carousel
            showThumbs={false}
            showStatus={false}
            showIndicators={false}
          >
            {browseByCarItems.map((curr, index) => {
              return (
                <div
                  key={index}
                  className=" py-6  grid place-items-center rounded-xl "
                >
                  <p className="bg-white p-2 rounded-2xl border-black text-md p-2 font-semibold">
                    {curr.list}
                  </p>
                </div>
              );
            })}
          </Carousel>
        </div>
      </>
    );
  }
}
