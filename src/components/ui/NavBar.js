import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../actions/auth";

export const NavBar = () => {
  const dispatch = useDispatch();
  const {name} = useSelector( state => state.auth );
  const handleLogout = () => {
    dispatch(startLogout());
  }
  return (
    <div className="flex justify-around content-center bg-gray-800 p-2">
      <div>
        <span className="text-white text-lg font-semibold">{name}</span>
      </div>
      <div>
        <button className="text-red-700 text-sm font-light border border-red-700 rounded hover:bg-red-700  hover:text-white p-2"
        onClick={handleLogout}>
          <i className="fa-solid fa-right-from-bracket"></i>
          <span className="ml-2">Salir</span>
        </button>
      </div>
    </div>
  );
};
