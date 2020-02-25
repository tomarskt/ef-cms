#!/bin/bash
url=$1
max_tries=900
try_count=0
check_code=${2:-"200"}
is_ws=${3:-"false"}
while true
do
  if [ "$is_ws" = "true" ]; then
    code=$(curl -sL -w "%{http_code}\\n" -o /dev/null --include --no-buffer --header "Connection: Upgrade" --header "Upgrade: websocket" --header "Host: $url" --header "Origin: $url" --header "Sec-WebSocket-Key: SGVsbG8sIHdvcmxkIQ==" --header "Sec-WebSocket-Version: 13" "$url")
  else
    code=$(curl -sL -w "%{http_code}\\n" "$url" -o /dev/null)
  fi

  echo -e "\nWaiting for $url to be hosted...\n"
  if [ "x$code" = "x$check_code" ]
  then
    break
  fi
  if ((++try_count > max_tries)); then
    echo -e ":(  giving up.\n"
    exit 1
  fi
  sleep 2
done
