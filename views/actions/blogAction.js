import * as ACTION from '../constants/types/blogTypes';
import { packageReq } from '../helpers/request';

export function get_blog(callback) {
  var payload = packageReq('GET_BLOG', null, null, 'GET');
  return {
    type: ACTION.GET_BLOG,
    payload,
    callback,
    success: [
      {
        action: ({ msg }) => window.UI.message.success(msg),
        type: 'function'
      }
    ]
  }
}
