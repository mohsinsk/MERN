import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import privateInstance from "../common/api/privateApi";
import { authContext } from "../common/context/AuthContext";

function Home() {
  const { logout } = useContext(authContext);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await privateInstance.get("/users");
      const { data } = response;
      if (data.success) {
        setUsers(data.users);
      } else {
        throw new Error("errorrrrrrrrrr");
      }
    } catch (error) {}
  };

  const handleLogout = async () => {
    try {
      const response = await privateInstance("/logout");
      const { data } = response;
      if (data.success) {
        logout();
      } else {
        throw new Error("errorrrrrrrrrr");
      }
    } catch (error) {}
  };

  const handleRefreshToken = async (e) => {
    try {
      await privateInstance("/refresh");
    } catch (error) {}
  };

  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  return (
    <div>
      <button onClick={handleRefreshToken}>refresh token</button>
      <button onClick={fetchUsers}>fetch Users</button>
      {users && users.map((user) => <h1 key={user.name}>{user.name}</h1>)}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
