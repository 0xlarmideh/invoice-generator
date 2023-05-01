import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Downloaded from "./views/Downloaded";
import InvoicingFormRef from "./views/InvoicingForm";
import Preview from "./views/Preview";
import Layout from "./components/layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<InvoicingFormRef />}></Route>
          <Route path="/invoice" element={<Navigate to="/" />}></Route>
          <Route path="/downloaded" element={<Downloaded />}></Route>
          <Route path="/preview" element={<Preview />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
