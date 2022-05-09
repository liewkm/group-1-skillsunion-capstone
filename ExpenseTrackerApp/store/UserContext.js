/*----  
  Global context
----*/

import { createContext, useState } from 'react';

// Create context objext

export const UserContext = createContext();

/*
function UserTokenContextProvider({ children }) {
  const [token, setToken] = useState();
  return (
    <UserContext.Provider value={{ token, setToken }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserTokenContextProvider;
*/