@echo off
cd /d "%~dp0"
echo 正在启动四象限任务管理...
start "" cmd /c "cd /d %~dp0 && npm run electron:dev"
exit