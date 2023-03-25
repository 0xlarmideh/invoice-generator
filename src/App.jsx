import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Downloaded from "./views/Downloaded";
import EditPage from "./EditPage";
import HomePage from "./views/HomePage";
import InvoicingForm from "./views/InvoicingForm_REF";
import PreviewPage from "./views/PreviewPage";

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
