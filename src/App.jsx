import React, { useContext, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Downloaded from "./views/Downloaded";
import InvoicingForm from "./views/InvoicingForm";
import Preview from "./views/Preview";
import Layout from "./components/layout";
import Sidebar from "./components/sidebar";


function App() {
  const [isShow, setShow] = useState(false)
  const toggleMenu = () => {
    setShow(!isShow)
  }
  const closeMenu = () => {
    setShow(!isShow);
  } 
  return (
    <>
      <BrowserRouter>
        <div>{isShow ? <Sidebar closeMenu={closeMenu} /> : null} </div>
        <Routes>
          <Route path="/" element={<Layout onClick={toggleMenu} />}>
            <Route index element={<InvoicingForm />}></Route>
            <Route path="/invoice" element={<Navigate to="/" />}></Route>
            <Route path="/downloaded" element={<Downloaded />}></Route>
            <Route path="/preview" element={<Preview />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
