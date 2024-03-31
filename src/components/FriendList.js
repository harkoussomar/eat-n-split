import { useFawAway } from "../contexts/SplitBillContext";
import Friend from "./Friend";

export default function FriendList() {
  const { friends } = useFawAway();

  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
        />
      ))}
    </ul>
  );
}