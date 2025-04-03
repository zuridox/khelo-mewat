/* get course data */
export const getCourse = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/course/details/${id}`
  );
  const course = await response.json();
  return course;
};

/* update course data */
export const updateCourseInfo = async (courseData, id) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/course/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${localStorage.getItem("access-token")}`,
    },
    body: JSON.stringify(courseData),
  });

  const data = await response.json();
  return data;
};

// delete a course
export const deleteCourse = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/course/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
  })
  const result = await response.json()
  return result
}