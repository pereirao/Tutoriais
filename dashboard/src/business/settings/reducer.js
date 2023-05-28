// @flow

type Settings = {
  working_hours: Array<Object>
}

export const settingsReducer = (state: settings_reducer = {}, action: Action) => {
  switch (action.type){
    case 'SETTINGS:FETCH__SUCCESS':
      return {...state, ...(action.payload.settings || {})};
    default:
      return state;
  }
};

export type LocalState = {
  settings_reducer: Settings
};

export default settingsReducer;
