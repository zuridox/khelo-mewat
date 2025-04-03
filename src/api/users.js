/* added user data to db */
export const addUser = async (user) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/users/${user?.email}`,
    { 
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }
  );
  const data = await response.json();
  return data;
};

/* get user data */
export const getUser = async (email) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${email}`);
  const user = await response.json();
  return user;
};

/* get all the instructors data */
export const getInstructor = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/instructors`);
  const instructors = await response.json();
  return instructors;
};

/* update user data */
export const updateUserInfo = async (userData, id) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${localStorage.getItem('access-token')}`
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  return data;
};