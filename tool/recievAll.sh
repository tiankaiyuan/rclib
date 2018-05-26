#commend close in back quote
#!/bin/bash
Time=`date "+%F-%H-%M-%S"`
Project=$1
FileName=$Project-$Time.tar.gz
tar cvzf $FileName --exclude node_modules $Project
Back=./back
if [ ! -d "$Back" ]; then
mkdir $Back
fi
mv $FileName $Back
tar xvf s.tar.gz
