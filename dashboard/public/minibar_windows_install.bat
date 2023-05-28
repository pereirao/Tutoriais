@echo off

REM * Test FTP connection

set file=ftp_test.txt
echo FTP connection successful > %file%

set ftp_file=test.ftp
set ftp_host=uploads.minibardelivery.com
set ftp_user={user}
set ftp_pass={password}

echo user %ftp_user%> %ftp_file%
echo %ftp_pass%>> %ftp_file%
echo bin>> %ftp_file%
echo put %file%>> %ftp_file%
echo quit>> %ftp_file%

ftp -n -s:%ftp_file% %ftp_host% | find /i "530 Authentication failed" && goto :FtpTestKO

del %file% %ftp_file%

REM * Create directory for minibar

cd %UserProfile%\Desktop
if not exist "minibar\*" (
   md minibar
)
cd minibar

REM *
REM * Definition of heredoc macro to create batch templates
REM *
REM * Heredoc syntax:
REM *
REM * %%heredoc%% :uniqueLabel [outfile]
REM * content
REM * ...
REM * :uniqueLabel
REM *

setlocal DisableDelayedExpansion
set LF=^
% Don't remove this line 1/2 %
% Don't remove this line 2/2 %
set ^"\n=^^^%LF%%LF%^%LF%%LF%^^"
set heredoc=for %%n in (1 2) do if %%n==2 (%\n%
       for /F "tokens=1,2" %%a in ("!argv!") do (%\n%
          if "%%b" equ "" (call :heredoc %%a) else call :heredoc %%a^>%%b%\n%
          endlocal ^& goto %%a%\n%
       )%\n%
    ) else setlocal EnableDelayedExpansion ^& set argv=

REM *
REM * Batch template to transfer latest file via FTP
REM *

%heredoc% :endProfile profile.bat
@echo off

set file=profile.txt
echo POS SYSTEM: {pos}> %file%
for /f "tokens=4-7 delims=[.] " %%i in ('ver') do (if %%i==Version (set v=%%j.%%k) else (set v=%%i.%%j))
echo Windows>> %file%
echo %v%>> %file%

set ftp_file=profile.ftp
set ftp_host=uploads.minibardelivery.com
set ftp_user={user}
set ftp_pass={password}

echo user %ftp_user%> %ftp_file%
echo %ftp_pass%>> %ftp_file%
echo bin>> %ftp_file%
echo put %file%>> %ftp_file%
echo quit>> %ftp_file%

ftp -n -s:%ftp_file% %ftp_host%

del %file% %ftp_file%

:endProfile

call profile.bat
del profile.bat

REM *
REM * Batch template to transfer latest file via FTP
REM *

%heredoc% :endBatch SEND_TO_MINIBAR.bat
@echo off

for /f "tokens=*" %%i in ('dir /b /od *.xls *.xlsx *.csv *.tsv *.txt *.dbf *.xml *.sdf') do (
 set data_file=%%i
 set file_extension=%%~xi
)

if ["%data_file%"] == [""] (
 echo No inventory file found in directory. Nothing sent.
 pause
 exit
)

set inventory_file="inventory_manual%file_extension%"
copy "%data_file%" "%inventory_file%"

set ftp_host=uploads.minibardelivery.com
set ftp_user={user}
set ftp_pass={password}

echo user %ftp_user%> tmp.ftp
echo %ftp_pass%>> tmp.ftp
echo bin>>tmp.ftp
echo put "%inventory_file%">>tmp.ftp
echo quit>>tmp.ftp

ftp -n -s:tmp.ftp %ftp_host% | find /i "530 Authentication failed" && goto :FtpKO

del tmp.ftp "%data_file%" "%inventory_file%"
exit

:FtpKO

del tmp.ftp "%inventory_file%"

echo(
echo -----------------------------------------
echo Transfer failed. Please contact ops@minibardelivery.com
echo -----------------------------------------
pause
exit

:endBatch

echo(
echo Installation successful.
echo -----------------------------------------
echo To send your inventory to minibar:
echo 1. Paste your inventory file into 'minibar' folder on your desktop
echo 2. Double-click SEND_TO_MINIBAR
echo You can move 'minibar' folder to another place of your choice.
echo -----------------------------------------

pause
exit

:FtpTestKO

del %file% %ftp_file%
echo(
echo Installation failed.
echo -----------------------------------------
echo Connection to Minibar servers failed. Please verify your FTP credentials or contact ops@minibardelivery.com
echo -----------------------------------------
pause
exit

REM *
REM * Definition of heredoc subroutine
REM *

:heredoc label
set "skip="
for /F "delims=:" %%a in ('findstr /N "%1" "%~F0"') do (
   if not defined skip (set skip=%%a) else set /A lines=%%a-skip-1
)
for /F "skip=%skip% delims=" %%a in ('findstr /N "^" "%~F0"') do (
   set "line=%%a"
   echo(!line:*:=!
   set /A lines-=1
   if !lines! == 0 exit /B
)
exit /B 0
