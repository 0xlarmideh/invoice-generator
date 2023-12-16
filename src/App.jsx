import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Downloaded from "./views/download";
import InvoicingForm from "./views/invoice";
import Preview from "./views/preview";
import Layout from "./components/layout/layout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
                <Layout />
            }
          >
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
