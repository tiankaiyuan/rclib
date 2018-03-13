/**
 * Created by tiankaiyuan on 2018/3/8.
 */
import Service   from '../service'
const saveComponentSize = async(ctx) => {
    ctx.body = await Service.saveComponentSize(ctx.query.value);
};
export default {
    saveComponentSize
}