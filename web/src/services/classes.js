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
