import { useRef, useEffect } from "react";

/* eslint-disable react/prop-types */
export const OtpLogic = ({ length = 4, otp, setOtp }) => {
  const inputRefs = useRef([]);

  const handleOnChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    const newOtp = [...otp];

    //value = "12324" ->value.length = 5 -> 5-1 = 4 ->end is omitted in substring so makes a substring till the end of string (value)
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    //MOVE TO NEXT INPUT
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };
  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    // optional;
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  return (
    <div className="flex gap-3 justify-center p-2 md:p-8">
      {otp.map((value, index) => (
        <input
          type="password"
          key={index}
          autoComplete="one-time-code" //automatically fills otp received in sms,authenticated app etc
          value={value}
          className="border w-10 h-10 md:w-16 md:h-16  text-center dark:bg-zinc-700 dark:border-none dark:text-white"
          ref={(input) => (inputRefs.current[index] = input)}
          onChange={(e) => handleOnChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};
