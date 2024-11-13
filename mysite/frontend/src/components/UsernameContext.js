import React, { createContext, useState } from 'react';

// Context 생성
export const UsernameContext = createContext();

// Provider 컴포넌트 생성
export const UsernameProvider = ({ children }) => {
  const [username, setUsername] = useState(null);

  return (
    <UsernameContext.Provider value={{ username, setUsername }}>
      {children}
    </UsernameContext.Provider>
  );
};
