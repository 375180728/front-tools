import * as ACTION from '../constants/types/baseTypes';
import { stateStructure } from './_stateStructure.js';

export default function base(state = stateStructure.base, action) {
  switch (action.type) {
    case ACTION.SAY_HELLO: {
      const welcome = 'welcome to use template!!';
      return {
        ...state,
        welcome: welcome
      }
    }
    default:
      return state;
  }
}
