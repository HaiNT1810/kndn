/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState } from 'react';
import { Button, StyleSheet, View, Text, KeyboardAvoidingView, ScrollView, Keyboard } from 'react-native';
import { useValidation } from 'react-native-form-validator';
import { ItemTextInput } from '../../components';
import { TDTextInputNew, ItemDateInput, TDLegend } from '@app/components/tdcommon';
import { showMessage } from 'react-native-flash-message';
import { Colors, Helpers } from '@themes';
import { shallowEqual, useSelector } from 'react-redux';
import ValidationMessages from '@app/config/ValidationMessages';
import ValidationRules from '@app/config/ValidationRules';
import { useNavigation } from '@react-navigation/native';


const Register_bussiness = (props) => {
  var navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [Name, setName] = useState('');
  const [BirthDay, setBirthDay] = useState('');
  const [Email, setEmail] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
    useValidation({
      state: { username, password, rePassword, Name, Email, PhoneNumber },
      rules: ValidationRules,
      messages: ValidationMessages,
      deviceLocale: 'vi'
    });

  const { actionsLoading, error } = useSelector(
    (state) => ({
      actionsLoading: state.global.actionsLoading,
      error: state.global.error,
    }),
    shallowEqual,
  );

  let fcmToken = useSelector((state) => state.global.fcmToken);
  if (fcmToken == null) {
    fcmToken = '';
  }

  const handleLogin = async () => {
    Keyboard.dismiss();
    const check = validate({
      username: { required: true },
      Name: { required: true },
      Email: { email: true },
      PhoneNumber: { phoneNumber: true },
      password: { required: true, minlength: 6 },
      rePassword: { required: true, equalPassword: password }
    })
    console.log(check)
    if (!check) {
      showMessage({
        message: 'Th??ng tin ch??a ?????y ????? ho???c ch??a ch??nh x??c!',
        type: 'warning',
        duration: 800,
      });
    }

    //dispatch(actions.login(username_, password_));
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      enabled
      keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : -500}>
      <View style={styles.container}>
        <View style={styles.containerLoginForm}>
          <ScrollView>
            <Text>L??u ??: Sau khi ????ng k?? t???m th???i ch??? s??? d???ng ???????c ch???c n??ng d??nh cho c?? nh??n.</Text>
            <Text>C??c ch???c n??ng cho doanh nghi???p s??? ???????c m??? khi qu???n tr??? h??? th???ng duy???t t??i kho???n.</Text>
            <TDLegend title="Th??ng tin ????ng nh???p" icon="user-lock"></TDLegend>
            {isFieldInError('username') &&
              getErrorsInField('username').map(errorMessage => (
                <Text style={Helpers.errorMessage}>{errorMessage}</Text>
              ))}

            <ItemTextInput
              isImportant
              value={username}
              onChangeText={setUsername}
              placeholder={'T??i kho???n'}
              icon={'user'}
              title={'T??i kho???n'}
            />

            {isFieldInError('password') &&
              getErrorsInField('password').map(errorMessage => (
                <Text style={Helpers.errorMessage}>{errorMessage}</Text>
              ))}
            <ItemTextInput
              isImportant
              showEye={true}
              value={password}
              onChangeText={setPassword}
              placeholder={'M???t kh???u'}
              icon={'key'}
              title={'M???t kh???u'}
            />

            {isFieldInError('rePassword') &&
              getErrorsInField('rePassword').map(errorMessage => (
                <Text style={Helpers.errorMessage}>{errorMessage}</Text>
              ))}
            <ItemTextInput
              showEye={true}
              value={rePassword}
              onChangeText={setRePassword}
              placeholder={'Nh???p l???i m???t kh???u'}
              icon={'key'}
              title={'Nh???p l???i m???t kh???u'}
            />

            <TDLegend title="Th??ng tin t??i kho???n" icon="address-card"></TDLegend>

            {isFieldInError('Name') &&
              getErrorsInField('Name').map(errorMessage => (
                <Text style={Helpers.errorMessage}>{errorMessage}</Text>
              ))}

            <TDTextInputNew
              isImportant
              value={Name}
              onChangeText={setName}
              placeholder={'T??n hi???n th???'}
              title={'T??n hi???n th???'}
            />
            <ItemDateInput
              value={BirthDay}
              onChangeText={setBirthDay}
              placeholder={'Ng??y sinh'}
              placeholderText={{ textAlign: 'left' }}
              icon={'calendar-alt'}
              title={'Ng??y sinh'}
            />
            {isFieldInError('Email') &&
              getErrorsInField('Email').map(errorMessage => (
                <Text style={Helpers.errorMessage}>{errorMessage}</Text>
              ))}
            <TDTextInputNew
              value={Email}
              onChangeText={setEmail}
              placeholder={'Email'}
              title={'Email'}
            />
            {isFieldInError('PhoneNumber') &&
              getErrorsInField('PhoneNumber').map(errorMessage => (
                <Text style={Helpers.errorMessage}>{errorMessage}</Text>
              ))}
            <TDTextInputNew
              value={PhoneNumber}
              onChangeText={setPhoneNumber}
              placeholder={'S??? ??i???n tho???i'}
              title={'S??? ??i???n tho???i'}
            />

            <TDLegend title="Th??ng tin doanh nghi???p" icon="building"></TDLegend>


            <Button
              onPress={handleLogin}
              title={'T???o t??i kho???n c?? nh??n'}
              loading={actionsLoading}
              titleStyle={{ fontSize: 14, fontWeight: 'bold' }}
              buttonStyle={styles.btDangNhap}
            />
            <Text style={{ textAlign: 'center', marginVertical: 25 }}>
              <Text>B???n ???? c?? t??i kho???n? </Text>
              <Text style={{ color: Colors.blueHope, }} onPress={() => { navigation.navigate("LoginScreen", {}) }} > ????ng nh???p</Text>
            </Text>
          </ScrollView>
        </View>
      </View>
      {actionsLoading && <View style={styles.loading} />}
    </KeyboardAvoidingView>
  );
};

export default Register_bussiness;

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
});
