#!/bin/bash
HOST=$1
USER=tky
ProjectDir=./codingzx
#判断 HOST 是否为空
if [ ! $HOST ]; then
echo 'Host is empty'
exit 0
else
    echo host is $HOST
fi
#判断 ProjectDir 是否为空目录
if [ ! -d "$ProjectDir" ]; then
    mkdir $ProjectDir
else
    echo ProjectDir is $ProjectDir
fi
npm run build
rm -rf ./server/dist
mv ./dist ./server/
cp -rf ./db ./lib ./routes ./view ./log ./utils ./spiders ./server ./server/package.json ./appServer.yml ./appOther.yml ./.babelrc $ProjectDir
#删除本地日志
rm $ProjectDir/log/logMsg/*.*
#删除本地缓存
#rm $ProjectDir/spiders/sfCache
#rm $ProjectDir/spiders/cacheId
echo “Starting to sftp…”
tar cvzf s.tar.gz --exclude $ProjectDir/spiders/sfCache --exclude $ProjectDir/spiders/cacheId  $ProjectDir ./watcher.js ./recievPart.sh ./recievPut.sh
rm -rf $ProjectDir
sftp ${USER}@${HOST} <<EOF
put s.tar.gz
bye
EOF
echo “done”
rm *.gz
