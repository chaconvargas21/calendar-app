import React from "react";
import { useDispatch } from "react-redux";
import { uiOpenModal } from "../../actions/ui";

export const AddNewFab = () => {
    const dispatch = useDispatch();
  const handleOpenModal = () => {
        dispatch(uiOpenModal())
  };
  return (
    <button
      className="text-white text-2xl bg-blue-700 rounded-full bottom-6 right-6 fixed px-6 py-5"
      onClick={handleOpenModal}
    >
      <i className="fa-solid fa-plus"></i>
    </button>
  );
};
