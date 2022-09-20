/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';

import DatePicker from '../../modules/react-native-datepicker';
import moment from 'moment';
moment.locale('vi-VN');
const ItemDateInputNew = (props) => {
  const { value, onChangeText, placeholder, placeholderStyle, title, isImportant, mode, format } = props;
  return (
    <>
      {title ? (
        <Text style={styles.title}>
          {title}:<Text style={{ color: 'red', fontWeight: 'bold' }}>{isImportant ? ' *' : ''}</Text>
        </Text>
      ) : (
        <></>
      )}
      <View
        style={[
          styles.textinputContainer,
          {
            backgroundColor: onChangeText ? 'transparent' : '#f9f9f9',
            padding: title ? 5 : 0,
            paddingLeft: 10,
          },
        ]}>
        <View style={{ flexDirection: 'row' }}>
          {onChangeText ? (
            <DatePicker
              locale={'vi-VN'}
              style={styles.textinput}
              date={value}
              mode={mode ? mode : 'date'}
              placeholder={placeholder ? placeholder : 'Ngày'}
              format={format ? format : 'DD/MM/YYYY'}
              confirmBtnText="Chọn"
              cancelBtnText="Huỷ"
              customStyles={{
                dateInput: {
                  color: 'gray',
                  marginEnd: 5,
                  borderWidth: 0,
                  margin: 0,
                  padding: 0,
                  alignItems: 'flex-start',
                },
                placeholderText: {
                  color: "#9f9f9f"
                }
              }}
              onDateChange={(i) => {
                onChangeText(i);
              }}
              iconComponent={<FontAwesome name={'calendar-alt'} size={20} color={'gray'} style={{ marginHorizontal: 5 }} />}
            />
          ) : (
            <Text style={[styles.textinput]}>{value}</Text>
          )}
        </View>
      </View>
    </>
  );
};

export default ItemDateInputNew;
const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { paddingHorizontal: 10, color: '#616161', fontSize: 14, fontWeight: 'bold' },
  textinputContainer: {
    borderRadius: 4,
    margin: 10,
    borderColor: '#abb4bd65',
    borderWidth: 0.5
  },
  textinput: { flex: 1, paddingVertical: 0 },
  textinputIcon: { marginHorizontal: 10 },
});
