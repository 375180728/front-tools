import * as BLOG_ACTION from '../constants/types/blogTypes';
import { stateStructure } from './_stateStructure.js';

export default function get_blog(state = stateStructure.blog, action) {
  switch (action.type) {
    case BLOG_ACTION.GET_BLOG: {
      return state;
    }
    default:
      return state;
  }
}
