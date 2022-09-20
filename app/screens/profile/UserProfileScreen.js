/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
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
  Image,
  Alert
} from 'react-native';
import { Avatar, Divider } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Images, Colors } from '@app/themes';
import { TD_Header } from '@app/components';
import { requestGET } from '@app/services/Api';
import { BASE_URL } from '@app/data';
import { Flex } from '@ant-design/react-native'
import moment from 'moment';
const { height, width } = Dimensions.get('window');
import * as actions from '@redux/global/Actions';

const UserProfileScreen = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const dataService = useSelector((state) => state.global.dataService);
  const user = useSelector((state) => state.global.user);
  const AccessToken = useSelector((state) => state.global.AccessToken);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const iconColor = Colors.blue;

  useEffect(() => {
    if (!AccessToken) {
      navigation.navigate("HomeScreen")
    }
    const fetchData = async () => {
      setLoading(false);
    };
    fetchData();
    return () => { };
  }, []);

  const RenderItem = (props) => {
    const { title, content } = props;
    return (
      <View style={{ width: '100%', marginTop: 10 }}>
        <View style={styles.flexInline}>
          <FontAwesome name={'info-circle'} color={Colors.blueHope} style={{ paddingStart: 0, width: 20 }} size={13} />
          <Text style={{ color: Colors.darkGray }}>{title}</Text>
        </View>
        {content ? <Text style={{ flex: 1, marginStart: 20, marginTop: 5, fontWeight: '600', color: '#263238' }}>{content}</Text> : <></>}
      </View>);
  };
  // Đăng xuất
  const Logout = () => {
    // if (username) {
    //   messaging().unsubscribeFromTopic(username);
    // }
    // if (user && user.groupcode) {
    //   let _groupcode = user.groupcode ? user.groupcode : [];
    //   _groupcode.map((i) => messaging().unsubscribeFromTopic(i));
    // }

    dispatch(actions.logOut());
    navigation.navigate("HomeScreen")
  };

  const alertLogout = () => {
    Alert.alert(
      'Đăng xuất',
      'Bạn có chắc muốn đăng xuất không?',
      [
        { text: 'ĐÓNG', onPress: () => console.log('Thoat') },
        {
          text: 'ĐĂNG XUẤT',
          onPress: Logout,
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.TD_Background }}>
      <TD_Header checkStack title="Thông tin" />
      {loading ? (
        <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} />
      ) : (
        <View style={{ flex: 1 }}>
          {data ? (
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={{ backgroundColor: '#fff' }}>
              <View style={styles.container}>
                <View style={[styles.flexInline, { paddingLeft: 10 }]}>
                  <FontAwesome name={'address-book'} solid color={iconColor} style={{ paddingStart: 0, width: 24 }} size={18} />
                  <Text style={styles.headText}>Thông tin cá nhân</Text>
                  <TouchableOpacity onPress={() => { navigation.navigate("UserProfile_EditScreen") }} style={[styles.icon, styles._iconRounded]}><FontAwesome name='pencil' size={16} /></TouchableOpacity>
                </View>
                <View>
                  <Flex>
                    <Flex.Item>
                      <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => { }}>
                          <Avatar size="large" rounded source={Images.logos._logo} />
                        </TouchableOpacity>
                      </View>
                    </Flex.Item>
                    <Flex.Item flex={2}>
                      <View>
                        <Text>Admin</Text>
                        <Text>abc@gmail.com</Text>
                        <Text>0132654987</Text>
                      </View>
                    </Flex.Item>
                  </Flex>
                </View>
              </View>
              <Divider width={0.5} color="#E0E0E0" />
              <View style={styles.container}>
                <View style={[styles.flexInline, { paddingLeft: 10 }]}>
                  <FontAwesome name={'info-square'} solid color={iconColor} style={{ paddingStart: 0, width: 24 }} size={18} />
                  <Text style={styles.headText}>Thông tin doanh nghiệp</Text>
                  <TouchableOpacity onPress={() => { }} style={[styles.icon, styles._iconRounded]}><FontAwesome name='pencil' size={16} /></TouchableOpacity>
                </View>
                <View style={{ paddingHorizontal: 10 }}>
                  <RenderItem title="Tên công ty" content="Công ty cổ phần Tin học Tân Dân"></RenderItem>
                  <RenderItem title="Mã số thuế" content="0132546579"></RenderItem>
                  <RenderItem title="Địa chỉ" content="Số 60, ngõ Thịnh Hào 1, phường Hàng Bột, quận Đống Đa, Hà Nội, Việt Nam"></RenderItem>
                  <RenderItem title="..." content=""></RenderItem>
                </View>
              </View>
              <Divider width={0.5} color="#E0E0E0" />
              <TouchableOpacity onPress={() => { }} style={[styles.container, styles.flexInline, { paddingLeft: 15 }]}>
                <FontAwesome name={'wrench'} solid color={iconColor} style={{ paddingStart: 0, width: 24 }} size={18} />
                <Text style={{ color: Colors.darkGray }}>Cài đặt</Text>
              </TouchableOpacity>
              <Divider width={0.5} color="#E0E0E0" />
              <TouchableOpacity onPress={() => { navigation.navigate("ChangePassScreen") }} style={[styles.container, styles.flexInline, { paddingLeft: 15 }]}>
                <FontAwesome name={'lock-alt'} solid color={iconColor} style={{ paddingStart: 0, width: 24 }} size={18} />
                <Text style={{ color: Colors.darkGray }}>Đổi mật khẩu</Text>
              </TouchableOpacity>
              <Divider width={0.5} color="#E0E0E0" />
              <TouchableOpacity onPress={alertLogout} style={[styles.container, styles.flexInline, { paddingLeft: 15 }]}>
                <FontAwesome name={'sign-out-alt'} solid color={iconColor} style={{ paddingStart: 0, width: 24 }} size={18} />
                <Text style={{ color: Colors.darkGray }}>Đăng xuất</Text>
              </TouchableOpacity>
            </ScrollView>
          ) : (
            <Text>Không tìm thấy!!!</Text>
          )}
        </View>
      )
      }
    </View >
  );
};

export default UserProfileScreen;
const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 5, paddingVertical: 10 },
  avatar: { borderWidth: 1, borderColor: Colors.grey },
  headText: { fontSize: 15, fontWeight: '700', paddingVertical: 3, color: Colors.darkGray },
  icon: { position: 'absolute', right: 15, top: 5, },
  iconRounded: {
    borderWidth: 1, borderColor: Colors.lightBlueHope, borderRadius: 12,
    padding: 5, backgroundColor: Colors.lightBlueHope,
  },
  flexInline: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
});
