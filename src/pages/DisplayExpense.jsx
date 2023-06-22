import classes from "./DisplayExpense.module.css";

const DisplayExpense = (props) => {
  //const dispatch = useDispatch();
  //dispatch(expenseActions.expenseAmount(props.price));

  return (
    <div className={classes.newexpenseactions}>
      <div className={classes.expenseitem}>
        <h2>
          {props.price} {props.expenseTitle} {props.category}
          <button onClick={() => props.deleteExpense(props.id)}>Delete</button>
          <button
            onClick={() =>
              props.editExpense(
                props.id,
                props.price,
                props.expenseTitle,
                props.category
              )
            }
          >
            Edit
          </button>
        </h2>
      </div>
    </div>
  );
};

export default DisplayExpense;
