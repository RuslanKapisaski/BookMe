import { Routes, Route } from "react-router";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Register from "./components/register/Register";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
