import api from "./api";

export async function getUsers(filters = {}) {
  try {
    var strFilters = "?";

    if (filters?.type) {
      strFilters += "type=" + filters.type + "&";
    }

    if (filters?.name) {
      strFilters += "name=" + filters.name + "&";
    }

    if (filters?.id) {
      strFilters += "id=" + filters.id + "&";
    }

    const { status, data } = await api.get("/users/" + strFilters);
    if (status === 200) {
      return data;
    } else {
      return [];
    }
  } catch (error) {
    throw error;
  }
}
