import { useContext, useMemo } from "react";
import privateApi from "../api/privateApi";
import { authContext } from "../context/AuthContext";

const WithInterceptor = ({ children }) => {
  const { authenticate, logout } = useContext(authContext);

  useMemo(() => {
    let isRefreshing = false; // Tracks if a refresh is already in progress
    let failedRequestsQueue = []; // Queue for requests while refreshing token

    const processQueue = (error, token = null) => {
      failedRequestsQueue.forEach((prom) => {
        if (error) {
          prom.reject(error);
        } else {
          prom.resolve(token);
        }
      });
      failedRequestsQueue = [];
    };

    const interceptor = privateApi.interceptors.response.use(
      (res) => res,
      async (err) => {
        const originalConfig = err.config;

        // Avoid handling the login and refresh endpoint requests
        if (originalConfig.url === "/login" || originalConfig.url === "/refresh" || !err.response) {
          return Promise.reject(err);
        }

        // Handle 401 errors
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          if (!isRefreshing) {
            isRefreshing = true;

            try {
              // Attempt to refresh the token
              const rs = await privateApi.get("/refresh");
              const { success, token } = rs.data;

              if (success) {
                authenticate(token);
                processQueue(null, token); // Retry queued requests with the new token
                return privateApi(originalConfig);
              } else {
                throw new Error("Refresh failed");
              }
            } catch (refreshError) {
              processQueue(refreshError, null); // Reject queued requests
              logout(); // Logout on failure
              return Promise.reject(refreshError);
            } finally {
              isRefreshing = false; // Reset refresh state
            }
          }

          // Queue the failed request while the refresh is in progress
          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({ resolve, reject });
          });
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