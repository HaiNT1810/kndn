/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {StyleSheet, TextInput, View, Platform} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';

const SearchComponent = ({value, onChangeText, placeholder, onSubmitEditing, keyboardType}) => {
  const inputRef = useRef(null);
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5, marginVertical: 5}}>
      <View
        style={{
          backgroundColor: '#EAEAEA70',
          flexDirection: 'row',
          borderRadius: 4,
          margin: Platform.OS === 'android' ? 2 : 2,
          alignItems: 'center',
          flex: 1,
          borderWidth: 0.2,
          borderColor: '#E0E0E0',
        }}>
        <FontAwesome name="search" color="#787C7E" size={20} style={{marginStart: 10}} />
        <TextInput
          ref={inputRef}
          placeholder={placeholder ? placeholder : 'Tìm kiếm'}
          multiline={false}
          onChangeText={(text) => onChangeText(text)}
          value={value}
          selectionColor={'gray'}
          clearButtonMode="always"
          style={{flex: 1, margin: Platform.OS === 'android' ? 5 : 10, padding: 4}}
          onSubmitEditing={onSubmitEditing}
          keyboardType={keyboardType ? keyboardType : 'default'}
        />
      </View>
    </View>
  );
};

export default SearchComponent;

const styles = StyleSheet.create({});
