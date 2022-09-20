/* eslint-disable react-native/no-inline-styles */
import { Colors } from '@themes';
import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Platform } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import { EmojiButton, Picker } from 'emoji-mart-native'

const TDCommentInput = (props) => {
  const inputRef = useRef(null);
  const [hide, isHide] = useState(false);
  const [showEmojiModal, setShowEmojiModal] = useState(false);

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
    emoji,
    onSubmitEditing
  } = props;

  const ShowEmojiBox = () => {

  }

  return (
    <>
      {title ? (
        <Text style={styles.title}>
          {title}<Text style={{ color: '#e91e1ee6', fontWeight: 'bold' }}>{isImportant ? ' *' : ''}</Text>
        </Text>)
        : <></>
      }
      <TouchableOpacity
        style={[styles.textinputContainerNoTitle, { backgroundColor: onChangeText ? 'transparent' : '#F3F3F3' }]}
        onPress={() => {
          onChangeText && inputRef.current.focus();
        }}
        disabled={onChangeText ? false : true}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* {emoji ? <TouchableOpacity onPress={() => { ShowEmojiBox }}><FontAwesome name={'smile'} size={20} color="#616161" style={{ marginRight: 5 }} /></TouchableOpacity> : <></>} */}
          {/* {emoji ? <><EmojiButton onButtonPress={() => { setShowEmojiModal(true) }} /><Text>&ensp;</Text></> : <></>} */}
          {onChangeText ? (
            <>
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
                onSubmitEditing={onSubmitEditing}
              />
              {/* <Picker isVisible={false} showCloseButton={true} onSelect={(e) => onChangeText(text + e)} /> */}
            </>
          ) : (
            <Text style={[styles.textinputNoitle]}>{value}</Text>
          )}
        </View>
      </TouchableOpacity>
    </>
  );
};

export default TDCommentInput;
const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { paddingHorizontal: 10, color: '#616161', fontSize: 14, fontWeight: 'bold' },
  textinputNoitle: { padding: Platform.OS === 'ios' ? 2 : 0, color: '#212121', marginTop: 0, fontWeight: '500', height: 35 },
  textinputContainerNoTitle: {
    paddingHorizontal: 10,
    paddingVertical: 0,
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginHorizontal: 5,
    borderColor: '#abb4bd65',
    borderWidth: 0.5,
  },
});
