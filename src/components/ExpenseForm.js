import React from "react";
import { MdSend } from "react-icons/md";

function ExpenseForm({ info }) {
  const { charge, amount, chargeHandler, amountHandler, submitHandler, edit } =
    info;
  return (
    <form onSubmit={submitHandler}>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="expense">Charge</label>
          <input
            className="form-control"
            type="text"
            id="charge"
            placeholder="e.g rent"
            name="charge"
            value={charge}
            onChange={chargeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="expense">Amount</label>
          <input
            className="form-control"
            type="number"
            id="amount"
            placeholder="e.g 100"
            name="amount"
            value={amount}
            onChange={amountHandler}
          />
        </div>
      </div>

      <button className="btn" type="submit">
        {edit ? "Edit" : "Submit"} <MdSend className="btn-icon" />{" "}
      </button>
    </form>
  );
}

export default ExpenseForm;
