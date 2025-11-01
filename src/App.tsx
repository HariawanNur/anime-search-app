import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";

const App: React.FC = () => {
  return (
    <BrowserRouter basename="/anime-search-app">
      <Routes>
        <Route path="/" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App; // <--- wajib ada
