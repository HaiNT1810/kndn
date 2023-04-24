import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Keyboard, ScrollView, KeyboardAvoidingView, Platform, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import {Text, Button, Input} from 'react-native-elements';
import {showMessage} from 'react-native-flash-message';
import {Header} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import * as actions from '../../redux/global/Actions';
import {ItemTextInput} from '@app/components';
import {TD_Header} from '@app/components';
import messaging from '@react-native-firebase/messaging';

import {requestPOST, requestGET} from '@app/services/Api';
import {BASE_URL, FILE_URL, FILE_PATH} from '@app/data';
const ChangePassScreen = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.global.accessToken);
  const [isLoading, setIsLoading] = useState(false);

  const [newPass, setNewpas] = useState('');
  const [password2, setPassword2] = useState('');
  const [oldPass, setOldPass] = useState('');

  const handleOnpress = async () => {
    Keyboard.dismiss();
    if (!oldPass || !newPass || !password2) {
      showMessage({
        message: 'Thất bại',
        description: 'Vui lòng điền đầy đủ thông tin!',
        type: 'warning',
        duration: 800,
      });
    } else if (newPass !== password2) {
      showMessage({
        message: 'Thất bại',
        description: 'Mật khẩu mới không khớp, vui lòng kiểm tra lại!',
        type: 'warning',
        duration: 800,
      });
    } 
    else {
      try {
        setIsLoading(true);
        let _body = {oldPass, newPass};
        let res = await requestPOST(`${BASE_URL}/app/changePass`, _body, accessToken);
        setIsLoading(false);
        if (res?.data && res?.error?.code == "200") {
          dispatch(actions.logOut());
          alertLogout();
          onReset();
        } else {
          showMessage({
            message: 'Thất bại',
            description: 'Thông tin gửi chưa thành công! Vui lòng kiểm tra lại!',
            type: 'danger',
            duration: 800,
          });
        }
      } catch (error) {
        console.log('error');
        setIsLoading(false);
        showMessage({
          message: 'Thất bại',
          description: 'Có lỗi xảy ra, vui lòng kiểm tra lại!',
          type: 'danger',
          duration: 800,
        });
      }
    }
  };

  const alertLogout = () => {
    Alert.alert(
      'Thành công',
      'Đổi mật khẩu thành công, vui lòng đăng nhập lại!',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate("LoginScreen"),
        },
        
      ],
      {cancelable: false},
    );
  };
  const onReset = () => {
    setOldPass('');
    setNewpas('');
    setPassword2('');
  };
  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <TD_Header checkStack {...props} title="Đổi mật khẩu" />

      <ScrollView containerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={{margin: 10}}>
          <ItemTextInput
            showEye={true}
            value={oldPass}
            onChangeText={setOldPass}
            placeholder={'Mật khẩu cũ'}
            icon={'key'}
            title={'Mật khẩu cũ'}
          />
          <ItemTextInput
            showEye={true}
            value={newPass}
            onChangeText={setNewpas}
            placeholder={'Mật khẩu'}
            icon={'key'}
            title={'Mật khẩu'}
          />

          <ItemTextInput
            showEye={true}
            value={password2}
            onChangeText={setPassword2}
            placeholder={'Nhập lại mật khẩu'}
            icon={'key'}
            title={'Nhập lại mật khẩu'}
          />

          <Button
            onPress={() => handleOnpress()}
            title={'ĐỔI MẬT KHẨU'}
            loading={isLoading}
            titleStyle={{fontSize: 14, fontWeight: 'bold'}}
            buttonStyle={styles.btn}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ChangePassScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
  containerLoginForm: {
    //backgroundColor: '#E7E7E7',
    padding: 10,
    margin: 10,
    borderRadius: 20,
  },

  header_1: {
    color: '#2E529F',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
  btn: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 10,
    marginTop: 20,
    backgroundColor: '#1976d2',
  },
  textLuaChon: {color: 'white', fontWeight: 'bold'},
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
