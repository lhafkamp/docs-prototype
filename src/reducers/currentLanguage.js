function changeLanguage(state = [], action) {
  switch(action.type) {
    case 'CHANGE_LANGUAGE' :
      return action.currentLanguage
    default:
      return state;
  }
}

export default changeLanguage;
