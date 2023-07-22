import { createContext, useState } from 'react';

import { ThemeType } from '@todo-react/shared/domain';

export type ThemeContextType = {
  theme: ThemeType;
  changeTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: ThemeType.LIGHT,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  changeTheme: () => {},
});

export interface ThemeProviderProps {
  children: JSX.Element;
}

export function ThemeProvider(props: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeType>(ThemeType.LIGHT);

  const changeTheme = () => {
    setTheme(theme === ThemeType.LIGHT ? ThemeType.DARK : ThemeType.LIGHT);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
