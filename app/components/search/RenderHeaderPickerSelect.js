import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import SearchComponent from './TDSearchComponent';

const RenderHeaderPickerSelect = (props) => {
  const {ModalHide, value, fieldData, title, showSearch, inputValue, handleChangeText} = props;
  return (
    <>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.leftIcon}
          onPress={() => {
            ModalHide();
          }}>
          <FontAwesome name={'times'} size={24} color={'#22313F'} />
        </TouchableOpacity>
        <Text style={styles.textCenter}>{title ? title : 'Lựa chọn'}</Text>

        <TouchableOpacity onPress={props.handleOnPressReset}>
          <Text style={styles.textRight}>{'Đặt lại'}</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  leftIcon: {width: 48, marginVertical: 4, alignItems: 'center', justifyContent: 'center'},
  textCenter: {flex: 1, textAlign: 'center', fontWeight: '500', fontSize: 16, color: '#22313F'},
  textRight: {fontWeight: '400', fontSize: 14, color: '#2F6BFF', paddingRight: 5},
});
