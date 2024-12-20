import React from "react";
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from "./api";
import { useNavigate } from "react-router-dom";

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(null);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    window.localStorage.setItem("userData", JSON.stringify(json));
    setData(json);
    setLogin(true);
  }

  async function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      const { token } = await response.json();
      window.localStorage.setItem("token", token);
      await getUser(token);
      navigate(`/user/${username}`);
    } catch (error) {
      if (error.message === "Error: Forbidden") {
        setError("Dados incorretos.");
      } else {
        setError(error.message);
      }
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  const userLogout = React.useCallback(
    async function () {
      setData(null);
      setError(null);
      setLoading(false);
      setLogin(false);
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("userData");
      navigate("/login");
    },
    [navigate]
  );

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem("token");
      if (token) {
        if (navigator.onLine) {
          try {
            setError(null);
            setLoading(true);
            const { url, options } = TOKEN_VALIDATE_POST(token);
            const response = await fetch(url, options);
            if (!response.ok) throw new Error("Token inválido");
            await getUser(token);
          } catch (error) {
            userLogout();
          } finally {
            setLoading(false);
          }
        } else {
          // Se offline, verifica se há dados armazenados
          const userData = window.localStorage.getItem("userData");
          if (userData) {
            setData(JSON.parse(userData));
            setLogin(true);
          } else {
            setLogin(false);
          }
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin();
  }, [userLogout]);

  return (
    <UserContext.Provider
      value={{ userLogin, userLogout, data, login, loading, error }}
    >
      {children}
    </UserContext.Provider>
  );
};
