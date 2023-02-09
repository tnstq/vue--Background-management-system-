//主要获取的是品牌管理的数据模块
import request from '@/utils/request'
//获取品牌列表的接口
// /admin/product/baseTrademark/{page}/{limit}
export const reqTradeMarkList = (page,limit) => request({url:`/admin/product/baseTrademark/${page}/${limit}`,method:'get'})

//处理添加品牌的操作
// /admin/product/baseTrademark/save
export const reqAddTradeMark = (data) => request({url:'/admin/product/baseTrademark/save',data,method:'post'})

//修改品牌
// /admin/product/baseTrademark/update
export const reqPutTradeMark = (data) => request({url:'/admin/product/baseTrademark/update',data,method:'put'})

//删除品牌
// /admin/product/baseTrademark/remove/{id}
export const reqDeleteTradeMark = (id) => request({url:`/admin/product/baseTrademark/remove/${id}`,method:'delete'})
