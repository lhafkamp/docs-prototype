import { combineReducers } from 'redux';
import currentLanguage from './currentLanguage';
import currentIntegration from './currentIntegration';
import currentProviderChoice from './currentProviderChoice';
import currentEditionChoice from './currentEditionChoice';

const rootReducer = combineReducers({ 
	currentLanguage, currentIntegration, currentProviderChoice, currentEditionChoice 
});

export default rootReducer;
