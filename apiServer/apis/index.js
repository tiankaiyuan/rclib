/**
 * Created by tiankaiyuan on 2018/3/8.
 */
import Service   from '../service'
const saveComponentSize = async(ctx) => {
    await Service.saveComponentSize(ctx.query.value);
    ctx.body = {code:0,msg:'保存成功'};
};
export default {
    saveComponentSize
}