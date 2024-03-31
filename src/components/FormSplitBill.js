import { useReducer } from "react";
import Button from "./Button";
import { useFawAway } from "../contexts/SplitBillContext";

const initialState = {
  bill: "",
  userExpense: "",
  whoPaying: "user",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_BILL":
      return { ...state, bill: action.payload };
    case "SET_USER_EXPENSE":
      return { ...state, userExpense: action.payload };
    case "SET_WHO_PAYING":
      return { ...state, whoPaying: action.payload };
    default:
      return state;
  }
}

export default function FormSplitBill() {
  const { selectedFriend, dispatch } = useFawAway();
  const [{ bill, userExpense, whoPaying }, localDispatch] = useReducer(
    reducer,
    initialState
  );

  const friendExpense = bill ? bill - userExpense : "";

  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !userExpense) return;
    dispatch({
      type: "BILL_SUBMIT",
      payload: whoPaying === "user" ? Number(friendExpense) : -userExpense,
    });
  }

  return selectedFriend ? (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>split a bill with {selectedFriend.name}</h2>

      <label htmlFor="billValue">💰Bill value</label>
      <input
        type="text"
        id="billValue"
        value={bill}
        onChange={(e) =>
          localDispatch({ type: "SET_BILL", payload: Number(e.target.value) })
        }
      />

      <label htmlFor="youExpense">🕴🏾You expense</label>
      <input
        type="text"
        id="youExpense"
        value={userExpense}
        onChange={(e) =>
          localDispatch({
            type: "SET_USER_EXPENSE",
            payload:
              Number(e.target.value) > bill ? bill : Number(e.target.value),
          })
        }
      />

      <label htmlFor="friendExpense">
        👨🏻‍🤝‍👩🏻{selectedFriend.name}'s expense
      </label>
      <input type="text" id="friendExpense" disabled value={friendExpense} />

      <label htmlFor="whoPaying">🤑Who is paying the bill?</label>
      <select
        id="whoPaying"
        value={whoPaying}
        onChange={(e) =>
          localDispatch({
            type: "SET_WHO_PAYING",
            payload: e.target.value,
          })
        }
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  ) : null;
}
