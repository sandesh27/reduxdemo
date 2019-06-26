//people dropping off some form

//create a policy with us
const createPolicy = (name, amount) => {
  return {
    type: "CREATE_POLICY",
    payload: {
      name,
      amount
    }
  };
};

//delete a policy
const deletePolicy = name => {
  return {
    type: "DELETE_POLICY",
    payload: {
      name
    }
  };
};

//create a claim
const createClaim = (name, claimAmount) => {
  return {
    type: "CREATE_CLAIM",
    payload: {
      name,
      claimAmount
    }
  };
};

//claims reducer
const claimsHistoryReducer = (oldClaimsList = [], action) => {
  if (action.type === "CREATE_CLAIM") {
    return [...oldClaimsList, action.payload];
  }
  return oldClaimsList;
};

//account reducer
const accountingReducer = (bagOfMoney = 100, action) => {
  if (action.type === "CREATE_CLAIM") {
    return bagOfMoney - action.payload.claimAmount;
  } else if (action.type === "CREATE_POLICY") {
    return bagOfMoney + action.payload.amount;
  }
  return bagOfMoney;
};

//policy reducer
const policyReducer = (listOfPolicies = [], action) => {
  if (action.type === "CREATE_POLICY") {
    return [...listOfPolicies, action.payload.name];
  } else if (action.type === "DELETE_POLICY") {
    return listOfPolicies.filter(name => {
      return name !== action.payload.name;
    });
  }
  return listOfPolicies;
};

//destructing required methods
import { createStore, combineReducers } from "redux";

//creating department combine reducer
const ourDepartments = combineReducers({
  accountingReducer,
  claimsHistoryReducer,
  policyReducer
});

//create redux store
const store = createStore(
  ourDepartments,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.dispatch(createPolicy("Larry page", 30));
store.dispatch(createClaim("Larry page", 15));
store.dispatch(createPolicy("Jeff Bezos", 35));
store.dispatch(createClaim("Jeff Bezos", 20));
store.dispatch(createPolicy("Mark Zuckerberg", 25));
store.dispatch(createClaim("Mark Zuckerberg", 10));
// store.dispatch(deletePolicy('Mark Zuckerberg'));
