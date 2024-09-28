import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

const Header = () => {
  const { data, userLogout } = React.useContext(UserContext);

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        {data ? (
          <div>
            <Link to="/conta">{data.name}</Link>
            <button onClick={userLogout}>Sair</button>
          </div>
        ) : (
          <Link to="/login">Login/Criar</Link>
        )}
      </nav>
    </div>
  );
};

export default Header;
