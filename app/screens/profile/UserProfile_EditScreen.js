/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Text,
  Dimensions,
  Button,
  Keyboard,
  TextInput
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Colors, Helpers } from '@app/themes';
import { TD_Header } from '@app/components';
import { requestGET } from '@app/services/Api';
import { BASE_URL } from '@app/data';
import moment from 'moment';
const { height, width } = Dimensions.get('window');
import * as actions from '@redux/global/Actions';
import { ItemTextInput } from '@app/components';
import { TDTextInputNew, TDTextInputAnimated, ItemDateInput } from '@app/components/tdcommon';
import { useValidation } from 'react-native-form-validator';
import { showMessage } from 'react-native-flash-message';
import ValidationMessages from '@app/config/ValidationMessages';
import ValidationRules from '@app/config/ValidationRules';

const UserProfile_EditScreen = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const dataService = useSelector((state) => state.global.dataService);
  const user = useSelector((state) => state.global.user);
  const accessToken = useSelector((state) => state.global.accessToken);
  const [isLoading, setIsLoading] = useState(false);
  const iconColor = Colors.blue;
  const [Name, setName] = useState(user?.Name || "");
  const [BirthDay, setBirthDay] = useState(user?.BirthDay);
  const [Email, setEmail] = useState(user?.Email);
  const [PhoneNumber, setPhoneNumber] = useState(user?.PhoneNumber);
  const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
    useValidation({
      state: { Name, BirthDay, Email, PhoneNumber },
      rules: ValidationRules,
      messages: ValidationMessages
    });
  useEffect(() => {
    if (!accessToken) {
      navigation.navigate("HomeScreen")
    }
    const fetchData = async () => {
      setLoading(false);
    };
    fetchData();
    return () => { };
  }, []);

  const handleOnpress = () => {
    setIsLoading(true);
    const check = validate({
      Name: { required: true },
      Email: { email: true },
      PhoneNumber: { phoneNumber: true }
    })
    if (!check) {
      showMessage({
        message: 'Thông tin chưa đầy đủ hoặc chưa chính xác!',
        type: 'warning',
        duration: 800,
      });
    }
    setIsLoading(false);
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.TD_Background }}>
      <TD_Header checkStack {...props} title="Cập nhật" subTitle="Thông tin cá nhân" />
      {!user ? (
        <ScrollView containerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <View style={{ margin: 10 }}>

            {isFieldInError('Name') &&
              getErrorsInField('Name').map(errorMessage => (
                <Text style={Helpers.errorMessage}>Chưa nhập họ tên!</Text>
              ))}
            <TDTextInputNew
              isImportant
              value={Name}
              onChangeText={setName}
              placeholder={'Họ tên'}
              title={'Họ tên'}
            />

            <ItemDateInput
              value={BirthDay}
              onChangeText={setBirthDay}
              placeholder={'Ngày sinh'}
              placeholderText={{ textAlign: 'left' }}
              icon={'calendar-alt'}
              title={'Ngày sinh'}
            />
            {isFieldInError('Email') &&
              getErrorsInField('Email').map(errorMessage => (
                <Text style={Helpers.errorMessage}>Email không đúng!</Text>
              ))}
            <TDTextInputNew
              value={Email}
              onChangeText={setEmail}
              placeholder={'Email'}
              title={'Email'}
            />
            {isFieldInError('PhoneNumber') &&
              getErrorsInField('PhoneNumber').map(errorMessage => (
                <Text style={Helpers.errorMessage}>Số điện thoại không đúng!</Text>
              ))}
            <TDTextInputNew
              value={PhoneNumber}
              onChangeText={setPhoneNumber}
              placeholder={'Số điện thoại'}
              title={'Số điện thoại'}
            />
            <Button
              onPress={() => handleOnpress()}
              title={'Cập nhật'}
              loading={isLoading}
              titleStyle={{ fontSize: 14, fontWeight: 'bold' }}
              buttonStyle={styles.btn}
            />
          </View>
        </ScrollView>
      ) : (
        <Text>Không tìm thấy!!!</Text>
      )}
    </View >
  );
};

export default UserProfile_EditScreen;
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
