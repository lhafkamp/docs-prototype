import { combineReducers } from 'redux';
import currentLanguage from './currentLanguage';
import currentIntegration from './currentIntegration';

const rootReducer = combineReducers({ currentLanguage, currentIntegration });

export default rootReducer;
