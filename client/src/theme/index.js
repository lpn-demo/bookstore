import React from 'react';


export const themes = {
	light: {
		color: '#000',
		headerBg: "light",
		headerVariant: "light",
		success: 'outline-success',
		danger: 'outline-danger',
		light: 'dark'
	},
	dark: {
		color: '#fff',
		headerBg: "dark",
		headerVariant: "dark",
		success: 'success',
		danger: 'danger',
		light: 'light'

	},
};

export const ThemeContext = React.createContext({ theme: themes.dark, toggleTheme: () => {} });