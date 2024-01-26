
import React, { useState, useEffect } from "react";
import { Button } from "../../components/form";
import { useNavigate } from 'react-router-dom';
import { Paragraph } from "../../components/typography/Typography";
import { useDispatch } from "react-redux";
import { resetFormData } from "../../store/slices/formDataSlice"; 


const Downloaded = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return loading ? (
    <div className="loading-spinner">
      <span className="loader"></span>
    </div>
  ) : (
    <div className="downloaded">
      <div className="check mx-auto my-0  text-text w-[360px] ">
        <img src="/invoice1.svg" width="320px" />
        <Paragraph
          title="Your invoice has been generated successfully."
          className="text-center"
        />
        <Button
          title="+ Create New Invoice"
          className="bg-blue text-white w-[100%] mt-[36px] "
          onClick={() => {
            dispatch(resetFormData());
            navigate("/invoice");
          }}
        />
      </div>
    </div>
  );
}

export default Downloaded