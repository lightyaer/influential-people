export const getUsers = async () => {
  return await fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
    res.json()
  );
};

export const createUser = async () => {
  return await fetch("https://randomuser.me/api").then((res) => res.json());
};
