@echo off
setlocal

cd /d "%~dp0"
echo.
echo === Setup Website Desa Margo Lestari ===
echo.

if not exist "package.json" (
    echo ERROR: package.json tidak ditemukan.
    echo Pastikan setup.bat berada di root proyek.
    pause
    exit /b 1
)

where node >nul 2>&1
if errorlevel 1 goto install_node

goto check_node_version

:install_node
echo Node.js belum ditemukan. Mencoba memasang Node.js LTS melalui winget...
where winget >nul 2>&1
if errorlevel 1 goto winget_unavailable

winget install --id OpenJS.NodeJS.LTS --exact --accept-source-agreements --accept-package-agreements
if errorlevel 1 goto install_failed

rem Tambahkan lokasi instalasi standar ke PATH proses ini agar bisa langsung dipakai.
if exist "%ProgramFiles%\nodejs\node.exe" set "PATH=%ProgramFiles%\nodejs;%PATH%"
if exist "%ProgramFiles(x86)%\nodejs\node.exe" set "PATH=%ProgramFiles(x86)%\nodejs;%PATH%"

where node >nul 2>&1
if errorlevel 1 goto reopen_terminal

goto check_node_version

:check_node_version
node -e "const [major,minor]=process.versions.node.split('.').map(Number); process.exit(major > 20 || (major === 20 && minor >= 9) ? 0 : 1)"
if errorlevel 1 goto node_too_old

where npm >nul 2>&1
if errorlevel 1 (
    if exist "%ProgramFiles%\nodejs\npm.cmd" set "PATH=%ProgramFiles%\nodejs;%PATH%"
    if exist "%ProgramFiles(x86)%\nodejs\npm.cmd" set "PATH=%ProgramFiles(x86)%\nodejs;%PATH%"
)

where npm >nul 2>&1
if errorlevel 1 goto repair_node

echo Node.js:
node --version
echo npm:
npm --version
echo.
echo Menginstal dependency proyek dengan npm install...
call npm install
if errorlevel 1 goto npm_install_failed

echo.
echo Setup selesai.
echo Untuk menjalankan website, gunakan: npm run dev
echo Lalu buka alamat yang ditampilkan Next.js di browser.
echo.
pause
exit /b 0

:winget_unavailable
echo ERROR: winget tidak tersedia pada perangkat ini.
echo Pasang Node.js LTS dari https://nodejs.org/ , lalu tutup dan buka kembali terminal.
echo Setelah itu jalankan setup.bat lagi.
pause
exit /b 1

:install_failed
echo ERROR: Instalasi Node.js LTS melalui winget gagal.
echo Periksa koneksi internet atau pasang Node.js LTS secara manual dari https://nodejs.org/ .
pause
exit /b 1

:reopen_terminal
echo Node.js berhasil dipasang, tetapi belum tersedia pada PATH sesi ini.
echo Tutup jendela ini, buka Command Prompt baru, lalu jalankan setup.bat kembali.
pause
exit /b 1

:node_too_old
echo ERROR: Versi Node.js saat ini terlalu lama untuk Next.js proyek ini.
echo Dibutuhkan Node.js 20.9 atau lebih baru. Pasang Node.js LTS dari https://nodejs.org/ ,
echo lalu buka terminal baru dan jalankan setup.bat kembali.
pause
exit /b 1

:repair_node
echo npm belum ditemukan. Mencoba memperbaiki instalasi Node.js LTS melalui winget...
where winget >nul 2>&1
if errorlevel 1 goto winget_unavailable

winget install --id OpenJS.NodeJS.LTS --exact --force --accept-source-agreements --accept-package-agreements
if errorlevel 1 goto install_failed

if exist "%ProgramFiles%\nodejs\node.exe" set "PATH=%ProgramFiles%\nodejs;%PATH%"
if exist "%ProgramFiles(x86)%\nodejs\node.exe" set "PATH=%ProgramFiles(x86)%\nodejs;%PATH%"

where npm >nul 2>&1
if errorlevel 1 goto npm_missing

goto check_node_version

:npm_missing
echo ERROR: npm masih tidak ditemukan setelah perbaikan Node.js.
echo Pasang ulang Node.js LTS dari https://nodejs.org/ lalu jalankan setup.bat kembali.
pause
exit /b 1

:npm_install_failed
echo ERROR: npm install gagal. Periksa pesan error di atas dan koneksi internet.
pause
exit /b 1
