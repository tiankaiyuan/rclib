#commend close in back quote
#!/bin/bash
Time=`date "+%F-%H-%M-%S"`
Project=codingzx
FileName=codingzx-$Time.tar.gz
tar cvzf $FileName --exclude node_modules ./codingzx
Back=./back
if [ ! -d "$Back" ]; then
mkdir $Back
fi
mv $FileName $Back
tar xvf s.tar.gz
Manage=./codingzx/manage/
if [ ! -d "$Manage" ]; then
mkdir -p ./codingzx/manage/
fi
cd $Project;
npm install
sudo -S pm2 start appServer.yml
sudo -S pm2 start appOther.yml
sudo -S pm2 stop czSpider
