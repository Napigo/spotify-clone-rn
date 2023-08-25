import { AxiosError } from "axios";
import { apis } from ".";

interface SeveralCategoriesResponse {
  categories: {
    items: {
      id: string;
      name: string;
    }[];
  };
}

export async function fetchCategories(): Promise<SeveralCategoriesResponse> {
  try {
    const response = await apis.callApi({
      url: `v1/browse/categories?limit=3&country=SG&`,
    });
    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      return Promise.reject({
        code: response.status,
        data: response.data,
      });
    }
  } catch (err) {
    const error = err as AxiosError;
    return Promise.reject({
      code: error.code,
      data: error.response?.data,
    });
  }
}
