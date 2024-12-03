import { useContext, useMemo } from "react";
import privateApi from "../api/privateApi";
import { authContext } from "../context/AuthContext";

const WithInterceptor = ({ children }) => {
  const { authenticate, logout } = useContext(authContext);

  useMemo(() => {
    const interceptor = privateApi.interceptors.response.use(
      (res) => res,
      async (err) => {
        const originalConfig = err.config;

        if (originalConfig.url !== "/login" && err.response) {
          if (err.response.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true;

            try {
              const rs = await privateApi.get("/refresh");
              const { success } = rs.data;
              authenticate(success);
              return privateApi(originalConfig);
            } catch (_error) {
              logout();
              return Promise.reject(_error);
            }
          }
        }

        return Promise.reject(err);
      }
    );

    // Cleanup interceptor on unmount
    return () => privateApi.interceptors.response.eject(interceptor);
  }, [authenticate, logout]);

  return children;
};

export default WithInterceptor;