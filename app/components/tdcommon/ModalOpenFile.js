import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Keyboard,
  Dimensions,
} from 'react-native';
import {Divider, CheckBox, Button} from 'react-native-elements';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import moment from 'moment';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import {FILE_PATH} from '@app/data';
let dirs = RNFetchBlob.fs.dirs;
const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const ModalOpenFile = (props) => {
  const {fileItem, setFileItem, modalVisible, setModalVisible} = props;
  const dataService = useSelector((state) => state.global.dataService);
  useEffect(() => {
    if (modalVisible && fileItem?.url) {
      ModalShow();
    }
    return () => {};
  }, [modalVisible]);

  const modalizeRef = useRef(null);
  const ModalHide = () => {
    modalizeRef.current?.close();
  };
  const ModalShow = () => {
    modalizeRef.current?.open();
  };
  const handleClosed = () => {
    setFileItem({});
    setModalVisible(false);
  };
  const handlePress = async () => {
    let fileUrl =
      fileItem?.url?.includes('http') || fileItem?.url?.includes('https') ? fileItem?.url : `${FILE_PATH}${fileItem.url}`;
    let fileName = fileItem?.name ?? '';
    RNFetchBlob.config({
      path: dirs.DocumentDir + '/' + fileName,
    })
      .fetch('GET', encodeURI(fileUrl), {
        //some headers ..
      })
      .then((res) => {
        console.log('The file saved to ', res.path());
        let path = res.path();
        if (Platform.OS === 'android') {
          const android = RNFetchBlob.android;
          let filename = fileName.toLowerCase();
          if (filename.includes('.doc') || filename.includes('.docx')) {
            // Word document
            android.actionViewIntent(path, 'application/msword');
          } else if (filename.includes('.pdf')) {
            // PDF file
            android.actionViewIntent(path, 'application/pdf');
          } else if (filename.includes('.ppt') || filename.includes('.pptx')) {
            // Powerpoint file
            android.actionViewIntent(path, 'application/vnd.ms-powerpoint');
          } else if (filename.includes('.xls') || filename.includes('.xlsx')) {
            // Excel file
            android.actionViewIntent(path, 'application/vnd.ms-excel');
          } else if (filename.includes('.zip') || filename.includes('.rar')) {
            // WAV audio file
            android.actionViewIntent(path, 'application/x-wav');
          } else if (filename.includes('.rtf')) {
            // RTF file
            android.actionViewIntent(path, 'application/rtf');
          } else if (filename.includes('.wav') || filename.includes('.mp3')) {
            // WAV audio file
            android.actionViewIntent(path, 'audio/x-wav');
          } else if (filename.includes('.gif')) {
            // GIF file
            android.actionViewIntent(path, 'image/gif');
          } else if (filename.includes('.jpg') || filename.includes('.jpeg') || filename.includes('.png')) {
            // JPG file
            android.actionViewIntent(path, 'image/jpeg');
          } else if (filename.includes('.txt')) {
            // Text file
            android.actionViewIntent(path, 'text/plain');
          } else if (
            filename.includes('.3gp') ||
            filename.includes('.mpg') ||
            filename.includes('.mpeg') ||
            filename.includes('.mpe') ||
            filename.includes('.mp4') ||
            filename.includes('.avi')
          ) {
            // Video files
            android.actionViewIntent(path, 'video/*');
          } else {
            android.actionViewIntent(path, '*/*');
          }
        } else {
          RNFetchBlob.ios.openDocument(path);
          console.log('ok');
        }
      });
  };
  const checkPermission = async () => {
    // Function to check the platform
    // If Platform is Android then check for permissions.
    let fileUrl =
      fileItem?.url?.includes('http') || fileItem?.url?.includes('https') ? fileItem?.url : `${FILE_PATH}${fileItem.url}`;
    //console.log(fileUrl);
    if (Platform.OS === 'ios') {
      downloadFile(fileUrl);
    } else {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
          title: 'Storage Permission Required',
          message: 'Application needs access to your storage to download File',
        });
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          downloadFile(fileUrl);
          console.log('Storage Permission Granted.');
        } else {
          // If permission denied then show alert
          Alert.alert('Xin lỗi', 'Không có quyền truy cập');
        }
      } catch (err) {
        // To handle permission related exception
        console.log('++++' + err);
      }
    }
  };

  const downloadFile = (fileUrl) => {
    // Get today's date to add the time suffix in filename
    let date = new Date();
    // File URL which we want to download
    let FILE_URL = fileUrl;
    // Function to get extention of the file url
    let file_ext = getFileExtention(FILE_URL);

    file_ext = '.' + file_ext[0];

    // config: To get response by passing the downloading related options
    // fs: Root directory path to download
    const {config, fs} = RNFetchBlob;
    let RootDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path: RootDir + '/file_' + Math.floor(date.getTime() + date.getSeconds() / 2) + file_ext,
        description: 'downloading file...',
        notification: true,
        // useDownloadManager works with Android only
        useDownloadManager: true,
      },
    };
    console.log(FILE_URL);
    config(options)
      .fetch('GET', FILE_URL)
      .then((res) => {
        // Alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        //alert('Tải xuống thành công.');
      })
      .catch((e) => console.log(e));
  };

  const getFileExtention = (fileUrl) => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
  };
  return (
    <Portal>
      <Modalize
        scrollViewProps={{showsVerticalScrollIndicator: false}}
        ref={modalizeRef}
        onClosed={handleClosed}
        HeaderComponent={
          <View style={styles.content}>
            <Text style={styles.textCenter}>{fileItem?.name ?? 'File'}</Text>
            <TouchableOpacity
              style={styles.icon_right}
              onPress={() => {
                ModalHide();
              }}>
              <FontAwesome name={'times'} size={24} color={'#22313F'} />
            </TouchableOpacity>
          </View>
        }
        adjustToContentHeight={true}
        snapPoint={500}>
        <View style={{marginBottom: 20}}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center', paddingTop: 15, paddingHorizontal: 15}}
            onPress={() => {
              handlePress();
              ModalHide();
            }}>
            <FontAwesome name="eye" size={20} color="#64B5F6" />
            <Text style={{marginStart: 15, color: '#5B6062'}}>Xem nội dung tệp đính kèm</Text>
          </TouchableOpacity>
          <Divider style={{marginVertical: 20, backgroundColor: '#E0E0E0'}} />
          <TouchableOpacity
            onPress={() => {
              checkPermission();
              ModalHide();
            }}
            style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15}}>
            <FontAwesome name="download" size={20} color="#64B5F6" />
            <Text style={{marginStart: 15, color: '#5B6062'}}>Tải xuống tệp đính kèm</Text>
          </TouchableOpacity>
          <Divider style={{marginVertical: 20, backgroundColor: '#E0E0E0'}} />
        </View>
      </Modalize>
    </Portal>
  );
};

export default ModalOpenFile;
const styles = StyleSheet.create({
  content: {
    height: 56,
    paddingHorizontal: 8,
    //padding: 10,
    flexDirection: 'row',
    alignItems: 'center',

    //marginBottom: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  textCenter: {flex: 1, textAlign: 'center', fontWeight: '500', fontSize: 16, color: '#22313F'},
  icon_right: {marginEnd: 10, color: '#818181'},
});
