const DisplayExpense = (props) => {
  return (
    <h3>
      {props.price} . {props.expenseTitle} . {props.category}
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
    </h3>
  );
};

export default DisplayExpense;
