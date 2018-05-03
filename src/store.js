import { createStore } from 'redux';
import rootReducer from './reducers/index';

const defaultState = {
	currentLanguage: 'Ruby',
	currentIntegration: 'Nginx',
	currentProviderChoice: 'AWS',
	currentEditionChoice: 'os'
};

const store = createStore(rootReducer, defaultState);

export default store;
