// const crypto = require('crypto-js');

// const a1 = crypto.AES.encrypt('CAN YOU GUASS THE KEY??', 'KEY').toString();
// const a2 = crypto.AES.decrypt(a1, 'KEY').toString(crypto.enc.Utf8);
// const time = new Date();
// console.log()
// const c = crypto.MD5(time.getTime().toString()).toString();
// console.log(c)


async function asyncAwaitFn(str) {
  return await new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve(str)
      }, 1000);
  })
}
const parallel = async () => { //并行执行
  console.time('parallel')
  const parallelOne = asyncAwaitFn('string 1');
  const parallelTwo = asyncAwaitFn('string 2')

  //直接打印
  console.log(await parallelOne)
  console.log(await parallelTwo)

  console.timeEnd('parallel')


}
parallel()