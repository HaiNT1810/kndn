/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import {
  StatusBar,
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  Dimensions
} from 'react-native';
import TouchID from 'react-native-touch-id';
import { Text, Button, Input } from 'react-native-elements';
import { showMessage } from 'react-native-flash-message';
import DeviceInfo from 'react-native-device-info';
import { useRoute, useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

//import Base64 from '../../utils/Base64';
import * as actions from '../../redux/global/Actions';

import { Colors, Helpers } from '../../config';
import { Register_personal, Register_enterprise } from '@app/components/auth'
import { List } from '@ant-design/react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient'

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [type, setType] = useState(0);

  const { actionsLoading, error } = useSelector(
    (state) => ({
      actionsLoading: state.global.actionsLoading,
      error: state.global.error,
    }),
    shallowEqual,
  );


  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>
        <StatusBar backgroundColor="#00000000" barStyle="light-content" translucent={true} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ flex: 1 }}>
            <Image
              source={require('../../images/noitem.png')}
              style={{ width: 100, height: 100, alignSelf: 'center' }}
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
              {type == 1 ? "tạo tài khoản cá nhân" : type == 2 ? "đăng ký tài khoản doanh nghiệp" : "Chọn loại tài khoản"}
            </Text>
            {type == 0 ?
              <View style={{ marginTop: 20 }}>
                <List bordered={false}>
                  <List.Item arrow="empty" multipleLine wrap={true} onPress={() => { setType(1) }} thumb={
                    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
                      <FontAwesome name='user' solid color={Colors.blue1} size={40} />
                    </LinearGradient>
                  } style={{ marginVertical: 20, backgroundColor: Colors.blackDivide }}>
                    Tài khoản cá nhân
                    <Text style={{ color: Colors.gray }}>
                      Bao gồm các quyền:{"\n"}
                      &ensp;<FontAwesome name='check' solid color={Colors.green} size={14} /> Khai thác được toàn bộ thông tin,{"\n"}
                      &ensp;<FontAwesome name='check' solid color={Colors.green} size={14} /> Đánh giá các bài viết, chủ đề,{"\n"}
                      &ensp;<FontAwesome name='check' solid color={Colors.green} size={14} /> Phản hồi trong các bài viết, chủ đề,{"\n"}
                      &ensp;<FontAwesome name='check' solid color={Colors.green} size={14} /> Trao đổi nội dung mua bán.
                    </Text>
                  </List.Item>
                  <List.Item arrow="empty" multipleLine wrap={true} onPress={() => { setType(2) }} thumb={
                    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
                      <FontAwesome name='user-tie' solid color={Colors.blue1} size={40} />
                    </LinearGradient>
                  } style={{ marginVertical: 20, backgroundColor: Colors.blackDivide }}>
                    Tài khoản doanh nghiệp
                    <Text style={{ color: Colors.gray }}>
                      Bao gồm các quyền:{"\n"}
                      &ensp;<FontAwesome name='check' solid color={Colors.green} size={14} /> Toàn bộ quyền của tài khoản cá nhân,{"\n"}
                      Sau khi được duyệt doanh nghiệp:{"\n"}
                      &ensp;<FontAwesome name='check' solid color={Colors.green} size={14} /> Trả lời các phản hồi,{"\n"}
                      &ensp;<FontAwesome name='check' solid color={Colors.green} size={14} /> Quản lý các tài khoản con,{"\n"}
                      &ensp;<FontAwesome name='check' solid color={Colors.green} size={14} /> Tạo các bài viết, chủ đề mua bán trao đổi
                    </Text>
                  </List.Item>
                </List>
              </View> :
              type == 1 ? <Register_personal></Register_personal> : <Register_enterprise></Register_enterprise>
            }

            {/* <View>
              <Tabs tabs={tabs}>
                <View style={{ height: height - 180 }}>
                  <Register_personal></Register_personal>
                </View>
                <View style={{ height: height - 180 }}>
                  <Register_enterprise></Register_enterprise>
                </View>
              </Tabs>
            </View> */}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View >
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-start', alignItems: 'center' },
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
  linearGradient: { marginEnd: 10, padding: 10, borderRadius: 5 }
});
