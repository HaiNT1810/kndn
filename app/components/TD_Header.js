/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Header, Icon } from 'react-native-elements';

import { Colors } from '@app/themes';

const TD_Header = (props) => {
  const navigation = useNavigation();

  const { checkrightComponent, RightComponent } = props;
  const { checkStack, checkDisable } = props;
  const backgroundColor = props.backgroundColor ? props.backgroundColor : Colors.GLOBAL_Header;

  const _renderleftComponent = () => (
    <TouchableOpacity onPress={() => navigation.openDrawer()}>
      <Icon name="menu" color="white" underlayColor="#00000000" containerStyle={{ paddingStart: 0 }} />
    </TouchableOpacity>
  );

  const _renderleftComponent_stack = () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon name="arrow-back" color="white" underlayColor="#00000000" containerStyle={{ paddingStart: 0 }} />
    </TouchableOpacity>
  );

  const _renderrightComponent = () => <></>;

  const _renderCenterComponent = () => (
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: '#fff', fontSize: props.subTitle ? 18 : 20, fontWeight: '500' }}>{props.title}</Text>
      {props.subTitle ? <Text style={{ color: '#fff', fontSize: 14, marginTop: 3 }}>({props.subTitle})</Text> : <></>}
    </View>
  );
  return (
    <>
      {!checkDisable && (
        <Header
          statusBarProps={{ barStyle: 'light-content', backgroundColor: 'transparent', translucent: true }}
          barStyle="light-content"
          //placement="left"
          leftComponent={checkStack ? <_renderleftComponent_stack /> : <_renderleftComponent />}
          centerComponent={<_renderCenterComponent />}
          rightComponent={RightComponent ? <RightComponent /> : <_renderrightComponent />}
          containerStyle={{
            backgroundColor: backgroundColor,
            justifyContent: 'space-around',
            alignItems: 'center',
            shadowColor: "#000",
            shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3,
          }}
          centerContainerStyle={{}}
          rightContainerStyle={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
        />
      )}
      {checkDisable && <Header statusBarProps={{ barStyle: 'light-content', backgroundColor: 'transparent', translucent: true }} />}
    </>
  );
};

export default TD_Header;
