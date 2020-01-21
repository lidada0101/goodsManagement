/**
 * 作用：这个js 专门用于存储枚举值
 * 使用：import Constents from '@/config/constents.js'
 * 使用：Constents.orderStateMap.get("all")
 * 使用：Constents.orderStateMap.get("10")（单独获取）
 *  */

//订单模块 -- > 订单状态
let orderStateMap = new Map();
orderStateMap.set(1, "待付款");
orderStateMap.set(2, "已取消");
orderStateMap.set(3, "待发货");
orderStateMap.set(4, "已发货");
orderStateMap.set(5, "已收货");
orderStateMap.set(6, "已评价");
orderStateMap.set(7, "退款");
orderStateMap.set('all', [{
    value: 1,
    label: '待付款'
}, {
    value: 2,
    label: '已取消'
}, {
    value: 3,
    label: '待发货'
}, {
    value: 4,
    label: '已发货'
}, {
    value: 5,
    label: '已收货'
}, {
    value: 6,
    label: '已评价'
}, {
    value: 7,
    label: '退款'
}]);
//订单模块 -- > 支付状态
let payStateMap = new Map();
payStateMap.set(1, "未支付");
payStateMap.set(2, "已支付");
payStateMap.set('all', [{
    value: 1,
    label: '未支付'
}, {
    value: 2,
    label: '已支付'
}]);
const constents = {
    orderStateMap: orderStateMap,
    payStateMap: payStateMap
};
export default constents
