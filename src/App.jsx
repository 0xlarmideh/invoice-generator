import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Downloaded from "./Downloaded";
import EditPage from "./EditPage";
import HomePage from "./HomePage";
import InvoicingForm from "./InvoicingForm";
import PreviewPage from "./PreviewPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/invoice" element={<InvoicingForm />}></Route>
        <Route path="/edit" element={<EditPage />}></Route>
        <Route path="/downloaded" element={<Downloaded />}></Route>

        <Route path="/preview" element={<PreviewPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
