import React, {useState} from 'react';
import {
  View,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {Colors} from '@app/themes';
import {TD_Header} from '@app/components';

const CaNhan_MainScreen = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <View style={{flex: 1, backgroundColor: Colors.TD_Background}}>
      <TD_Header {...props} title={'Hồ sơ cá nhân'} />
      <View style={{flex: 1}}></View>
    </View>
  );
};

export default CaNhan_MainScreen;
