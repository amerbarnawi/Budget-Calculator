import React from "react";
import Item from "./ExpenseItem";
import { MdDelete } from "react-icons/md";

function ExpenseList({ expenses, clearItems, deleteHandler, editHandler }) {
  return (
    <div>
      <ul className="list">
        {expenses.map((expense) => {
          return (
            <Item
              key={expense.id}
              expense={expense}
              deleteHandler={deleteHandler}
              editHandler={editHandler}
            />
          );
        })}
      </ul>
      {expenses.length > 0 ? (
        <button className="btn" onClick={clearItems}>
          Clear expenses <MdDelete className="btn-icon" />{" "}
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default ExpenseList;
