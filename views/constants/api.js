// 所有API地址

export function interfaceUrl(key) {
  var apis = [];
  
	//登录
  apis['LOGIN'] = 'api/auth/login';
  
	//注册
  apis['REGISTER'] = 'api/user/register';
  
	//创建需求
  apis['CREATE_CASE'] = 'api/case';

  // 需求列表查询
  apis['SEARCH_CASE'] = 'api/case/all?match=$&status=$&type=$&per_size=$&page_no=$';

  //获取Issues
  apis['GET_BLOG'] = 'api/blog/get_blog';
  
  return apis[key];
}
