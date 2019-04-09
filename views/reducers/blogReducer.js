import * as BLOG_ACTION from '../constants/types/blogTypes';
import { stateStructure } from './_stateStructure.js';

export default function get_blog(state = stateStructure.blog, action) {
  switch (action.type) {
		// // 注册
		// case USER_ACTION.REGISTER:{
    //   setImmediate(() => document.location.hash = '#/auth/login')
		// 	return state;
    // }

		// // 登录&获取个人信息
    // case USER_ACTION.LOGIN:{
    //   const { result, user }  = action;
    //   $.setCookie('auth', result.data.token, 24 * 3600);
    //   $.setCookie(result.data.username, result.data.user_id, 24 * 3600);
    //   if(user.remember){
    //     $.setCookie('username', user.username, 24*3600*30);
    //     $.setCookie('password', user.password, 24*3600*30);
    //   }else{
    //     $.delCookie('username');
    //     $.delCookie('password');
    //   }
    //   window.AUTH_TOKEN = result.data.token;
    //   window.AUTH_USERNAME = result.data.username;
    //   setImmediate(() => document.location.hash = '#/')
		// 	return state;
    // }
    case BLOG_ACTION.GET_BLOG: {
      console.log('yes');
      return state;
    }

    default:
      return state;
  }
}
