/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import {useIsFocused} from '@react-navigation/native';

const TD_MenuItem = (props) => {
  const {navigation, navigate, icon, title, item, onPress, itemKey, selectKey, setSelectKey} = props;
  return (
    <TouchableOpacity
      style={{
        padding: 15,
        paddingLeft: 0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: itemKey == selectKey ? '#E1F5FE' : 'transparent',
        width: '100%',
        /* backgroundColor: `${
          activeItemKey === navigate && activeBackgroundColor
            ? activeBackgroundColor
            : 'transparent'
        }`, */
      }}
      onPress={
        onPress
          ? onPress
          : () => {
              if (navigate) {
                setSelectKey(itemKey);
                navigation.closeDrawer();
                navigation.navigate(navigate, {item: item, title: title});
              }
            }
      }>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Icon
          name={icon ? icon : 'book'}
          solid
          size={18}
          color={itemKey == selectKey || selectKey.includes(itemKey) ? '#1976D2' : '#9E9E9E'}
          style={{marginStart: 10, width: 20}}
        />
        <Text
          style={{
            color: itemKey == selectKey || selectKey.includes(itemKey) ? '#1976D2' : '#424242',
            fontWeight: '600',
            paddingStart: 10,
          }}>
          {title ? title : ''}
        </Text>
        {item?.count > 0 ? <Text style={{color: 'red', marginLeft: 5}}>{`(${item.count})`}</Text> : <></>}
      </View>
    </TouchableOpacity>
  );
};

export default TD_MenuItem;

const styles = StyleSheet.create({});
