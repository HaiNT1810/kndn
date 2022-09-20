/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useEffect} from 'react';

import {StyleSheet, Text, View, ScrollView, Animated, TouchableOpacity, TextInput} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';

import RenderContentPickerSelect from './RenderContentPickerSelect';
import RenderHeaderPickerSelect from './RenderHeaderPickerSelect';

const TDSearchSelect = (props) => {
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
    horizontal,
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
        str = str.concat(horizontal ? '; ' : '\n');
      }
    });
    return str;
  };

  let colorText =
    (!!isMultiSelect && value && value.length > 0) || (!isMultiSelect && value && value[fieldData]) ? '#424242' : '#BDBDBD';

  return (
    <>
      <TouchableOpacity
        disabled={disable ? disable : false}
        style={[styles.containterTitle, {backgroundColor: disable ? '#F0F0F0' : 'transperant'}]}
        onPress={() => {
          modalizeRef.current?.open();
        }}>
        <View style={{width: '92%'}}>
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
        {!disable ? <FontAwesome name={'chevron-down'} color={'gray'} style={{width: '8%', textAlign: 'right'}} /> : <></>}
      </TouchableOpacity>

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

export default TDSearchSelect;

const styles = StyleSheet.create({
  containterTitle: {
    padding: 10,
    borderRadius: 4,
    margin: 10,
    borderColor: '#D1D1D1',
    borderWidth: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#424242',
    fontSize: 14,
    fontWeight: '500',
    position: 'absolute',
    top: -18,
    left: 0,
    backgroundColor: '#fff',
  },
  textinput: {textAlign: 'left', maxWidth: '90%', fontSize: 13, marginVertical: 5},
});
