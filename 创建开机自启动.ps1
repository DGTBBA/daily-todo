# 创建开机自启动快捷方式
$WshShell = New-Object -ComObject WScript.Shell
$StartupFolder = $WshShell.SpecialFolders.Item("Startup")
$ShortcutPath = Join-Path $StartupFolder "四象限任务管理.lnk"

# 创建快捷方式
$Shortcut = $WshShell.CreateShortcut($ShortcutPath)
$Shortcut.TargetPath = "D:\桌面应用\启动.vbs"
$Shortcut.WorkingDirectory = "D:\桌面应用"
$Shortcut.Save()

Write-Host "已创建开机自启动快捷方式！" -ForegroundColor Green
Write-Host "路径: $ShortcutPath" -ForegroundColor Cyan