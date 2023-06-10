import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import DisplayExpense from "./DisplayExpense";
import { expenseActions } from "../store/expense";

const AddingExpenses = () => {
  const dispatch = useDispatch();
  const [expenseAmount, setExpenseAmount] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [expenses, setExpenses] = useState([]);
  const [flag, setFlag] = useState(false);
  //const [flag2, setFlag2] = useState(false);
  // const [expenseIds, setExpenseIds] = useState();
  //const [totalExpenseAmount, setTotalExpenseAmount] = useState(0);

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

    //setFlag2(true);
    //console.log(expenses);
    //console.log(expenseAmount);

    //let totalExpenseAmount = 0;

    // setTotalExpenseAmount(
    //   (totalExpenseAmount) =>
    //totalExpenseAmount =
    //parseInt(expenses.totalExpenseAmount) + parseInt(expenseAmount);
    //);

    //console.log(totalExpenseAmount);

    const expenseData = {
      price: expenseAmount,
      expenseTitle: description,
      category: category,
      //totalExpenseAmount: totalExpenseAmount,
    };

    //console.log(expenseIds);

    axios
      .post(
        `https://expense-tracker-10a55-default-rtdb.firebaseio.com/expenses.json`,
        expenseData
      )
      .then((response) => {
        // console.log(response.data.name);
        // setExpenseIds(response.data.name);
        // console.log(expenseIds);

        const expenseId = response.data.name;
        console.log(expenseId);
        localStorage.setItem("expenseId", expenseId);

        // console.log(expenses);
        // Object.assign(expenses, { [expenseId]: expenseData });
        // console.log(expenses);

        dispatch(expenseActions.addExpense({ [expenseId]: expenseData }));

        // axios
        //   .get(
        //     `https://expense-tracker-10a55-default-rtdb.firebaseio.com/expenses.json`
        //   )
        //   .then((response) => {
        //     let totalAmount = 0;
        //     console.log(totalAmount);
        //     Object.values(response.data).forEach(
        //       (value) =>
        //         (totalAmount = parseInt(totalAmount) + parseInt(value.price))
        //     );
        //     console.log(totalAmount);
        //     dispatch(expenseActions.expenseAmount(totalAmount));
        //     dispatch(expenseActions.updateExpense(response.data));
        //     setExpenses(response.data);
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
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
        let totalAmount = 0;
        console.log(totalAmount);
        Object.values(response.data).forEach(
          (value) =>
            (totalAmount = parseInt(totalAmount) + parseInt(value.price))
        );
        console.log(totalAmount);
        dispatch(expenseActions.expenseAmount(totalAmount));
        dispatch(expenseActions.updateExpense(response.data));
        //dispatch(expenseActions.expenseAmount());
        setExpenses(response.data);
        //console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteHandler = (id) => {
    // //setFlag2(true);
    // //delete expenses.id;
    // console.log(id);
    // console.log(expenses);
    // //setExpenses((expenses) => expenses.filter((i) => i[id] !== id));
    // //setExpenses((current) => delete current.id);
    // setExpenses(delete expenses.id);
    // console.log(expenses);
    // //setExpenses((expenses) => delete expenses.id);
    axios
      .delete(
        `https://expense-tracker-10a55-default-rtdb.firebaseio.com/expenses/${id}.json`
      )
      .then((response) => {
        // console.log(id);
        // dispatch(expenseActions.removeExpense(id));
        axios
          .get(
            `https://expense-tracker-10a55-default-rtdb.firebaseio.com/expenses.json`
          )
          .then((response) => {
            let totalAmount = 0;
            console.log(totalAmount);
            Object.values(response.data).forEach(
              (value) =>
                (totalAmount = parseInt(totalAmount) + parseInt(value.price))
            );
            console.log(totalAmount);
            dispatch(expenseActions.expenseAmount(totalAmount));
            dispatch(expenseActions.updateExpense(response.data));
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

  //console.log();

  const editHandler = (id, price, expenseTitle, category) => {
    //setFlag2(true);
    axios
      .delete(
        `https://expense-tracker-10a55-default-rtdb.firebaseio.com/expenses/${id}.json`
      )
      .then((response) => {
        setExpenseAmount(price);
        setDescription(expenseTitle);
        setCategory(category);
        axios
          .get(
            `https://expense-tracker-10a55-default-rtdb.firebaseio.com/expenses.json`
          )
          .then((response) => {
            let totalAmount = 0;
            console.log(totalAmount);
            Object.values(response.data).forEach(
              (value) =>
                (totalAmount = parseInt(totalAmount) + parseInt(value.price))
            );
            console.log(totalAmount);
            dispatch(expenseActions.expenseAmount(totalAmount));
            dispatch(expenseActions.updateExpense(response.data));
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

  const userExpenses = useSelector((state) => state.expense.expenses);

  useEffect(() => {
    //if (flag2 === true)
    setExpenses(userExpenses);
  }, [userExpenses]);

  const finalExpenseAmount = useSelector(
    (state) => state.expense.totalExpenseAmount
  );

  useEffect(() => {
    if (finalExpenseAmount > 10000) {
      setFlag(true);
    } else {
      setFlag(false);
    }
  }, [finalExpenseAmount]);

  //console.log(finalExpenseAmount);

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
      <br />
      <br></br>
      <h3>
        Total expense amount : {finalExpenseAmount}{" "}
        {flag && <button>Activate Premium</button>}
      </h3>
    </>
  );
};

export default AddingExpenses;
