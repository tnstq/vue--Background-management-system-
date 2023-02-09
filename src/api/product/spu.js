import request from '@/utils/request';
//获取SPU列表数据的方法
// GET /admin/product/{page}/{limit}
export const reqSpuList = (page,limit,category3Id) => request({url:`/admin/product/${page}/${limit}`,method:'get',params:{category3Id}});

//获取spu信息
// GET /admin/product/getSpuById/{spuId}
export const reqSpu = (spuId) => request({url:`/admin/product/getSpuById/${spuId}`,method:'get'});

//获取品牌的信息
// GET /admin/product/baseTrademark/getTrademarkList
export const reqTradeMarkList = ()=> request({url:'/admin/product/baseTrademark/getTrademarkList',method:'get'});

//获取SPU图片的接口
// GET /admin/product/spuImageList/{spuId}
export const reqSpuImageList = (spuId) => request({url:`/admin/product/spuImageList/${spuId}`,method:'get'});

//获取平台全部的销售属性
// GET /admin/product/baseSaleAttrList
export const reqBaseSaleAttrList = () => request({url:'/admin/product/baseSaleAttrList',method:'get'});

//修改SPU||添加SPU
export const reqAddOrUpdateSpu = (spuInfo) => {
    //携带的参数带有id---修改spu
    if(spuInfo.id){
        return request({url:'/admin/product/updateSpuInfo',data:spuInfo,method:'post'})
    }else{
        //添加spu
        return request({url:'/admin/product/saveSpuInfo',data:spuInfo,method:'post'})
    }
}

//删除Spu的接口
// DELETE /admin/product/deleteSpu/{spuId}
export const reqDeleteSpu = (spuId) => request({url:`/admin/product/deleteSpu/${spuId}`,method:'delete'})


//获取图片的接口
//GET /admin/product/spuImageList/{spuId}
export const reqSpuImageList2 = (spuId) => request({url:`/admin/product/spuImageList/${spuId}`,method:'get'});

//获取销售属性的数据
// GET /admin/product/spuSaleAttrList/{spuId}
export const reqSpuSaleAttrList = (spuId) => request({url:`/admin/product/spuSaleAttrList/${spuId}`,method:'get'});

//获取平台属性的数据
//GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrInfoList = (category1Id,category2Id,category3Id) => request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'get'});

//添加sku
//POST /admin/product/saveSkuInfo
export const reqAddSku = (skuInfo) => request({url:'/admin/product/saveSkuInfo',data:skuInfo,method:'post'}) 

//获取SKU列表数据的接口
//GET /admin/product/findBySpuId/{spuId}
export const reqSkuList = (spuId) => request({url:`/admin/product/findBySpuId/${spuId}`,method:'get'})