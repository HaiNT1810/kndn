/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import { RadioButton } from 'react-native-paper';

const TDRadioList = (props) => {
  const inputRef = useRef(null);

  const [hide, isHide] = useState(false);

  const {
    value,
    data,
    onChangeValue,
    title,
    isImportant,
    multiline,
    disabled,
    icon,
    inline
  } = props;

  return (
    <>
      {title ? (
        <Text style={styles.title}>
          {title}{isImportant ? <Text style={{ color: '#e91e1ee6', fontWeight: 'bold' }}> *</Text> : <></>}
        </Text>
      ) : (<></>)}
      <View style={inline ? { flexDirection: 'row', flexWrap: 'wrap' } : {}}>
        {data.map((x, index) => {
          return (<RenderItem item={x} key={index} disabled={disabled} onChangeValue={onChangeValue} value={value} />);
        })}
      </View>
    </>
  );
};

const RenderItem = (props) => {
  const { item, disabled, onChangeValue, value } = props;
  return (
    disabled ?
      <View style={{ marginLeft: 10, flexDirection: 'row', alignContent: 'center' }}>
        <RadioButton
          value={item.value}
          disabled={disabled}
          status={item.value === value ? 'checked' : 'unchecked'} />
        <View style={{ alignSelf: 'center' }}>
          <Text>{item.label}</Text>
        </View>
      </View>
      :
      <TouchableOpacity onPress={() => { !disabled ? onChangeValue(item.value) : () => { } }}>
        <View style={{ marginLeft: 10,flexDirection: 'row', alignContent: 'center' }}>
          <RadioButton
            value={item.value}
            disabled={disabled}
            status={item.value === value ? 'checked' : 'unchecked'}
            onPress={() => { !disabled ? onChangeValue(item.value) : () => { } }} />
          <View style={{ alignSelf: 'center' }}>
            <Text>{item.label}</Text>
          </View>
        </View>
      </TouchableOpacity>
  )
}

export default TDRadioList;
const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { paddingHorizontal: 10, color: '#616161', fontSize: 14, fontWeight: 'bold' },

});
