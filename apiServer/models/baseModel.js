/**
 * Created by tiankaiyuan on 2018/3/11.
 */
export default (schema) => {
    schema.virtual('getObj').get(function () {
        let obj = {};
        for (let key in params) {
            if (params.hasOwnProperty(key)) {
                obj[key] = this[key];
            }
        }
        obj.id = this._id;
        return obj
    });
}