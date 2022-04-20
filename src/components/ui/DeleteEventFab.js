import React from "react";
import { useDispatch } from "react-redux";
import { eventStartDelete } from "../../actions/events";

export const DeleteEventFab = () => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(eventStartDelete());
  };
  return (
    <button
      className="text-white text-2xl bg-red-700 rounded-full bottom-6 left-6 fixed px-6 py-5"
      onClick={handleDelete}
    >
      <i className="fa-solid fa-trash"></i>
    </button>
  );
};
