let baseUrl = 'http://127.0.0.1:999'
export default {
  // 查询一个
  getStoreroomOne: `${baseUrl}/storeroom/getStoreroomOne`,
  // 分页
  getStoreroomList: `${baseUrl}/storeroom/getStoreroomList`,
  // 入库
  joinStoreroom: `${baseUrl}/storeroom/joinStoreroom`,
  // 出库
  outStoreroom: `${baseUrl}/storeroom/outStoreroom`,
  // 修改
  redactStoreroom: `${baseUrl}/storeroom/redactStoreroom`
}