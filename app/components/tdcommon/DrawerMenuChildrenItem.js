/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';

const TD_MenuItem = (props) => {
  const { navigation, navigate, icon, title, subTitle, item, itemKey, selectKey, setSelectKey, showCount = true } = props;

  return (
    <TouchableOpacity
      key={itemKey}
      style={{
        paddingVertical: 15,
        paddingStart: 30,
        paddingRight: 5,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: itemKey == selectKey ? '#E1F5FE' : 'transparent',
        /* backgroundColor: `${
          activeItemKey === navigate && activeBackgroundColor
            ? activeBackgroundColor
            : 'transparent'
        }`, */
      }}
      onPress={() => {
        if (navigate) {
          setSelectKey(itemKey);
          navigation.closeDrawer();
          navigation.navigate(navigate, { item: item, title: title, subTitle: subTitle });
        }
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon name={icon ? icon : 'circle'} solid size={icon ? 18 : 6} color={itemKey == selectKey ? '#1976D2' : '#9E9E9E'} />
        <Text
          style={{
            color: itemKey == selectKey ? '#1976D2' : '#424242',
            fontWeight: '600',
            paddingStart: 10,
          }}>
          {subTitle ? subTitle : ''}
          {showCount ?
            <Text
              style={{
                color: '#F44336',
                fontWeight: '600',
              }}>
              {` (${item.count ?? 0})`}
            </Text>
            : <></>
          }
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TD_MenuItem;

const styles = StyleSheet.create({});
