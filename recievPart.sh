#commend close in back quote
Time=`date "+%F-%H-%M-%S"`
Part=$2
Dir=$1
if [ ! $Part ]; then
echo part is empty
exit 0
else
  echo part is $Part
fi
if [ ! $Dir ]; then
echo dir is empty
exit 0
else
  echo dir is $Dir
fi
FileName=$Part-$Time.tar.gz
Target=$Part.tar.gz
cd ./$Dir
tar cvzf $FileName $Part
Back=../back
if [ ! -d "$Back" ]; then
echo back is empty
mkdir -p $Back
fi
mv $FileName $Back
cp ../$Target ./
tar xvf $Target 
rm $Target 
