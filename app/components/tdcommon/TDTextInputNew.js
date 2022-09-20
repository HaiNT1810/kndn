/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Platform } from 'react-native';
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
    icon,
  } = props;

  return (
    <>
      {title ? (
        <>
          <Text style={styles.title}>
            {title}<Text style={{ color: '#e91e1ee6', fontWeight: 'bold' }}>{isImportant ? ' *' : ''}</Text>
          </Text>
          <TouchableOpacity
            style={[styles.textinputContainer, { backgroundColor: onChangeText ? '#fff' : '#f9f9f9' }]}
            onPress={() => {
              onChangeText && inputRef.current.focus();
            }}
            disabled={onChangeText ? false : true}>
            {onChangeText ? (
              <TextInput
                ref={inputRef}
                editable={disable ? false : true}
                //keyboardType="numeric"
                placeholder={placeholder ? placeholder : ''}
                multiline={multiline ? multiline : false}
                onChangeText={(text) => {
                  onChangeText(text);
                }}
                value={`${value ? value : ''}`}
                selectionColor={'gray'}
                clearButtonMode={disable ? 'never' : 'always'}
                style={styles.textinput}
                secureTextEntry={showEye && !hide}
                keyboardType={keyboardType ? keyboardType : 'default'}
                onFocus={() => { }}
              />
            ) : (
              <Text style={[styles.textinput]}>{value}</Text>
            )}
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity
          style={[styles.textinputContainerNoTitle, { backgroundColor: onChangeText ? '#fff' : '#F3F3F3' }]}
          onPress={() => {
            onChangeText && inputRef.current.focus();
          }}
          disabled={onChangeText ? false : true}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {icon && <FontAwesome name={icon} size={16} color="#616161" style={{ marginRight: 5 }} />}
            {onChangeText ? (
              <TextInput
                ref={inputRef}
                editable={disable ? false : true}
                //keyboardType="numeric"
                placeholder={placeholder ? placeholder : ''}
                multiline={multiline ? multiline : false}
                onChangeText={(text) => {
                  onChangeText(text);
                }}
                value={`${value ?? ""}`}
                selectionColor={'gray'}
                clearButtonMode={disable ? 'never' : 'always'}
                style={styles.textinputNoitle}
                secureTextEntry={showEye && !hide}
                keyboardType={keyboardType ? keyboardType : 'default'}
                onFocus={() => { }}
              />
            ) : (
              <Text style={[styles.textinputNoitle]}>{value}</Text>
            )}
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

export default TDTextInputNew;
const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { paddingHorizontal: 10, color: '#616161', fontSize: 14, fontWeight: 'bold' },
  textinputContainer: {
    paddingHorizontal: 10,
    paddingVertical: 0,
    backgroundColor: '#FFF',
    borderRadius: 4,
    margin: 10,
    borderColor: '#abb4bd65',
    borderWidth: 0.5,
  },
  textinputContainerNoTitle: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: '#FFF',
    borderRadius: 4,
    marginHorizontal: 5,
    borderColor: '#abb4bd65',
    borderWidth: 0.5,
  },
  textinput: { marginTop: 0, fontWeight: '500', color: '#212121' },
  textinputNoitle: { padding: Platform.OS === 'ios' ? 2 : 0, color: '#212121' },
  textinputIcon: { marginHorizontal: 10 },
});
