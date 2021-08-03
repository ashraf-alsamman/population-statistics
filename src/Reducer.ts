import { Action } from "./actions"

export interface State {
  data: any[]
}

const initialState = {
  data: []
}

export const Reducer = (state:State = initialState, action: Action) => {
  switch(action.type){
    case "UPDATE": {
      return {...state, data: [ ...action.payload ]}
    }
    default:
      return state
  }
}