#!/bin/bash

mkdir -p ~/Desktop/minibar
cd ~/Desktop/minibar

#
# Test connection
#

echo "{pos}" > ./profile.txt
echo "Mac" >> ./profile.txt
sw_vers >> ./profile.txt

cat > ./test_transfer.sh <<EOF_TEST
sftp -o StrictHostKeyChecking=no {user}@uploads.minibardelivery.com <<END_OF_FTP
cd {user}
put "profile.txt"
exit
END_OF_FTP
EOF_TEST

chmod 700 ./test_transfer.sh

cat > ./test_transfer.expect <<EOF_EXPECT
#!/usr/bin/expect -f
spawn ./test_transfer.sh
expect {
  "assword: " {
    send "{pass}\r"
  }
  default {
    exit 1
  }
}
expect {
  "Connected" {
  }
  default {
    exit 2
  }
}
expect eof
EOF_EXPECT

chmod 700 ./test_transfer.expect
./test_transfer.expect > /dev/null 2>&1
test_status=$?
rm ./profile.txt ./test_transfer.*

if [ "${test_status}" -ne 0 ]
then
    echo
    echo "Installation failed."
    echo "-----------------------------------------"
    echo "Connection to Minibar servers failed. Please verify your FTP credentials or contact ops@minibardelivery.com"
    echo "-----------------------------------------"
    exit
fi

#
#
#

#
# Transfer inventory file to Minibar
#

echo "Generating executable to send file to minibar FTP server..."
cat > ./SEND_TO_MINIBAR.command <<EOF
#!/bin/bash

cd ~/Desktop/minibar

source_filename=\$(ls -t *.{xls,xlsx,csv,tsv,txt,dbf,xml,sdf} 2>/dev/null | grep -v sent_ | head -n1)

if [ -z "\${source_filename}" ]
then
  echo "No inventory file found in directory. Nothing sent."
  exit
fi

destin_filename="inventory_manual.\${source_filename##*.}"
cp "\${source_filename}" "\${destin_filename}"

cat > ./transfer.sh <<EOF_TRANSFER
#!/bin/bash
sftp -o StrictHostKeyChecking=no {user}@uploads.minibardelivery.com <<END_OF_FTP
cd {user}
put "\${destin_filename}"
exit
END_OF_FTP
EOF_TRANSFER

chmod 700 ./transfer.sh

cat > ./transfer.expect <<EOF_EXPECT
#!/usr/bin/expect -f
spawn ./transfer.sh
expect {
  "assword: " {
    send "{pass}\r"
  }
  default {
    exit 1
  }
}
expect {
  "Connected" {
  }
  default {
    exit 2
  }
}
expect eof
EOF_EXPECT

chmod 700 ./transfer.expect
./transfer.expect
transfer_status=\$?

rm "\${destin_filename}" ./transfer.*

if [ "\${transfer_status}" -ne 0 ]
then
    echo
    echo "-----------------------------------------"
    echo "Transfer failed. Please contact ops@minibardelivery.com"
    echo "-----------------------------------------"
    exit
fi

rm "\${source_filename}"
EOF
chmod 700 ./SEND_TO_MINIBAR.command

echo 
echo "Installation successful."
echo "-----------------------------------------"
echo "To send your inventory to minibar:"
echo "1. Paste your inventory file into 'minibar' folder on your desktop"
echo "2. Double-click SEND_TO_MINIBAR"
echo "You can move 'minibar' folder to another place of your choice."
echo "-----------------------------------------"
