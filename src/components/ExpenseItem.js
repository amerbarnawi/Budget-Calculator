import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";

function Item({ expense, deleteHandler, editHandler }) {
  const { id, charge, amount } = expense;
  return (
    <li key={charge} className="item">
      <div className="info">
        <span className="expense">{charge}</span>
        <span className="amount">{amount}</span>
      </div>
      <div>
        <button className="edit-btn" onClick={() => editHandler(id)}>
          <MdEdit />
        </button>
        <button className="clear-btn" onClick={() => deleteHandler(id)}>
          <MdDelete />
        </button>
      </div>
      <hr />
    </li>
  );
}

export default Item;
