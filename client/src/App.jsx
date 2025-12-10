import { Routes, Route } from "react-router";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Logout from "./components/logout/Logout";
import Home from "./components/home/Home";
import AddProperty from "./components/add-property/AddProperty";
import Catalog from "./components/catalog/Catalog";
import Details from "./components/details/Details";
import Profile from "./components/profile/Profile";
import Review from "./components/review/Review";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/properties/add" element={<AddProperty />} />
        <Route path="/properties/:propertyId/details" element={<Details />} />
        <Route path="/properties/:propertyId/review" element={<Review />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
