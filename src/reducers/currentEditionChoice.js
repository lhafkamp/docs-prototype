function changeEditionChoice(state = [], action) {
  switch(action.type) {
    case 'CHANGE_EDITION_CHOICE' :
      return action.currentEditionChoice
    default:
      return state;
  }
}

export default changeEditionChoice;
