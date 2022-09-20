import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Animated,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Keyboard,
  ScrollView,
  Modal,
  Alert,
  Dimensions,
} from 'react-native';
import {Divider, Button} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {useRoute, useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import {Colors} from '@app/themes';
import {TD_Header} from '@app/components';
import {ModalOwner, ModalCargo} from '@app/components/giamsattau';
import {requestPOST, requestGET} from '@app/services/Api';
import {BASE_URL, FILE_URL, FILE_PATH} from '@app/data';
import moment from 'moment';
import {useFormik} from 'formik';
import {TDPickerSelect, TDTextInputNew, ItemDateInput} from '../../components/tdcommon';
import 'moment/locale/vi';
moment.locale('vi');
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';

import {showMessage} from 'react-native-flash-message';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
let dirs = RNFetchBlob.fs.dirs;
const SCREEN_WIDTH = Dimensions.get('screen').width;

const ChiTietCang_MainScreen = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const {data} = route?.params ?? {};
  const AccessToken = useSelector((state) => state.global.AccessToken);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [dataTB, setDataTB] = useState({});
  const [fileList, setFileList] = useState([]);
  const modalizeRef = useRef(null);
  const [fileShow, setFileShow] = useState({});
  useEffect(() => {
    setDataTB(data || {});
    if (data?.FileAttachments?.length > 0) {
      var fileArr = data?.FileAttachments.split('\n');
      fileArr = fileArr.filter((i) => i);
      var _fileList = [];
      if (fileArr.length > 0) {
        fileArr.map((it) => {
          var _item = it.split(',');
          _fileList.push({
            name: `${_item[1]}`,
            url: `${_item[0]}`,
          });
        });
      }
      setFileList(_fileList);
    }
    return () => {};
  }, [data]);
  const ModalHide = () => {
    modalizeRef.current?.close();
  };
  const ModalShow = () => {
    modalizeRef.current?.open();
  };
  const handlePress = async () => {
    let fileUrl = `${FILE_PATH}${fileShow.url}`;
    let fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1, fileUrl.length);

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
    let fileUrl = `${FILE_PATH}${fileShow.url}`;
    console.log(fileUrl);
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
    config(options)
      .fetch('GET', FILE_URL)
      .then((res) => {
        // Alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        //alert('Tải xuống thành công.');
      });
  };

  const getFileExtention = (fileUrl) => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
  };
  return (
    <View style={{flex: 1, backgroundColor: Colors.TD_Background}}>
      <TD_Header checkStack title={'Chi tiết thông báo'} />
      {isLoading ? (
        <ActivityIndicator size="large" color="#fb8c00" style={{flex: 1, justifyContent: 'center'}} />
      ) : (
        <ScrollView containerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <View style={{margin: 10}}>
            <Text style={{marginBottom: 10, fontWeight: '500', color: '#212121'}}>Tiêu đề:</Text>
            <TDTextInputNew
              disable={true}
              value={dataTB?.Subject ?? ''}
              placeholder={'Tiêu đề'}
              //title={'Tiêu đề'}
            />
          </View>
          <View style={{margin: 10}}>
            <Text style={{marginBottom: 10, fontWeight: '500', color: '#212121'}}>Nội dung:</Text>
            <TDTextInputNew
              disable={true}
              multiline={true}
              value={dataTB?.Content ?? ''}
              placeholder={'Nội dung'}
              //title={'Nội dung'}
            />
          </View>
          <View style={{margin: 10}}>
            {fileList.length > 0 ? (
              <View>
                <Text style={{marginBottom: 10, fontWeight: '500', color: '#212121'}}>Đính kèm:</Text>
                {fileList.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      flexDirection: 'row',
                      padding: 12,
                      borderWidth: 1,
                      borderColor: '#E0E0E0',
                      borderRadius: 5,
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      setFileShow(item);
                      ModalShow();
                    }}>
                    <FontAwesome name="file-alt" size={16} color="#2196F3" />
                    <Text style={{paddingLeft: 10, fontWeight: '500', color: '#212121'}}>{item.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <></>
            )}
          </View>
        </ScrollView>
      )}
      <Portal>
        <Modalize
          scrollViewProps={{showsVerticalScrollIndicator: false}}
          ref={modalizeRef}
          HeaderComponent={
            <View style={styles.content}>
              <Text style={styles.textCenter}>{'File'}</Text>
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
          <View style={{padding: 15, marginBottom: 20}}>
            <TouchableOpacity
              style={{flexDirection: 'row', paddingLeft: 10, alignItems: 'center'}}
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
              style={{flexDirection: 'row', paddingLeft: 10, alignItems: 'center'}}>
              <FontAwesome name="download" size={20} color="#64B5F6" />
              <Text style={{marginStart: 15, color: '#5B6062'}}>Tải xuống tệp đính kèm</Text>
            </TouchableOpacity>
            <Divider style={{marginVertical: 20, backgroundColor: '#E0E0E0'}} />
          </View>
        </Modalize>
      </Portal>
    </View>
  );
};
export default ChiTietCang_MainScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  title: {color: '#5B6062', fontSize: 14, fontWeight: '600', paddingHorizontal: 5},
  buttonAdd: {
    borderWidth: 0.5,
    borderRadius: 2,
    borderColor: '#E0E0E0',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  content: {
    height: 56,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  leftIcon: {marginVertical: 4, alignItems: 'center', justifyContent: 'center', paddingLeft: 5, color: '#2F6BBF'},
  textCenter: {flex: 1, textAlign: 'center', fontWeight: '500', fontSize: 16, color: '#22313F'},
  textRight: {fontWeight: '400', fontSize: 14, color: '#2F6BFF', paddingRight: 5},
});
