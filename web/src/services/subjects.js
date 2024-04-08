import api from "./api";

export async function getSubjects(filters = {}) {
  try {
    var strFilters = "?";

    if (filters?.name) {
      strFilters += `name=${filters.name}&`;
    }

    if (filters?.id) {
      strFilters += `id=${filters.id}&`;
    }

    const { status, data } = await api.get("/subjects/" + strFilters);

    if (status === 200) {
      return data;
    } else {
      return [];
    }
  } catch (error) {
    throw error;
  }
}
