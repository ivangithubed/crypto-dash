import { BarLoader } from "react-spinners";
  const override = {
    display: "block",
    margin: "0 auto",
  };


const Spinner = ({ color = "orange", size = '150px' }) => {


  return (
    
      <BarLoader color={color} width={size} height={4} cssOverride={override} data-testid="loader" />
    
  );
};

export default Spinner;
