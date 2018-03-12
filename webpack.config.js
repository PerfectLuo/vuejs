var webpack = require('webpack');
//加载webpack
//webpack抽离工具
var ET = require('extract-text-webpack-plugin');

// 配置一些东西 commonjs规范
module.exports = {
	//入口  entry:文件名'./entry.js'或者__dirname+'/entry.js'
	// entry:'./src/app.js',
	entry:__dirname+'/src/app.js',
	//出口 输出一个对象
	output:{
		//输出到什么地方   __dirname是nodejs的内容,意思是输出到当前文件夹
		path:__dirname+'/prd/',
		//输出的文件名
		filename:'bundle.js'
		//版本号控制
		// filename:'bundle-[hash].js'

	},
	devtool:'source-map', 
	//module是个对象,引入css
	module:{
		loaders:[
		//正则表达式匹配
			{
				//$表示结束
				test:/\.css$/,
				//碰到.css文件就用刚刚安装的两个loader解析，先用css解析，再用style解析，注意顺序
				//style-loader
				loader:'style-loader!css-loader'
			},{
				test:/\.js$/,
				//es6的编译
				loader:'babel-loader?presets[]=es2015'
			},{
				test:/\.scss$/,
				//和css配合使用，从后往前解析
				// loader:'style-loader!css-loader!sass-loader'
				loader:ET.extract(['css-loader', 'sass-loader'])
				// loader:ET.extract(['style-loader', 'css-loader!sass-loader'])
				// ！隔开是串行   ，隔开两组是并行
				
			}
		]
	},
	
  	devServer:{
  		// //指定server在哪个目录下启动（默认启动在根目录下）
  		// contentBase:__dirname+'/prd',
  		// //端口号
  		// port:8080,
  		// //主机名
  		// host:'localhost',
  		// //外边的--inline可以不加了
  		// // inline:true,
  		proxy:{
  			//
  			'/api':{
  				target:'http://localhost:3000',
  				pathRewrite:{
  					'^/api':''
  				}
  			}
  		}

  	},
  	plugins:[
		//压缩
		// new webpack.optimize.UglifyJsPlugin(),
		//新建一个css文件
		new ET ('bundle.css')

  	]
	
}
