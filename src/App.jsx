import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditPage from "./EditPage";
import InvoicingForm from "./InvoicingForm";
import PreviewPage from "./PreviewPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InvoicingForm />}></Route>
        <Route path="/edit" element={<EditPage />}></Route>

        <Route path="/preview" element={<PreviewPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
