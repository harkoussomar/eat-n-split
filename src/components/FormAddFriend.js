import { useState } from "react";
import Button from "./Button";
import { useFawAway } from "../contexts/SplitBillContext";

export default function FormAddFriend() {
  const {dispatch, showAddFriend } = useFawAway();


  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  function handleAddNewFriend(e) {
    e.preventDefault();

    if (!image || !name) return;
    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    dispatch({ type: "ADD_NEW_FRIEND", payload: newFriend });

    console.log(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return showAddFriend ? (
    <form className="form-add-friend" onSubmit={handleAddNewFriend}>
      <label htmlFor="friendName">🧑‍🤝‍🧑 Friend name</label>
      <input
        type="text"
        id="friendName"
        value={name}
        onChange={(e) => setName((cur) => e.target.value)}
      />

      <label htmlFor="imageURL">🖼️ Image URL</label>
      <input
        type="text"
        id="imageURL"
        value={image}
        onChange={(e) => setImage((cur) => e.target.value)}
      />

      <Button>Add</Button>
    </form>
  ) : null;
}
