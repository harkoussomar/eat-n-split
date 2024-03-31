import { createContext, useContext, useReducer } from "react";
const SplitBillContext = createContext();

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

const initialState = {
  friends: initialFriends,
  showAddFriend: false,
  selectedFriend: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SHOW_ADD_FRIEND":
      return { ...state, showAddFriend: !state.showAddFriend };
    case "ADD_NEW_FRIEND":
      return {
        ...state,
        friends: [...state.friends, action.payload],
        showAddFriend: false,
      };
    case "SELECT_FRIEND":
      return {
        ...state,
        selectedFriend:
          state.selectedFriend?.id === action.payload.id
            ? null
            : action.payload,
      };
    case "BILL_SUBMIT":
      return {
        ...state,
        friends: state.friends.map((friend) =>
          friend.id === state.selectedFriend?.id
            ? { ...friend, balance: friend.balance + action.payload }
            : friend
        ),
        selectedFriend: null,
      };
    default:
      return state;
  }
}

function SplitBillProvider({ children }) {
  const [{ friends, showAddFriend, selectedFriend }, dispatch] = useReducer(
    reducer,
    initialState
  );



  return (
    <SplitBillContext.Provider
      value={{
        friends,
        selectedFriend,
        showAddFriend,
        dispatch
      }}
    >
      {children}
    </SplitBillContext.Provider>
  );
}

function useFawAway() {
  const context = useContext(SplitBillContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside of CitiesProvider");
  return context;
}

export { SplitBillProvider, useFawAway };
