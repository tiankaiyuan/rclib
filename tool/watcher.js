/**
 * Created by tiankaiyuan on 2017/11/14.
 */
/**
 * 以逗号分隔 逗号之前为要监视的文件，逗号之后要执行的程序
 * 当逗号之前任意一个文件发生变化，则后面的所有程序都将执行
 *
 */
const path = require('path');
const events = require('events');
const fs = require('fs');
const {exec}  = require('child_process');
const args = process.argv.slice(2);
console.log('targets and exec program', args);
class LocalEvents extends events {
}
const lE = new LocalEvents();

if (args.length < 1) {
    console.log('no target');
    return;
}
let watchTargets = args.slice(0, args.indexOf(',')),
    watchers = [],
    timeId = '',
    subProcess = {},
    execPrograms = args.slice(args.indexOf(','));

for (let i = 0; i < watchTargets.length; i++) {
    let targetPath = path.resolve(__dirname, watchTargets[i]);
    //监视使用编辑器改变的文件 回掉函数只调用一次 因为编辑器会 执行类似 mv tempFile targetFile 操作
    let watcher = fs.watch(targetPath, {}, function () {
        clearTimeout(timeId);
        timeId = setTimeout(() => {
            lE.emit('change');
        }, 300);//300 毫秒内重复改变只触发一次事件
    });
    watcher.on('error', (err) => {
        console.log(err)
    });
    watchers.push(watcher);
}

const handleChange = () => {
    let baseExe = 'node ';
    for (let i = 0; i < execPrograms.length; i++) {
        let extendName = execPrograms[i].split('.');
        extendName = extendName[extendName.length - 1];
        if (extendName == 'sh') {
            baseExe = ''
        }
        subProcess[execPrograms[i]] && subProcess[execPrograms[i]].kill();
        subProcess[execPrograms[i]] = exec(baseExe + path.resolve(__dirname, execPrograms[i]));
        // console.log('stdout',sbp.stdout);
        subProcess[execPrograms[i]].stdout.on('data', (data) => {
            console.log(data)
        });

    }
};

lE.on('change', handleChange);
process.on('SIGINT', () => {
    for (let i in subProcess) {
        if (subProcess.hasOwnProperty(i)) {
            subProcess[i].kill();
        }
    }
    console.log('\n sub process killed');
    process.exit(0);
});
process.on('exit', () => {
    for (let i = 0; i < watchers.length; i++) {
        watchers[i].close();
    }
    console.log('\n watchers closed');
});
process.on('error',error=>{
    console.error(error)
})