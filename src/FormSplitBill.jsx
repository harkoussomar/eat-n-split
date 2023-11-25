import Button from "./Button";
import { useState } from "react";

export default function FormSplitBill({ onSelectedFriend, onSplitBill }) {
  const [bill, setBILL] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !paidByUser) return;

    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {onSelectedFriend.name}</h2>

      <label htmlFor="bill">💰 Bill value</label>
      <input
        type="text"
        name="bill"
        id="bill"
        value={bill}
        onChange={(e) => setBILL(Number(e.target.value))}
      />

      <label htmlFor="paidByUser">🕴🏾 Your expense</label>
      <input
        type="text"
        name="paidByUser"
        id="paidByUser"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />

      <label htmlFor="paidByFriend">
        👨🏻‍🤝‍👩🏻 {onSelectedFriend.name}'s expense:
      </label>
      <input
        type="text"
        name="paidByFriend"
        id="paidByFriend"
        disabled
        value={paidByFriend}
      />

      <label htmlFor="whoIsPaying">🤑 Who is paying the bill?</label>
      <select
        name="whoIsPaying"
        id="whoIsPaying"
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{onSelectedFriend.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
