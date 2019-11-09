cd ..
echo +++++ PWD : `pwd` +++++ 
echo +++++ Running git stash and pull +++++ 
git stash
git pull
echo +++++ Updating npm dependencies +++++ 
npm i 
echo +++++ Removing log files ! +++++
rm '/home/ubuntu/www/logs/gz-server-err.log'
rm '/home/ubuntu/www/logs/gz-server-out.log'
rm '/home/ubuntu/www/logs/gz-server-combined.log'
echo +++++ Running pm2 restart gz-server +++++
pm2 restart gz-server
