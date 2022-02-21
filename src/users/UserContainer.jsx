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
  const [csvLink, setCsvLink] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

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

  const onSearch = () => {
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

  const editContent = (field, id, e) => {
    if (filteredUsers.length > 0) {
      const newUsers = filteredUsers.map((user) => {
        if (user.id === id) {
          user[field] = e.target.innerText;
        }
        return user;
      });
      setFilteredUsers(newUsers);
    } else {
      const newUsers = users.map((user) => {
        if (user.id === id) {
          user[field] = e.target.innerText;
        }
        return user;
      });
      setUsers(newUsers);
    }
    onSearch();
  };

  const newUser = async () => {
    const response = await createUser();
    const user = response["results"][0];
    const newUser = {
      name: `${user["name"]["first"]} ${user["name"]["last"]}`,
      email: user["email"],
      username: user["login"]["username"],
      id: users.length + 1,
      address: {
        city: user["location"]["city"],
        geo: {
          lat: user["location"]["coordinates"]["latitude"],
          lng: user["location"]["coordinates"]["longitude"],
        },
      },
    };
    setUsers([...users, newUser]);
  };

  const exportToCsv = () => {
    let csvContentPrefix = "data:text/csv;charset=utf-8,";
    let csvContent = `id, name, email, username\n`;
    if (filteredUsers.length > 0) {
      filteredUsers.forEach((user) => {
        csvContent += `${user.id}, ${user.name}, ${user.email}, ${user.username}\n`;
      });
    } else {
      users.forEach((user) => {
        csvContent += `${user.id}, ${user.name}, ${user.email}, ${user.username}\n`;
      });
    }

    setCsvLink(encodeURI(csvContentPrefix + csvContent));
  };

  const openMaps = ({ lat, lng }) => {
    setCurrentLocation({ lat, lng });
  };

  return (
    <div className="flex flex-col m-auto w-2/3">
      <UserSearchBar
        onInput={onInput}
        onSearch={onSearch}
        onReset={onReset}
        onNew={newUser}
        exportToCsv={exportToCsv}
        searchTerm={searchTerm}
      />
      {csvLink && (
        <a download="users.csv" target="_blank" href={csvLink}>
          Click here to Download CSV
        </a>
      )}
      <UserList
        users={filteredUsers.length ? filteredUsers : users}
        loading={loading}
        error={error}
        searchTerm={searchTerm}
        editContent={editContent}
        openMaps={openMaps}
      />

      {currentLocation && (
        <div
          className="mt-12"
          dangerouslySetInnerHTML={{
            __html: `<div class="mapouter"><div class="gmap_canvas"><iframe class="gmap_iframe" width="100%" src="https://maps.google.com/maps?width=660&amp;height=400&amp;hl=en&amp;q=${currentLocation.lat},${currentLocation.lng}&amp;t=&amp;z=3&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe><a href="https://kokagames.com/">FNF Mods</a></div><style>.mapouter{position:relative;text-align:right;width:100%;height:400px;}.gmap_canvas {overflow:hidden;background:none!important;width:100%;height:400px;}.gmap_iframe {height:400px!important;}</style></div>`,
          }}
        />
      )}
    </div>
  );
}

export default UserContainer;
