
import React, { useState, useEffect } from "react";
import Button from './components/Button';
import { useNavigate } from 'react-router-dom';


const Downloaded = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
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
    <div>
      <div className="check flex justify-center my-[8rem]">
        <img src="https://img.icons8.com/bubbles/200/null/checked.png" />
      </div>
      <Button
        title="Create New Invoice"
        className="bg-black my-[2rem]"
        onClick={() => {
          navigate("/invoice");
        }}
      />
    </div>
  );
}

export default Downloaded