import React, { useReducer } from "react";
import UserReducer from "../reducer/UserReducer"

const defaultUserState = {
  id: "",
  name: "",
  email: "",
  loggedIn: false
};

export default function Context({ children }) {
  const [userState, dispatchUserState] = useReducer(
    UserReducer,
    defaultUserState
  );
  return (
    <UserContext.Provider value={[userState, dispatchUserState]}>
      {children}
    </UserContext.Provider>
  );
}

export const UserContext = React.createContext(defaultUserState);