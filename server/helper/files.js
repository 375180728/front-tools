const fs = require('fs')

/**
 * 文件写入
 * @param {} filePath 
 * @param {*} contents 
 */
const writeFile = function(filePath, contents){
  fs.writeFile(filePath, contents + '\n\n', {flag: 'a', encoding: 'utf-8', mode: '0666'}, function(error){
    if(error){
      console.log('文件写入失败');
    }else{
      console.log('文件写入成功');
    }
  })
}


module.exports.writeFile = writeFile;