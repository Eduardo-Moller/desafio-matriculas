import api from "./api";

export async function postClasses(bodyData) {
  try {
    const { status, data } = await api.post("/classes/", bodyData);

    if (status === 201) {
      return data;
    } else {
      new Error("Error creating class");
    }
  } catch (error) {
    throw error;
  }
}

export async function getClasses() {
  try {
    const { status, data } = await api.get("/classes/");

    if (status === 200) {
      return data;
    } else {
      new Error("Error fetching classes");
    }
  } catch (error) {
    throw error;
  }
}

export async function postEnroll(bodyData) {
  try {
    const { status, data } = await api.post("/classes/enroll", bodyData);

    if (status === 201) {
      return data;
    } else {
      new Error("Error enrolling student");
    }
  } catch (error) {
    throw error;
  }
}

export async function getEnrollments(filters = {}) {
  try {
    var strFilters = "?";

    if (filters?.id) {
      strFilters += `id=${filters.id} &`;
    }

    if (filters?.users_id) {
      strFilters += `users_id= ${filters.users_id} &`;
    }

    const { status, data } = await api.get("/classes/enroll" + strFilters);

    if (status === 200) {
      return data;
    } else {
      new Error("Error fetching enrollments");
    }
  } catch (error) {
    throw error;
  }
}
