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
  const AccessToken = useSelector((state) => state.global.AccessToken);
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
    if (!AccessToken) {
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
        message: 'Th??ng tin ch??a ?????y ????? ho???c ch??a ch??nh x??c!',
        type: 'warning',
        duration: 800,
      });
    }
    setIsLoading(false);
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.TD_Background }}>
      <TD_Header checkStack {...props} title="C???p nh???t" subTitle="Th??ng tin c?? nh??n" />
      {!user ? (
        <ScrollView containerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <View style={{ margin: 10 }}>

            {isFieldInError('Name') &&
              getErrorsInField('Name').map(errorMessage => (
                <Text style={Helpers.errorMessage}>Ch??a nh???p h??? t??n!</Text>
              ))}
            <TDTextInputNew
              isImportant
              value={Name}
              onChangeText={setName}
              placeholder={'H??? t??n'}
              title={'H??? t??n'}
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
                <Text style={Helpers.errorMessage}>Email kh??ng ????ng!</Text>
              ))}
            <TDTextInputNew
              value={Email}
              onChangeText={setEmail}
              placeholder={'Email'}
              title={'Email'}
            />
            {isFieldInError('PhoneNumber') &&
              getErrorsInField('PhoneNumber').map(errorMessage => (
                <Text style={Helpers.errorMessage}>S??? ??i???n tho???i kh??ng ????ng!</Text>
              ))}
            <TDTextInputNew
              value={PhoneNumber}
              onChangeText={setPhoneNumber}
              placeholder={'S??? ??i???n tho???i'}
              title={'S??? ??i???n tho???i'}
            />
            <Button
              onPress={() => handleOnpress()}
              title={'C???p nh???t'}
              loading={isLoading}
              titleStyle={{ fontSize: 14, fontWeight: 'bold' }}
              buttonStyle={styles.btn}
            />
          </View>
        </ScrollView>
      ) : (
        <Text>Kh??ng t??m th???y!!!</Text>
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
