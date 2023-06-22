import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = { expenses: {}, totalExpenseAmount: 0 };

const expenseSlice = createSlice({
  name: "expense",
  initialState: initialExpenseState,
  reducers: {
    addExpense(state, action) {
      //console.log(action.payload);
      //console.log(Object.keys(action.payload));
      //console.log(Object.values(action.payload));
      //state.expenses = state.expenses.push(action.payload);
      Object.assign(state.expenses, action.payload);

      const valueNumber = Object.values(action.payload);
      //console.log(valueNumber[0].price);
      state.totalExpenseAmount =
        parseInt(state.totalExpenseAmount) + parseInt(valueNumber[0].price);
      //console.log(state.totalExpenseAmount);

      // state.expenses = {
      //   ...state.expenses,
      //   [Object.keys(action.payload)]: Object.assign(
      //     {},
      //     Object.values(action.payload)
      //   ),
      // };
      // console.log(state.expenses);
      // console.log(state.totalExpenseAmount);
      //console.log(Object.key[action.payload]);

      // state.totalExpenseAmount =
      //   parseInt(state.totalExpenseAmount) +
      //   parseInt(action.payload.Object.key[action.payload][0].price);
      // console.log(state.totalExpenseAmount);
    },
    updateExpense(state, action) {
      state.expenses = action.payload;
      // state.totalExpenseAmount = Object.values(state.expenses).map(
      //   (value) =>
      //     (state.totalExpenseAmount =
      //       parseInt(state.totalExpenseAmount) + parseInt(value.price))
      // );
      //console.log(state.totalExpenseAmount);
    },
    expenseAmount(state, action) {
      state.totalExpenseAmount = action.payload;
    },
    removeExpenseAmount(state, action) {
      //console.log(action.payload);
      //console.log(state.totalExpenseAmount);
      state.totalExpenseAmount =
        parseInt(state.totalExpenseAmount) - parseInt(action.payload.price);
      //console.log(state.totalExpenseAmount);
      //delete state.expenses.action.payload;
      // Object.keys(state.expenses).forEach((key) =>
      //   key === action.payload ? delete state.expenses.key : {}
      // );
      // const userExpenses = { ...state.expenses };
      // console.log(userExpenses);
      //console.log(userExpenses.action.payload);
      //console.log(state.expenses);
    },
    // removeExpense(state, action) {
    //   //console.log(state.expenses);
    //   //console.log(action.payload);
    //   // for(int i=0;i<)
    // },
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;
