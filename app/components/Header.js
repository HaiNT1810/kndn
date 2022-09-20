/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';

const TDHeader = ({ leftComponent, isStack, title, showRight, RightComponent, backgroundColor, textColor }) => {
  const navigation = useNavigation();

  return (
    <Header
      statusBarProps={{ barStyle: 'dark-content', backgroundColor: 'transparent', translucent: true }}
      barStyle="dark-content"
      placement="left"
      leftComponent={
        leftComponent || isStack ? (
          <TouchableOpacity
            onPress={() => {
              isStack ? navigation.goBack() : navigation.openDrawer();
              try {
                global.sound.stop();
              } catch (error) { }
            }}>
            {/* <Icon
              name={isStack ? 'arrow-back' : 'menu'}
              color={textColor ? textColor : '#2E2E2E'}
              underlayColor="#00000000"
              containerStyle={styles.icon}
            /> */}
            <FontAwesome
              /* name={'long-arrow-left'} */
              name={isStack ? 'long-arrow-left' : 'bars'}
              size={25}
              color="#2E2E2E"
              underlayColor="#00000000"
              containerStyle={{ paddingStart: 0 }}
            />
          </TouchableOpacity>
        ) : (
          <></>
        )
      }
      centerComponent={{
        text: title,
        style: { color: textColor ? textColor : '#2E2E2E', fontSize: 18, fontWeight: 'bold' },
      }}
      rightComponent={RightComponent && <RightComponent />}
      containerStyle={{
        backgroundColor: backgroundColor ? backgroundColor : '#FFF',
        justifyContent: 'space-around',
      }}
      centerContainerStyle={{ justifyContent: 'center' }}
    />
  );
};

export default TDHeader;

const styles = StyleSheet.create({
  icon: { paddingStart: 0, marginHorizontal: 10 },
  container: {
    backgroundColor: '#FFF',
    justifyContent: 'space-around',
  },
});
