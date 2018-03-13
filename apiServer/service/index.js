/**
 * Created by tiankaiyuan on 2018/3/10.
 */
import {Component} from '../models'
class Service {
    async saveComponentSize(size) {
        const component = new Component({
            width: size
        });
        return await component.save()
    }
}
export default new Service;