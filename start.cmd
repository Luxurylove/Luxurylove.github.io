@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo   LuxuryLove 作品集 · 本地预览
echo   ---------------------------------
echo   正在启动本地服务器...
echo   打开浏览器访问： http://127.0.0.1:8080
echo   关闭这个窗口即可停止服务器。
echo.
where python >nul 2>nul
if %errorlevel%==0 (
  python -m http.server 8080
  goto :eof
)
where py >nul 2>nul
if %errorlevel%==0 (
  py -m http.server 8080
  goto :eof
)
echo 没有找到 Python。请安装 Python 后重试，或直接双击 index.html 预览。
pause
