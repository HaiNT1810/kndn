/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, TextInput, Text, TouchableOpacity, Platform} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';

const TDTextInputNew = (props) => {
  const inputRef = useRef(null);

  const [hide, isHide] = useState(false);
  const {
    value,
    onChangeText,
    placeholder,
    title,
    isImportant,
    type,
    description,
    showEye,
    keyboardType,
    multiline,
    disable,
    numberOfLines,
  } = props;
  return (
    <TouchableOpacity
      style={[styles.inputContainer, {backgroundColor: disable == true ? '#FAFAFA' : 'transparent'}]}
      onPress={() => {
        inputRef.current.focus();
      }}>
      {title ? (
        <Text style={styles.title}>
          {title}:<Text style={{color: 'red', fontWeight: 'bold'}}>{isImportant ? ' *' : ''}</Text>
        </Text>
      ) : (
        <></>
      )}
      {onChangeText ? (
        <TextInput
          ref={inputRef}
          editable={disable ? false : true}
          //keyboardType="numeric"
          maxLength={type == 'idcard' ? 12 : null}
          placeholder={placeholder ? placeholder : ''}
          placeholderTextColor="#E0E0E0"
          multiline={multiline ? multiline : false}
          numberOfLines={numberOfLines ? numberOfLines : 1}
          onChangeText={(text) => {
            onChangeText(text);
          }}
          value={value}
          selectionColor={'gray'}
          //clearButtonMode={disable?"never":"always"}
          style={styles.textInputContainer}
          secureTextEntry={showEye && !hide}
          keyboardType={keyboardType ? keyboardType : 'default'}
        />
      ) : (
        <Text style={styles.textinput}>{value}</Text>
      )}
    </TouchableOpacity>
  );
};

export default TDTextInputNew;
const styles = StyleSheet.create({
  container: {flex: 1},
  title: {
    color: '#424242',
    fontSize: 14,
    fontWeight: '500',
    position: 'absolute',
    top: -8,
    left: 10,
    backgroundColor: '#fff',
  },
  inputContainer: {
    padding: 5,
    backgroundColor: '#FFF',
    borderRadius: 4,
    margin: 10,
    borderColor: '#abb4bd65',
    borderWidth: 0.5,
  },
  textinput: {
    paddingHorizontal: Platform.OS === 'ios' ? 5 : 0,
    color: '#212121',
  },
  textInputContainer: {
    paddingVertical: 8,
    paddingLeft: 5,
    fontSize: 13,
    color: '#212121',
  },
  textinputNoitle: {
    fontWeight: '500',
    padding: Platform.OS === 'ios' ? 5 : 0,
  },
  textinputIcon: {marginHorizontal: 10},
});
