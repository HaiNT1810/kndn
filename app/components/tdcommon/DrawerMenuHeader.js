/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ImageBackground, StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import { Text, Avatar } from 'react-native-elements';
import { Colors } from '@app/themes';
import { Images } from '@themes';
import { useRoute, useNavigation, DrawerActions } from '@react-navigation/native';
import { useSelector, } from 'react-redux';

const TD_MenuHeader = (props) => {
  const accessToken = useSelector((state) => state.global.accessToken);
  const user = useSelector(state => accessToken && state.global.user)
  const {fullName} = user ?? ""
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={Images.backgrounds._login}
      style={{ width: undefined, padding: 16, paddingTop: 48, flexDirection: 'row', alignItems: 'center' }}>
      {/* <Avatar size="medium" rounded title={`${(name2 + name).toUpperCase()}`} containerStyle={{}} activeOpacity={0.7} /> */}
      <Avatar size="medium" rounded source={Images.logos._logo} />
      {accessToken ?
        (<TouchableOpacity onPress={() => { navigation.navigate('UserProfileScreen') }}>
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.view}>Xem thông tin</Text>
        </TouchableOpacity>) :
        (<Button color={Colors.blueHope} title="Đăng nhập/Tạo tài khoản" onPress={() => {
          navigation.dispatch(DrawerActions.closeDrawer());
          navigation.navigate("LoginScreen")
        }}></Button>)
      }
    </ImageBackground>
  );
};

export default TD_MenuHeader;

const styles = StyleSheet.create({
  name: {
    flex: 1,
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
    marginStart: 10,
    marginBottom: -5
  },
  view: {
    flex: 1,
    color: 'silver',
    fontSize: 12,
    marginStart: 15,
  }
});
