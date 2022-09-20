/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useEffect} from 'react';

import {StyleSheet, Text, View, ScrollView, Animated, TouchableOpacity, TextInput} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';

import RenderContentPickerSelect from './RenderContentPickerSelect';
import RenderHeaderPickerSelect from './RenderHeaderPickerSelect';

const TextInputLuaChon = (props) => {
  const {
    value,
    title,
    placeholder,
    fieldData,
    fieldId,
    isImportant,
    dataUrl,
    onPressReset,
    onPressSubmit,
    showSearch,
    data,
    token,
    isMultiSelect,
    numberOfLines,
    modalHeight,
    snapPoint,
    disable,
    style,
  } = props;
  const refRBSheet = useRef();
  const contentRef = useRef < Animated.AnimatedComponent < ScrollView >> null;
  const modalizeRef = useRef(null);
  const [inputValue, setInputValue] = useState('');

  const handleChangeText = (text) => {
    setInputValue(text);
  };
  const ModalHide = () => {
    modalizeRef.current?.close();
  };

  const handleOnPressSubmit = (val) => {
    !isMultiSelect && modalizeRef.current?.close();
    onPressSubmit(val);
  };
  const handleOnPressReset = () => {
    modalizeRef.current?.close();
    onPressReset();
  };

  const formatString = (arr) => {
    var str = '';
    arr.map((item, index) => {
      str = str.concat(item[fieldData]);
      if (index < arr.length - 1) {
        str = str.concat('\n');
      }
    });
    return str;
  };

  let colorText =
    (!!isMultiSelect && value && value.length > 0) || (!isMultiSelect && value && value[fieldData]) ? '#424242' : '#BDBDBD';

  return (
    <>
      {title ? (
        <TouchableOpacity
          disabled={disable ? disable : false}
          style={[styles.containterTitle, {backgroundColor: disable ? '#f9f9f9' : 'transperant'}]}
          onPress={() => {
            modalizeRef.current?.open();
          }}>
          <View style={{flex: 1}}>
            <Text style={styles.title}>
              {title}:<Text style={{color: 'red', fontWeight: 'bold'}}>{isImportant ? ' *' : ''}</Text>
            </Text>
            <Text
              style={[
                styles.textinput,
                {
                  color: colorText,
                },
              ]}
              numberOfLines={isMultiSelect ? numberOfLines : 1}>
              {!!isMultiSelect && value && value.length > 0
                ? formatString(value)
                : !isMultiSelect && value && value[fieldData]
                ? value[fieldData]
                : placeholder
                ? placeholder
                : title}
            </Text>
          </View>
          {!disable ? <FontAwesome name={'chevron-down'} color={'gray'} style={{marginStart: 5}} /> : <></>}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          disabled={disable ? disable : false}
          style={[styles.containerNoTitle, style]}
          onPress={() => {
            modalizeRef.current?.open();
          }}>
          <View style={styles.contentNoTitle}>
            <Text style={[{color: colorText}]} numberOfLines={isMultiSelect ? numberOfLines : 1}>
              {!!isMultiSelect && value && value.length > 0
                ? formatString(value)
                : !isMultiSelect && value && value[fieldData]
                ? value[fieldData]
                : placeholder}
            </Text>

            {!disable ? <FontAwesome name={'chevron-down'} color={'gray'} style={{marginStart: 5}} /> : <></>}
          </View>
        </TouchableOpacity>
      )}

      <Portal style={{backgroundColor: 'red'}}>
        <Modalize
          scrollViewProps={{showsVerticalScrollIndicator: false}}
          ref={modalizeRef}
          contentRef={contentRef}
          HeaderComponent={() => (
            <RenderHeaderPickerSelect
              {...props}
              inputValue={inputValue}
              handleChangeText={handleChangeText}
              ModalHide={ModalHide}
              handleOnPressReset={handleOnPressReset}
            />
          )}
          FooterComponent={() => <View style={{height: 20}} />}
          modalHeight={modalHeight ? modalHeight : 500}
          //adjustToContentHeight={true}
          snapPoint={snapPoint || 500}>
          <RenderContentPickerSelect
            actionSheetRef={refRBSheet}
            inputValue={inputValue}
            {...props}
            onPressSubmit={handleOnPressSubmit}
          />
        </Modalize>
      </Portal>
    </>
  );
};

export default TextInputLuaChon;

const styles = StyleSheet.create({
  containerNoTitle: {paddingHorizontal: 5, marginVertical: 5},
  contentNoTitle: {
    padding: 10,
    borderColor: '#D1D1D1',
    borderWidth: 0.5,
    borderRadius: 4,
    justifyContent: 'space-between',
    flexDirection: 'row',
    minHeight: 40,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  containterTitle: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 4,
    margin: 10,
    borderColor: '#abb4bd65',
    borderWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {color: '#616161', fontSize: 14, fontWeight: 'bold'},
  textinput: {marginTop: 5, fontWeight: '500', padding: 2},
});
