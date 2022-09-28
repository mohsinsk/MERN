import { useContext, useMemo } from "react";
import privateApi from "../api/privateApi";
import { authContext } from "../context/AuthContext";

const WithInterceptor = ({ children }) => {
  const { authenticate, logout } = useContext(authContext);

  useMemo(() => {
    privateApi.interceptors.response.use(
      (res) => {
        return res;
      },
      async (err) => {
        const originalConfig = err.config;

        if (originalConfig.url !== "/login" && err.response) {
          // Access Token was expired
          if (err.response.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true;

            try {
              const rs = await privateApi.get("/refresh");

              const { token } = rs.data;
              authenticate(token);
            } catch (_error) {
              originalConfig._retry = false;
              logout();
            }
            return privateApi(originalConfig);
          }
        }

        return Promise.reject(err);
      }
    );
  }, []);

  return children;
};

export default WithInterceptor;
