import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";

export default function Logout() {
  const navigate = useNavigate();
  const { logoutHandler } = useContext(UserContext);

  useEffect(() => {
    logoutHandler()
      .then(() => navigate("/"))
      .catch((err) => alert("Unsuccessfull logout ", err.message));
  }, []);
}
