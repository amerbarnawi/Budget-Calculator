import React, { useEffect, useState } from "react";
import "./App.css";
import Alert from "./components/Alert";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import { v4 as uuid } from "uuid";

const expensesArray = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];

function App() {
  const [expenses, setExpenses] = useState(() => {
    return expensesArray;
  });
  const [charge, setCharge] = useState(() => {
    return "";
  });
  const [amount, setAmount] = useState(() => {
    return "";
  });
  const [alert, setAlert] = useState(() => {
    return {
      show: false,
    };
  });
  const [edit, setAEdit] = useState(() => false);
  const [id, setId] = useState(() => {
    return 0;
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  function chargeHandler(e) {
    setCharge(e.target.value);
  }
  function amountHandler(e) {
    setAmount(e.target.value);
  }
  function alertHandler({ type, text }) {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 5000);
  }
  function submitHandler(e) {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
        const tempExpenses = expenses.map((item) => {
          return item.id === id
            ? { ...item, charge: charge, amount: +amount }
            : item;
        });
        setExpenses(tempExpenses);
        setAEdit(false);
        alertHandler({ type: "success", text: "Item successfully edited!" });
      } else {
        const newExpense = {
          id: uuid(),
          charge: charge,
          amount: +amount,
        };
        setExpenses([...expenses, newExpense]);
        alertHandler({ type: "success", text: "Item added!" });
      }
      setAmount("");
      setCharge("");
    } else {
      alertHandler({
        type: "danger",
        text: "Charge can not be empty and amount must be bigger than zero!",
      });
    }
  }

  function clearItems() {
    setExpenses([]);
    alertHandler({ type: "danger", text: "All item deleted!" });
  }
  function deleteHandler(id) {
    const newArray = expenses.filter((item) => {
      return item.id !== id;
    });
    setExpenses(newArray);
    alertHandler({ type: "danger", text: "Item deleted!" });
  }
  function editHandler(id) {
    const expense = expenses.find((item) => item.id === id);
    const { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setAEdit(true);
    setId(id);
  }
  return (
    <div>
      {alert.show ? <Alert type={alert.type} text={alert.text} /> : ""}
      <Alert />
      <h1>Budget calculator</h1>
      <main className="App">
        <ExpenseForm
          info={{
            charge: charge,
            amount: amount,
            edit: edit,
            chargeHandler: chargeHandler,
            amountHandler: amountHandler,
            submitHandler: submitHandler,
          }}
        />
        <ExpenseList
          expenses={expenses}
          clearItems={clearItems}
          deleteHandler={deleteHandler}
          editHandler={editHandler}
        />
      </main>
      <h1>
        Total amount:
        <span className="total">
          {expenses.reduce((acc, current) => {
            return acc + current.amount;
          }, 0)}
        </span>
      </h1>
    </div>
  );
}

export default App;
