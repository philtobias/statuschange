set -e

IFTTT_API_KEY='AAAA-BBBB-CCCC' \
URI='https://...' \
TITLE='Name of job' \
SELECTOR='.my-selector' \
SELECTOR_CLASS='my-classname' \
NOTIFY_ON_SUCCESS=true \
NOTIFY_ON_FAILURE=false \
node index.js