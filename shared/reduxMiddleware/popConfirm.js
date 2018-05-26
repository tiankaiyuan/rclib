/**
 * Created by tiankaiyuan on 2017/8/7.
 */
import {
    POP_CONFIRM,
    POP_HIDDEN
} from '../stateChanger/actions/actionTypes'
import {popHidden} from '../stateChanger/actions'
let needConfirm = false, actionCopy;
export default store => next => action => {
    if (action.waitToConfirm) {
        needConfirm = true;
        actionCopy = action;
        return;
    }
    if (needConfirm) {
        if (action.type === POP_CONFIRM) {
            next(actionCopy);
            store.dispatch(popHidden(action.id));
            needConfirm = false;
            return;
        } else if (action.type === POP_HIDDEN) {
            needConfirm = false;
            actionCopy = null;
        }
    }
    return next(action)
}