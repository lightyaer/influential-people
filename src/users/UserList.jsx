import React from "react";

function UserList({
  users,
  loading,
  error,
  searchTerm,
  editContent,
  openMaps,
}) {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  const regex = new RegExp(searchTerm, "gi");
  const isContentEditable = true;

  return (
    <table>
      <thead>
        <tr>
          <th align="left">ID</th>
          <th align="left">Name</th>
          <th align="left">Email</th>
          <th align="left">Username</th>
          <th align="left">Location</th>
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
                      contentEditable={isContentEditable}
                      suppressContentEditableWarning="true"
                      onBlur={(e) => editContent("name", user.id, e)}
                      dangerouslySetInnerHTML={{
                        __html: user.name.replace(
                          regex,
                          (match) => `<span class="highlight">${match}</span>`
                        ),
                      }}
                    />
                  ) : (
                    <td
                      contentEditable={isContentEditable}
                      suppressContentEditableWarning="true"
                      onBlur={(e) => editContent("name", user.id, e)}
                    >
                      {user.name}
                    </td>
                  )
                ) : (
                  <td
                    contentEditable={isContentEditable}
                    suppressContentEditableWarning="true"
                    onBlur={(e) => editContent("name", user.id, e)}
                  >
                    {user.name}
                  </td>
                )}
                <td
                  contentEditable={isContentEditable}
                  suppressContentEditableWarning="true"
                  onBlur={(e) => editContent("email", user.id, e)}
                >
                  {user.email}
                </td>
                <td
                  contentEditable={isContentEditable}
                  suppressContentEditableWarning="true"
                  onBlur={(e) => editContent("username", user.id, e)}
                >
                  {user.username}
                </td>
                <td>
                  <button
                    className="btn_location"
                    onClick={() => openMaps(user.address.geo)}
                  >
                    {user.address.city}
                  </button>
                </td>
              </tr>
            ))
          : null}
      </tbody>
    </table>
  );
}

export default UserList;
