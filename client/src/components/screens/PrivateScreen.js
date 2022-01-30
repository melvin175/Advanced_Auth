import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const PrivateScreen = () => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const history = useHistory();

  useEffect(() => {
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/private", config);
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchPrivateDate();
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    history.push("/login");
  };

  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <>
      <div style={{ background: "green", color: "white" }}> {privateData}</div>
      <button
        onClick={logoutHandler}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </>
  );
};

export default PrivateScreen;
