import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export default function ExpenseList({ token }) {
  const [details, setDetails] = useState({});

  useEffect(() => {
    if (token) {
      fetchData(token);
    }
  }, [token]);

  const fetchData = async (token) => {
    const res = await axios.get("http://localhost:5050/api/expense", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setDetails(res.data);

  };

  console.log("res details: ", details);
  
  console.log("token: ", token);

  return (
    <div>
      <h1>List of Expenses</h1>
    </div>
  );
}
