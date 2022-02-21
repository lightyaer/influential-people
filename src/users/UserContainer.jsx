import { useEffect, useState } from "react";
import UserSearchBar from "./UserSearchBar";
import UserList from "./UserList";
import { createUser, getUsers } from "../user.service";

function UserContainer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUsers()
      .then((users) => {
        setUsers(users);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  const onInput = (e) => {
    setSearchTerm(e.target.value);
  };

  const onSearch = async () => {
    if (!searchTerm) {
      setFilteredUsers(users);
      return;
    }
    setFilteredUsers(
      users.filter((user) => {
        return user.name.toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  };

  const onReset = () => {
    setSearchTerm("");
    setFilteredUsers([]);
    setUsers(users);
  };

  const newUser = async () => {
    const response = await createUser();
    const user = response["results"][0];
    const newUser = {
      name: `${user["name"]["first"]} ${user["name"]["last"]}`,
      email: user["email"],
      username: user["login"]["username"],
      id: users.length + 1,
    };
    setUsers([...users, newUser]);
  };

  return (
    <div className="flex flex-col m-auto w-2/3">
      <UserSearchBar
        onInput={onInput}
        onSearch={onSearch}
        onReset={onReset}
        onNew={newUser}
        searchTerm={searchTerm}
      />
      <UserList
        users={filteredUsers.length ? filteredUsers : users}
        loading={loading}
        error={error}
        searchTerm={searchTerm}
      />
    </div>
  );
}

export default UserContainer;
