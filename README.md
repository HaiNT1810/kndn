# kndn

# start android
1. yarn
2. yarn-android
3. yarn-start

# clean
yarn tdclean

# build to apk
yarn tdbuild
the file apk is generated in android --> app --> build --> outputs --> apk --> release

# Fix Error "Please update the following components: ActionButton"
node_modules --> react-native-action-button --> ActionButton.js Change componentWillReceiveProps to componentDidUpdate
//then run: npx react-codemod rename-unsafe-lifecycles

# Fix Warn "Require cycle: node_modules/rn-fetch-blob/index.js -> node_modules/rn-fetch-blob/polyfill/index.js -> node_modules/rn-fetch-blob/polyfill/Blob.js -> node_modules/rn-fetch-blob/index.js"
Modify these files can avoid require cycle:
IN node_modules/rn-fetch-blob/polyfill
all thease 4 files: Blob.js, Fetch.js, FileReader.js, XMLHttpRequest.js

// import RNFetchBlob from '../index.js'
import {NativeModules} from 'react-native';
const RNFetchBlob = NativeModules.RNFetchBlob