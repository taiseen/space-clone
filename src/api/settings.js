import useAxios from ".";
import { toFormData } from "../util/helpers";

export const updateProfile = (data) => {
  const formData = toFormData(data);
  return useAxios.patch(`/users/profile`, formData);
};
