import React from 'react'
import { Heading, SmallHeading } from './components/Typography'
import Button from './components/Button';
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
  const navigate = useNavigate()
  return (
    <>
      <Heading title="Invoice Generator App" />
      <SmallHeading title="Create invoice easily at a tap" />
      <Button onClick={() => {navigate("/invoice")}} className="bg-purple-800" title='Create Invoice' />
    </>
  );
}

export default HomePage