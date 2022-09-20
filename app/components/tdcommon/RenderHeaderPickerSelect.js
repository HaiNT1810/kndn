import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import SearchComponent from './SearchComponent';

const RenderHeaderPickerSelect = (props) => {
  const {ModalHide, value, fieldData, title, showSearch, inputValue, handleChangeText} = props;
  return (
    <>
      <View style={styles.content}>
        <TouchableOpacity onPress={props.handleOnPressReset}>
          <Text style={styles.leftIcon}>{'Đặt lại'}</Text>
        </TouchableOpacity>
        <Text style={styles.textCenter}>{title ? title : 'Lựa chọn'}</Text>
        <TouchableOpacity
          style={styles.textRight}
          onPress={() => {
            ModalHide();
          }}>
          {/* <FontAwesome name={'times'} size={24} color={'#22313F'} /> */}
          <Text style={styles.textRight}>{'OK'}</Text>
        </TouchableOpacity>
      </View>
      {showSearch ? <SearchComponent value={inputValue} onChangeText={handleChangeText} /> : <></>}
    </>
  );
};

export default RenderHeaderPickerSelect;

const styles = StyleSheet.create({
  content: {
    height: 56,
    paddingHorizontal: 8,
    //padding: 10,
    flexDirection: 'row',
    alignItems: 'center',

    //marginBottom: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  leftIcon: {marginVertical: 4, alignItems: 'center', justifyContent: 'center', paddingLeft: 5, color: '#2F6BBF'},
  textCenter: {flex: 1, textAlign: 'center', fontWeight: '500', fontSize: 16, color: '#22313F'},
  textRight: {fontWeight: '400', fontSize: 14, color: '#2F6BFF', paddingRight: 5},
});
