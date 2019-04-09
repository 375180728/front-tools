import { interfaceUrl } from '../constants/api'

/**
* 打包请求对象
* @param  {[type]} key       		[请求地址Key]
* @param  {[type]} urlParam  		[URL资源参数，对象数组]
* @param  {[type]} postParam 		[对象/JSON串]
* @param  {[type]} method    		[请求方式 GET, POST, PUT, DELETE  ]
* @param  {[type]} loading    	[是否需要loading遮罩  ]
* @param  {[type]} cache        [是否对数据做本地缓存处理，传入缓存时效，参考cacheService  ]
* @return {[type]}           		[请求对象]
*/
export function packageReq(key, urlParam, postParam, method, loading, cache){

	var req = {};
	req.url = interfaceUrl(key);
	req.method = method;

	if (!req.url) {return;}

	var paramMap = req.url.split("$");

	//URL参数组装
	if (paramMap.length > 1) {

		req.url = '';
		_.forEach(paramMap, function(val, index) {

			if (val === "") {return};

			req.url += val + ( !_.isUndefined(urlParam[index]) ? urlParam[index] : "");

		});

	};

	//POST数据
	req.data = postParam? postParam: undefined;

	//loading 遮罩
	req.loading = loading || false;

	//本地缓存
	if (cache) {

		req.cache = {'key': $.Hex_MD5(key + req.url).substr(0, 8), 'expires': cache};

	};

	//唯一标识
	return req;

}