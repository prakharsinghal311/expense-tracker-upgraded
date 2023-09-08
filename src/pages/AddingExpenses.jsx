import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import DisplayExpense from "./DisplayExpense";
import { expenseActions } from "../store/expense";
import { themeActions } from "../store/theme";
import classes from "./AddingExpense.module.css";

const AddingExpenses = () => {
  const dispatch = useDispatch();
  const [expenseAmount, setExpenseAmount] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [expenses, setExpenses] = useState([]);
  const [flag, setFlag] = useState(false);
  const [theme, setTheme] = useState(false);

  const expenseAmountHandler = (e) => {
    setExpenseAmount(e.target.value);
  };

  const descriptionHandler = (e) => {
    setDescription(e.target.value);
  };

  const categoryHandler = (e) => {
    setCategory(e.target.value);
  };

  const emailid = localStorage.getItem("email");

  const newemailid = emailid.replace("@", "");

  const useremailid = newemailid.replace(".", "");

  const submitHandler = (e) => {
    e.preventDefault();

    const expenseData = {
      price: expenseAmount,
      expenseTitle: description,
      category: category,
    };

    axios
      .post(
        `https://expense-tracker7-9-23-default-rtdb.firebaseio.com/expenses${useremailid}.json`,
        expenseData
      )
      .then((response) => {
        const expenseId = response.data.name;
        localStorage.setItem("expenseId", expenseId);

        const expenses3 = { ...expenses, [expenseId]: expenseData };

        setExpenses(expenses3);

        dispatch(expenseActions.addExpense({ [expenseId]: expenseData }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(
        `https://expense-tracker7-9-23-default-rtdb.firebaseio.com/expenses${useremailid}.json`
      )
      .then((response) => {
        let totalAmount = 0;
        Object.values(response.data).forEach(
          (value) =>
            (totalAmount = parseInt(totalAmount) + parseInt(value.price))
        );

        dispatch(expenseActions.expenseAmount(totalAmount));
        dispatch(expenseActions.updateExpense(response.data));

        setExpenses(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteHandler = (id) => {
    dispatch(expenseActions.removeExpenseAmount(expenses[id]));

    const expense1 = { ...expenses };
    delete expense1[id];
    setExpenses(expense1);

    axios
      .delete(
        `https://expense-tracker7-9-23-default-rtdb.firebaseio.com/expenses${useremailid}/${id}.json`
      )
      .then((response) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const editHandler = (id, price, expenseTitle, category) => {
    dispatch(expenseActions.removeExpenseAmount(expenses[id]));

    const expense2 = { ...expenses };
    delete expense2[id];
    setExpenses(expense2);

    axios
      .delete(
        `https://expense-tracker7-9-23-default-rtdb.firebaseio.com/expenses${useremailid}/${id}.json`
      )
      .then((response) => {
        setExpenseAmount(price);
        setDescription(expenseTitle);
        setCategory(category);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const switchThemeHandler = () => {
    dispatch(themeActions.changeTheme());
  };

  const darkTheme = useSelector((state) => state.theme.darkTheme);

  useEffect(() => {
    if (darkTheme) {
      setTheme(true);
    } else {
      setTheme(false);
    }
  }, [darkTheme]);

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

  const data1 = Object.entries(expenses);

  const data2 = [];
  const data3 = [];
  const data4 = [];
  const data5 = [];

  data1.map(
    (i, index) => (
      (data2[index] = i[0]),
      (data3[index] = i[1].expenseTitle),
      (data4[index] = i[1].category),
      (data5[index] = i[1].price)
    )
  );

  //data6.map((i, index) => i[index]=)
  const data6 = [data3, data4, data5];

  //console.log(data2);
  //console.log(data3);

  // //console.log(JSON.stringify(data1[0][1]));

  // const data2 = data1.map((i) => (i[1] = i[1].price));

  // console.log(data2);
  // console.log(data1);

  function makeCSV(rows) {
    return rows.map((r) => r.join(",")).join("\n");
  }

  const downloadHandler = (a1) => {
    const blob = new Blob([makeCSV(data6)]);
    a1.target.href = URL.createObjectURL(blob);
  };

  return (
    <>
      {/* {theme && <div className={classes.background}></div>} */}
      {theme ? (
        <div className={classes.background1}>
          <div className={classes.newexpensecontrols}>
            <form onSubmit={submitHandler}>
              <div className={classes.newexpensecontrol}>
                <label id="expenseAmount">Expense Amount</label>
                <input
                  type="number"
                  id="expenseAmount"
                  onChange={expenseAmountHandler}
                  value={expenseAmount}
                ></input>
              </div>
              <div className={classes.newexpensecontrol}>
                <label id="description">Description</label>
                <input
                  type="text"
                  id="description"
                  onChange={descriptionHandler}
                  value={description}
                ></input>
              </div>
              <div className={classes.newexpensecontrol}>
                <label id="category">Category</label>
                <select
                  id="category"
                  onChange={categoryHandler}
                  value={category}
                >
                  <option>Food</option>
                  <option>Petrol</option>
                  <option>Salary</option>
                </select>
              </div>
              <div className={classes.newexpenseactions}>
                <button type="submit">submit</button>
              </div>
            </form>
          </div>
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
          <div className={classes.newexpensecontrols}>
            <div className={classes.newexpenseactions}>
              <h3>
                Total expense amount : {finalExpenseAmount}{" "}
                {flag && (
                  <button onClick={switchThemeHandler}>Activate Premium</button>
                )}
              </h3>
              {/* <button onClick={downloadHandler}>Download Expenses</button> */}
              <a id="a1" download="expensesFile.csv" onClick={downloadHandler}>
                Download Expense
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className={classes.background2}>
          <div className={classes.newexpensecontrols}>
            <form onSubmit={submitHandler}>
              <div className={classes.newexpensecontrol}>
                <label id="expenseAmount">Expense Amount</label>
                <input
                  type="number"
                  id="expenseAmount"
                  onChange={expenseAmountHandler}
                  value={expenseAmount}
                ></input>
              </div>
              <div className={classes.newexpensecontrol}>
                <label id="description">Description</label>
                <input
                  type="text"
                  id="description"
                  onChange={descriptionHandler}
                  value={description}
                ></input>
              </div>
              <div className={classes.newexpensecontrol}>
                <label id="category">Category</label>
                <select
                  id="category"
                  onChange={categoryHandler}
                  value={category}
                >
                  <option>Food</option>
                  <option>Petrol</option>
                  <option>Salary</option>
                </select>
              </div>
              <div className={classes.newexpenseactions}>
                <button type="submit">submit</button>
              </div>
            </form>
          </div>
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
          <div className={classes.newexpensecontrols}>
            <div className={classes.newexpenseactions}>
              <h3>
                Total expense amount : {finalExpenseAmount}{" "}
                {flag && (
                  <button onClick={switchThemeHandler}>Activate Premium</button>
                )}
              </h3>
              {/* <button onClick={downloadHandler}>Download Expenses</button> */}
              <a id="a1" download="expensesFile.csv" onClick={downloadHandler}>
                Download Expense
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddingExpenses;
