#!/bin/bash
HOST=$1
USER=$2
ProjectDir=$3
#判断 HOST 是否为空
if [ ! $HOST ]; then
echo 'Host is empty'
exit 0
else
    echo Host is $HOST
fi
if [ ! $USER ]; then
echo 'User is empty'
exit 0
else
    echo User is $USER
fi
if [ ! $ProjectDir ]; then
echo 'project path is empty'
exit 0
fi
#判断 ProjectDir 是否为空目录
if [ ! -d "$ProjectDir" ]; then
    mkdir $ProjectDir
else
    echo ProjectDir is $ProjectDir
fi
npm run build
cp -rf ./server ./logger ./.babelrc ./appServer.config.js ./lib ./shared ./client   $ProjectDir

node ./tool/publishPackage.js page $ProjectDir/package.json

tar cvzf s.tar.gz  $ProjectDir ./tool/recievAll.sh ./tool/watcher.js
rm -rf $ProjectDir
echo Starting to sftp
sftp ${USER}@${HOST} <<EOF
put s.tar.gz
bye
EOF
echo done
rm *.gz
