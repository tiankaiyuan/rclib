/**
 * Created by tiankaiyuan on 2018/3/8.
 */
import  route  from 'koa-route'
import compose from 'koa-compose'
import Apis    from '../apis'
export default compose([
    route.get('/api/saveComponentSize', Apis.saveComponentSize)
])
