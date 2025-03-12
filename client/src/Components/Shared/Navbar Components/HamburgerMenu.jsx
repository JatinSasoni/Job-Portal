/* eslint-disable react/prop-types */

const HamburgerMenu = ({ setIsOpen }) => {
  return (
    <div className="my-auto lg:hidden">
      <label onChange={() => setIsOpen((prev) => !prev)}>
        <div className="w-12 h-14 cursor-pointer flex flex-col items-center justify-center">
          <input className="hidden peer" type="checkbox" />
          <div className="w-[60%] h-[3px] bg-black rounded-sm transition-all duration-300 origin-left translate-y-[0.7rem] peer-checked:rotate-[-45deg] dark:bg-white"></div>
          <div className="w-[60%] h-[3px] bg-black rounded-md transition-all duration-300 origin-center peer-checked:hidden dark:bg-white"></div>
          <div className="w-[60%] h-[3px] bg-black rounded-md transition-all duration-300 origin-left -translate-y-[0.7rem] peer-checked:rotate-[45deg] dark:bg-white"></div>
        </div>
      </label>
    </div>
  );
};

export default HamburgerMenu;
