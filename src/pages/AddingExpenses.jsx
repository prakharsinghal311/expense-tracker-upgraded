import { useState, useEffect } from "react";
import axios from "axios";
import DisplayExpense from "./DisplayExpense";

const AddingExpenses = () => {
  const [expenseAmount, setExpenseAmount] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [expenses, setExpenses] = useState([]);

  const expenseAmountHandler = (e) => {
    setExpenseAmount(e.target.value);
  };

  const descriptionHandler = (e) => {
    setDescription(e.target.value);
  };

  const categoryHandler = (e) => {
    setCategory(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const expenseData = {
      price: expenseAmount,
      expenseTitle: description,
      category: category,
    };

    axios
      .post(
        `https://expense-tracker-10a55-default-rtdb.firebaseio.com/expenses.json`,
        expenseData
      )
      .then((response) => {
        const expenseId = response.data.name;
        localStorage.setItem("expenseId", expenseId);
        axios
          .get(
            `https://expense-tracker-10a55-default-rtdb.firebaseio.com/expenses.json`
          )
          .then((response) => {
            setExpenses(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(
        `https://expense-tracker-10a55-default-rtdb.firebaseio.com/expenses.json`
      )
      .then((response) => {
        setExpenses(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteHandler = (id) => {
    axios
      .delete(
        `https://expense-tracker-10a55-default-rtdb.firebaseio.com/expenses/${id}.json`
      )
      .then((response) => {
        axios
          .get(
            `https://expense-tracker-10a55-default-rtdb.firebaseio.com/expenses.json`
          )
          .then((response) => {
            setExpenses(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(expenses);

  const editHandler = (id, price, expenseTitle, category) => {
    axios
      .delete(
        `https://expense-tracker-10a55-default-rtdb.firebaseio.com/expenses/${id}.json`
      )
      .then((response) => {
        setExpenseAmount(price);
        setDescription(expenseTitle);
        setCategory(category);
        console.log(expenses);
        axios
          .get(
            `https://expense-tracker-10a55-default-rtdb.firebaseio.com/expenses.json`
          )
          .then((response) => {
            setExpenses(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
        console.log(expenses);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <label id="expenseAmount">Expense Amount</label>
        <input
          type="number"
          id="expenseAmount"
          onChange={expenseAmountHandler}
          value={expenseAmount}
        ></input>
        <label id="description">Description</label>
        <input
          type="text"
          id="description"
          onChange={descriptionHandler}
          value={description}
        ></input>
        <label id="category">Category</label>
        <select id="category" onChange={categoryHandler} value={category}>
          <option>Food</option>
          <option>Petrol</option>
          <option>Salary</option>
        </select>
        <button type="submit">submit</button>
      </form>
      {Object.entries(expenses).map(([key, value], index) => {
        return (
          <DisplayExpense
            expenseIndex={index}
            key={Math.random()}
            id={key}
            price={value.price}
            expenseTitle={value.expenseTitle}
            category={value.category}
            deleteExpense={deleteHandler}
            editExpense={editHandler}
          />
        );
      })}
    </>
  );
};

export default AddingExpenses;
