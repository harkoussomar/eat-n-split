import Button from "./Button";
import { useState } from "react";

export default function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/");
  function handleAddNewFriend(event) {
    event.preventDefault();

    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/");
  }
  return (
    <form action="" className="form-add-friend" onSubmit={handleAddNewFriend}>
      <label htmlFor="name">👨🏻‍🤝‍👩🏻 Friend name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <label htmlFor="image">📷 Image URL</label>
      <input
        type="text"
        name="image"
        id="image"
        value={image}
        onChange={(event) => setImage(event.target.value)}
      />

      <Button>Select</Button>
    </form>
  );
}
