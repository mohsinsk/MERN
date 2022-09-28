import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function Home() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8081/users", {
        credentials: "include",
      });
      const result = await response.json();
      if (result.success) {
        setUsers(result.users);
      } else {
        throw new Error("errorrrrrrrrrr");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRefreshToken = async (e) => {
    try {
      const response = await fetch("http://localhost:8081/refresh", {
        credentials: "include",
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <button onClick={handleRefreshToken}>refresh token</button>
      {users && users.map((user) => <h1 key={user.name}>{user.name}</h1>)}
    </div>
  );
}

export default Home;
