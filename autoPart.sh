#!/bin/bash
HOST=$1
USER=tky
Target=$2
if [ ! $HOST ]; then
echo 'Host is empty'
exit 0
else
    echo host is $HOST
fi
if [ ! $Target ]; then
echo 'Target is empty'
exit 0
else
   echo Target is $Target
fi
FileName=$Target.tar.gz
echo “Starting to sftp…”
tar cvzf $FileName ./$Target
sftp ${USER}@${HOST} <<EOF
put $FileName
bye
EOF
echo “done”
