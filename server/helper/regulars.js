// 钱格式
module.exports.MONEY = /^[0-9]+(\.[0-9]{0,2})?$/;

// 正整数
module.exports.POS_INTEGER = /^[1-9]+([0-9]*\d)?$/;

// 邮箱
module.exports.EMAIL = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

// 用户名 4-16位
module.exports.ACCOUNT = /^[a-zA-Z0-9_-]{4,16}$/;
