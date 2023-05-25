import { useState } from "react";

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

  const submitHandler = (e) => {
    e.preventDefault();
  };

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
