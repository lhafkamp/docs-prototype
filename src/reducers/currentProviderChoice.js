function changeProviderChoice(state = [], action) {
  switch(action.type) {
    case 'CHANGE_PROVIDER_CHOICE' :
      return action.currentProviderChoice
    default:
      return state;
  }
}

export default changeProviderChoice;
