import FormAddFriend from "./components/FormAddFriend";
import FriendList from "./components/FriendList";
import FormSplitBill from "./components/FormSplitBill";
import Button from "./components/Button";
import { useFawAway } from "./contexts/SplitBillContext";

function App() {
  const { dispatch, showAddFriend } = useFawAway();
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList />
        <FormAddFriend />
        <Button onClick={() => dispatch({ type: "SHOW_ADD_FRIEND" })}>
          {showAddFriend ? "Close" : "Add friend "}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

export default App;
