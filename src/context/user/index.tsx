import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { setUserDetails } from "../../utils/user";
import { apiAuth } from "../../helpers/api";

export type UserType = {
  id: number;
  name: string;
  email: string;
  telephone: string;
  birthDate: string;
  uf: string;
  notifications: string[];
};

interface UserProviderProps {
  children: ReactNode;
}

type PropUserContext = {
  state: UserType;
  setState: React.Dispatch<React.SetStateAction<UserType>>;
};

const DEFAULT_VALUE = {
  state: {
    id: 0,
    name: "",
    email: "",
    telephone: "",
    birthDate: "",
    uf: "",
    notifications: [""],
  },
  setState: () => {},
};

const UserContext = createContext<PropUserContext>(DEFAULT_VALUE);

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [state, setState] = useState(DEFAULT_VALUE.state);

  useEffect(() => {
    const fetchData = async () => {
      await apiAuth.get("/profile").then((res) => {
        setState({ ...res.data });
      });
    };
    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ state, setState }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
export default UserContext;
