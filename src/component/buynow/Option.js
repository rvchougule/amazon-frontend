import React,{useContext} from "react";
import './buynow.css'
import { LoginContext } from "../context/ContextProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Option = ({deletedata,get}) => {

  const { account, setAccount } = useContext(LoginContext);
  const removeData = async (req,res) => {
      try {
          const res = await fetch(`remove/${deletedata}`, {
              method: "DELETE",
              headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
              },
              credentials: "include"
          });

          const data = await res.json();
          // console.log(data);

          if (res.status === 400 || !data) {
              console.log("error aai remove time pr");
          } else {
              setAccount(data)
              get();
              toast.success("Iteam remove from cart 😃!", {
                  position: "top-center"
              });
          }
      } catch (error) {
          console.log(error);
      }

  }
  return (
    <div className="add_remove_select">
      <select>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <p style={{cursor:"pointer"}} onClick={()=>removeData(deletedata)} >Delete</p><span>|</span>
      <p className="forremovemedia">Save or Later</p><span>|</span>
      <p className="forremovemedia">See More Like this</p>
      <ToastContainer/>
    </div>
  );
};

export default Option;
