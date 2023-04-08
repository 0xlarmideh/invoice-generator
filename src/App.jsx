import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Downloaded from "./views/Downloaded";
import HomePage from "./views/HomePage";
import InvoicingFormRef from "./views/InvoicingForm";
import Preview from "./views/Preview";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/invoice" element={<InvoicingFormRef />}></Route>
        <Route path="/downloaded" element={<Downloaded />}></Route>
        <Route path="/preview" element={<Preview />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
