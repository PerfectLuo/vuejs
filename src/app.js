// //定义一个模块    用commonhs规范引入文件
require('./styles/app.scss');
//require   .js   可以省略不写
// var string = require('./scripts/common');
// console.log(string+'ss');


//es6
// import Name from './scripts/common';
// console.log(Name)

var common = require('./scripts/common');
common.getList();