import React from 'react'
import { Heading, SmallHeading } from '../components/Typography'
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import free from "../assets/free.svg"
const HomePage = () => {
  const navigate = useNavigate()
  return (
    <div>
      <div className='flex justify-center'>
        <img className='w-[80%]' src={free} />
      </div>

      <Heading title="Invoice Generator App" />
      <SmallHeading title="Create invoice easily at a tap" />
      <Button
        onClick={() => {
          navigate("/invoice");
        }}
        className="bg-purple-800 my-[2rem] "
        title="Create Invoice"
      />
    </div>
  );
}

export default HomePage