// 引入mysql
const mysql = require('mysql');
// 创建连接对象
const connection = mysql.createConnection({
    host : 'localhost',   // 数据库的地址
    user : 'root',        // 用户名
    password : 'root',        // 密码
    database : 'supermarket', // 要连接的数据库名
    port: '3306',     // 端口号 
    multipleStatements: true // 允许执行多条sql语句
})
// 执行连接
connection.connect();
console.log('连接数据库成功')

module.exports=connection;