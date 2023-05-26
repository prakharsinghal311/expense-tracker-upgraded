import { useState, useEffect } from "react";
import axios from "axios";

const AddingExpenses = () => {
  const [expenseAmount, setExpenseAmount] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();

  const expenseAmountHandler = (e) => {
    setExpenseAmount(e.target.value);
  };

  const descriptionHandler = (e) => {
    setDescription(e.target.value);
  };

  const categoryHandler = (e) => {
    setCategory(e.target.value);
  };

  //let expenseId;

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
        //console.log(response);
        const expenseId = response.data.name;
        console.log(expenseId);
        localStorage.setItem("expenseId", expenseId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //console.log(expenseId);

  useEffect(() => {
    axios
      .get(
        `https://expense-tracker-10a55-default-rtdb.firebaseio.com/expenses/${localStorage.getItem(
          "expenseId"
        )}.json`
      )
      .then((response) => {
        console.log(response);
        setCategory(response.data.category);
        setExpenseAmount(response.data.price);
        setDescription(response.data.expenseTitle);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <form onSubmit={submitHandler}>
        <label id="expenseAmount">Expense Amount</label>
        <input
          type="number"
          id="expenseAmount"
          onChange={expenseAmountHandler}
        ></input>
        <label id="description">Description</label>
        <input
          type="text"
          id="description"
          onChange={descriptionHandler}
        ></input>
        <label id="category">Category</label>
        <select id="category" onChange={categoryHandler}>
          <option>Food</option>
          <option>Petrol</option>
          <option>Salary</option>
        </select>
        <button type="submit">submit</button>
      </form>
      <h3>{expenseAmount}</h3>
      <h3>{description}</h3>
      <h3>{category}</h3>
    </>
  );
};

export default AddingExpenses;
