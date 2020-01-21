/* 获取仓库数据接口  */

var express = require('express');
var router = express.Router();

// 引入数据库连接模块
const connection = require('./js/conn')

//统一设置响应头
router.all('*', (req, res, next) => {
  //设置跨域
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE");
  next();
})

/* 查询一个 已完成 */
router.post('/getStoreroomOne', (req, res) => {
  // 接收所有数据
  let {
    code
  } = req.body;
  //准备sql
  let sqlStr = `select * from commodity where code="${code}"`;
  //    执行sql
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    res.send({
      code: 0,
      data: data,
      msg: "查询成功"
    });
  })
});

/* 修改 已完成 */
router.post('/redactStoreroom', (req, res) => {
  // 接收所有数据
  let {
    code,
    name,
    unit,
    price,
    number,
    time,
    id
  } = req.body;
  //准备sql
  let sqlStr = `update commodity set code="${code}", name="${name}", unit="${unit}", price="${price}", number="${number}", time="${time}" where id="${id}";`;
  //    执行sql
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    res.send({
      code: 0,
      data: data,
      msg: "修改成功"
    });
  })
});

/* 查询分页 已完成 */
router.post('/getStoreroomList', (req, res) => {
  // 接收参数
  let {
    currentPage,
    code,
    name,
    time,
    type
  } = req.body;
  // 准备sql
  let sqlStr = `select * from commodity where 1=1`
  // 定义变量 保存数总条数
  // 如果code为空 就查询所有
  if (code !== '') {
    sqlStr += ` and code LIKE "%${code}%"`
  }
  // 如果name为空 就查询所有
  if (name !== '') {
    sqlStr += ` and name LIKE "%${name}%"`
  }
  // 如果time为空 就查询所有
  if (time !== '' && time != null) {
    sqlStr += ` and time="${time}"`
  }
  if (type === '缺货') {
    sqlStr += ` and number<=0`
  }
  // 拼接排序
  sqlStr += ` order by id desc`;
  // 执行sql
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    // 计算总条数
    let total = data.length;
    // 计算跳过多少条
    let n = (currentPage - 1) * 10;
    // 拼接分页
    sqlStr += ` limit ${n}, ${10}`;
    // 执行sql
    connection.query(sqlStr, (err, data) => {
      if (err) throw err;
      //判断受影响行数
      if (data.length) {
        res.send({
          code: 0,
          total: total,
          data: data,
          msg: "查询分页成功"
        });
      } else {
        res.send({
          code: 1,
          total: total,
          data: data,
          msg: "请检查查询条件是否正确"
        });
      }
    })
  })
});

/* 入库 已完成 */
router.post('/joinStoreroom', (req, res) => {
  // 接收所有数据
  let commodity = req.body;
  //准备sql
  let sqlStr = `insert into commodity(name, price, number, unit, code, time) values`;
  let end = commodity.length - 1;
  for (let i = 0; i <= end; i++) {
    let value;
    if (i < end) {
      value = `("${commodity[i].name}", ${commodity[i].price}, ${commodity[i].number}, "${commodity[i].unit}", "${commodity[i].code}", "${commodity[i].time}"),`
    } else {
      value = `("${commodity[i].name}", ${commodity[i].price}, ${commodity[i].number}, "${commodity[i].unit}", "${commodity[i].code}", "${commodity[i].time}");`
    }
    sqlStr += value
  }
  //    执行sql
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    //判断受影响行数
    if (data.affectedRows > 0) {
      res.send({
        code: 0,
        msg: "入库成功"
      });
    } else {
      res.send({
        code: 1,
        msg: "入库失败"
      });
    }
  })
});

/* 出库 已完成 */
router.post('/outStoreroom', (req, res) => {
  // 接收所有数据
  let outList = req.body;
  //准备sql
  let sqlStr = 'select * from commodity';
  //    执行sql
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < outList.length; j++) {
        if (data[i].id === outList[j].id) {
          let number = data[i].number - outList[j].number
          sqlStr = `update commodity set number=${number} where id=${outList[j].id};`
          if (j === outList.length -1) {
            // 执行sql
            connection.query(sqlStr, (err, data) => {
              if (err) throw err;
              //判断受影响行数
              console.log(data)
              if (data.affectedRows > 0) {
                res.send({
                  code: 0,
                  msg: "出库成功"
                });
              } else {
                res.send({
                  code: 1,
                  msg: "出库失败"
                });
              }
            })
            return false
          }
        }
      }
    }
  })
});

module.exports = router;