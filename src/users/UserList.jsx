import React from "react";

function UserList({ users, loading, error, searchTerm }) {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  const regex = new RegExp(searchTerm, "gi");

  return (
    <table>
      <thead>
        <tr>
          <th scope="col" align="left">
            ID
          </th>
          <th scope="col" align="left">
            Name
          </th>
          <th scope="col" align="left">
            Email
          </th>
          <th scope="col" align="left">
            Username
          </th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(users)
          ? users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                {searchTerm ? (
                  user.name.toLowerCase().includes(searchTerm.toLowerCase()) ? (
                    <td
                      dangerouslySetInnerHTML={{
                        __html: user.name.replace(
                          regex,
                          (match) =>
                            `<span class="highlight">${match}</span><span>`
                        ),
                      }}
                    />
                  ) : (
                    <td>{user.name}</td>
                  )
                ) : (
                  <td>{user.name}</td>
                )}
                <td>{user.email}</td>
                <td>{user.username}</td>
              </tr>
            ))
          : null}
      </tbody>
    </table>
  );
}

export default UserList;
