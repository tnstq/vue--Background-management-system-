//将四个模块请求的接口数统一暴露
import * as trademark from './product/tradeMark'
import * as attr from './product/attr'
import * as spu from './product/spu'
import * as sku from './product/sku'

//引入权限相关的接口文件
import * as user from './acl/user';
import role from './acl/role';
import permission from './acl/permission'

export default{
    trademark,
    attr,
    spu,
    sku,
    user,
     role,
     permission
}