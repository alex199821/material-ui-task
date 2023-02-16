import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataTable from "./pages/DataTable";
import UserForm from "./pages/UserForm";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DataTable />} />
        <Route path="userform" element={<UserForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
