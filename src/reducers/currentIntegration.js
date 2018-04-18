function changeIntegration(state = [], action) {
  switch(action.type) {
    case 'CHANGE_INTEGRATION' :
      return action.currentIntegration
    default:
      return state;
  }
}

export default changeIntegration;
