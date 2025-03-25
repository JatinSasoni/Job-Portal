import { useSearchParams } from "react-router-dom";
import { Navbar } from "../Components/Shared/Navbar";

const Success = () => {
  const searchQuery = useSearchParams()[0];
  const referenceNum = searchQuery.get("reference");

  return (
    <div>
      <Navbar />
      <h1>SUCCESS</h1>
      {referenceNum}
    </div>
  );
};

export default Success;
