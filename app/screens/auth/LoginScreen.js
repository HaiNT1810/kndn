/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import {
  StatusBar,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
  Dimensions,
  ActivityIndicator,
  Switch
} from 'react-native';
import { Flex, Icon } from '@ant-design/react-native'
import TouchID from 'react-native-touch-id';
import { Text, Button, Input } from 'react-native-elements';
import { showMessage } from 'react-native-flash-message';
import { ItemTextInput } from '../../components';
import DeviceInfo from 'react-native-device-info';
import { useRoute, useNavigation } from '@react-navigation/native';

const SCREEN_HEIGHT = Dimensions.get('screen').height;

//import Base64 from '../../utils/Base64';
import * as actions from '../../redux/global/Actions';

import { Colors } from '../../config';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  //  const user = useSelector(state => state.global.user);

  const username_tmp = useSelector((state) => state.global.username_tmp);
  const password_tmp = useSelector((state) => state.global.password_tmp);
  const isRemember_tmp = useSelector((state) => state.global.isRemember);

  const [username, setUsername] = useState(username_tmp);
  const [password, setPassword] = isRemember_tmp ? useState(password_tmp) : useState('');
  const [hide, isHide] = useState(false);
  const [isRemember, setIsRemember] = useState(isRemember_tmp || false);

  const { actionsLoading, error, AccessToken } = useSelector(
    (state) => ({
      actionsLoading: state.global.actionsLoading,
      error: state.global.error,
      AccessToken: state.global.AccessToken
    }),
    shallowEqual,
  );

  useEffect(() => {
    if (error) {
      showMessage({
        message: 'Tài khoản hoặc mật khẩu không đúng!!!',
        type: 'danger',
      });
      //dispatch(actions.delError());
    }
    if (AccessToken) {
      showMessage({
        message: 'Đăng nhập thành công',
        description: "Vui lòng chờ trong giây lát!!!",
        type: 'success',
      });
      navigation.navigate('HomeScreen', {});
    }
    return () => { };
  }, [error, AccessToken]);

  let fcmToken = useSelector((state) => state.global.fcmToken);
  if (fcmToken == null) {
    fcmToken = '';
  }

  const handleLogin = async (username_, password_) => {
    Keyboard.dismiss();
    if (!username_ || !password_) {
      showMessage({
        message: 'Chưa nhập đầy đủ trường thông tin!',
        type: 'danger',
      });
      return;
    }

    dispatch(actions.login(username_, password_));
  };

  const toggleSwitch = (value) => {
    setIsRemember(value);
    dispatch(actions.setRemember(value));
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar backgroundColor="#00000000" barStyle="light-content" translucent={true} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1 }}>
          <Image
            source={require('../../images/bg_login.png')}
            style={{ flex: 1 / 2.5, alignSelf: 'stretch', width: '100%', borderBottomLeftRadius: 50, borderBottomRightRadius: 50 }}
            resizeMode="cover"
          />
          <Image
            source={require('../../images/noitem.png')}
            style={{ width: 100, height: 100, alignSelf: 'center', marginTop: -60 }}
          />

          <Text
            style={{
              textAlign: 'center',
              marginTop: 10,
              marginHorizontal: 30,
              textTransform: 'uppercase',
              fontSize: 16,
              fontWeight: 'bold',
              color: Colors.primary,
            }}>
            ứng dụng kết nối
          </Text>
          <Text
            style={{
              textAlign: 'center',
              marginTop: 10,
              marginHorizontal: 30,
              textTransform: 'uppercase',
              fontSize: 16,
              fontWeight: 'bold',
              color: Colors.primary,
            }}>
            DOANH NGHIỆP NGÀNH CÔNG NGHIỆP
          </Text>

          <KeyboardAvoidingView
            style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            enabled
            keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : -500}>
            <View style={styles.container}>
              <View style={styles.containerLoginForm}>
                <ItemTextInput
                  value={username}
                  onChangeText={setUsername}
                  placeholder={'Tài khoản'}
                  icon={'user'}
                  title={'Tài khoản'}
                />

                <ItemTextInput
                  showEye={true}
                  value={password}
                  onChangeText={setPassword}
                  placeholder={'Mật khẩu'}
                  icon={'key'}
                  title={'Mật khẩu'}
                />

                <Flex style={{ width: '100%' }}>
                  <Flex.Item flex={2} style={{ textAlign: 'left' }}>
                    <Flex style={{ width: '100%' }}>
                      <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isRemember ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(value) => toggleSwitch(value)}
                        value={isRemember}
                      />
                      <Text>
                        <Text>Ghi nhớ đăng nhập?</Text>
                      </Text>
                    </Flex>
                  </Flex.Item>
                  <Flex.Item>
                    <TouchableOpacity onPress={() => {
                      showMessage({
                        message: 'Chức năng chưa hoàn thiện!',
                        type: 'danger',
                      });
                    }}>
                      <Text style={{ color: Colors.blue1, textAlign: 'center' }}>Quên mật khẩu?</Text>
                    </TouchableOpacity>
                  </Flex.Item>
                </Flex>

                <Button
                  onPress={() => handleLogin(username, password)}
                  title={'ĐĂNG NHẬP'}
                  loading={actionsLoading}
                  titleStyle={{ fontSize: 14, fontWeight: 'bold' }}
                  buttonStyle={styles.btDangNhap}
                />

                <Flex style={{ width: '100%' }}>
                  <Flex.Item flex={2}>
                    <Flex style={{ width: '100%' }}>
                      <TouchableOpacity onPress={() => { navigation.navigate("HomeScreen") }}>
                        <Text style={{ color: Colors.blue }}>&#171;Truy cập không đăng nhập</Text>
                      </TouchableOpacity>
                    </Flex>
                  </Flex.Item>
                  <Flex.Item>
                    <TouchableOpacity onPress={() => { navigation.navigate("RegisterScreen", {}) }}>
                      <Text style={{ color: Colors.blue1, textAlign: 'center' }}>Tạo tài khoản&#187;</Text>
                    </TouchableOpacity>
                  </Flex.Item>
                </Flex>
              </View>
            </View>
            {actionsLoading && <View style={styles.loading} />}
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  containerLoginForm: {
    backgroundColor: '#FFFFFF10',
    padding: 10,
    margin: 10,
    borderRadius: 20,
    alignSelf: 'stretch',
  },
  containerXacThuc: {
    flexDirection: 'row',
    paddingTop: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerLuaChon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    margin: 10,
  },
  header_1: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
  header_2: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
  input: {
    borderColor: '#D1D1D1',
    marginTop: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  inputStyle: { color: '#212121', paddingStart: 10 },
  btDangNhap: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 10,
    marginTop: 20,
  },
  textLuaChon: { color: 'white', fontWeight: 'bold' },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textinputContainer1: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    borderRadius: 4,
    padding: 0,
    margin: 10,
    alignItems: 'center',
    borderColor: '#abb4bd65',
    borderWidth: 0.4,
  },
  contentChon: {
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
});
