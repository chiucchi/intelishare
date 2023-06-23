import { useContext } from "react";
import { apiAuth } from "../../helpers/api";
import UserContext from "../../context/user";

export const setUserDetails = async () => {
  const { setState } = useContext(UserContext);
  await apiAuth.get("/profile").then((res) => {
    console.log(res.data);
    setState({ ...res.data });
  });
};

export const getUserNotifications = async (): Promise<String[]> => {
  const { data } = await apiAuth.get("/profile/notifications");
  return data;
};
