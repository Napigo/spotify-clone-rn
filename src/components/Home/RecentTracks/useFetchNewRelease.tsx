import { useEffect, useState } from "react";
import {
  NewReleaseResponse,
  fetchNewRelease,
} from "../../../modules/api/album.apis";

export const useFetchNewRelease = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<NewReleaseResponse | void>();

  useEffect(() => {
    fetchNewRelease().then((result) => {
      setData(result);
      setLoading(false);
    });
  }, []);
  return { isLoading, data };
};
