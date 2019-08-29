var fs = require('fs');
var path = require('path');

//解析需要遍历的文件夹
var filePath = path.resolve(__dirname + '/image');
const tinify = require('tinify')
tinify.key = "WpYVeU3DkB5v6oQJRPAijtBhFdP5wn5D";
console.log('正在运行中，请勿关闭！~')
let index = 1
//调用文件遍历方法
fileDisplay(filePath);

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath) {
  //根据文件路径读取文件，返回文件列表
  fs.readdir(filePath, function (err, files) {
    if (err) {
      console.warn('报错啦~', err)
    } else {
      //遍历读取到的文件列表
      files.forEach(function (filename) {
        //获取当前文件的绝对路径
        var filedir = path.join(filePath, filename);
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        fs.stat(filedir, function (eror, stats) {
          if (eror) {
            console.warn('获取文件stats失败');
          } else {
            var isFile = stats.isFile(); //是文件
            var isDir = stats.isDirectory(); //是文件夹
            if (isFile) {
              // 压缩图片
              tinify.fromFile(filedir).toFile(filedir)
              console.log(index++, filedir, '压缩成功~');
            }
            if (isDir) {
              fileDisplay(filedir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
            }
          }
        })
      });
    }
  });
}