import React from 'react';

export const options = {
	currentLanguage: 'Ruby',
	currentIntegration: 'Nginx',
	changeLanguage: () => {},
	changeIntegration: () => {}
};

export const OptionsContext = React.createContext(options);
