/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

const ItemTextInput = (props) => {
  const [hide, isHide] = useState(false);
  const {value, onChangeText, placeholder, icon, title, description, showEye, keyboardType, backgroundColor, isImportant} = props;
  return (
    <View style={{marginVertical: 5}}>
      <View style={[styles.textinputContainer]}>
        <FontAwesome name={icon ? icon : 'home'} color="#2089DC" size={20} style={styles.textinputIcon} />
        {onChangeText ? (
          <TextInput
            placeholder={placeholder ? placeholder : ''}
            multiline={false}
            onChangeText={(text) => {
              onChangeText(text);
            }}
            value={value}
            selectionColor={'gray'}
            clearButtonMode="always"
            style={styles.textinput}
            secureTextEntry={showEye && !hide}
            keyboardType={keyboardType ? keyboardType : 'default'}
          />
        ) : (
          <Text style={[styles.textinput]}>{value}</Text>
        )}
        {showEye && (
          <FontAwesome
            name={hide ? 'eye' : 'eye-slash'}
            color="#787C7E"
            size={20}
            style={styles.textinputIcon}
            onPress={() => isHide(!hide)}
          />
        )}
      </View>
      {description && (
        <Text style={{marginHorizontal: 10, color: '#bdbdbd', fontStyle: 'italic', fontSize: 13}}>{description}</Text>
      )}
    </View>
  );
};

export default ItemTextInput;
const styles = StyleSheet.create({
  container: {flex: 1},

  textinputContainer: {
    backgroundColor: '#F0E3FE',
    flexDirection: 'row',
    borderRadius: 100,
    padding: 5,
    margin: 5,
    alignItems: 'center',
  },
  textinput: {flex: 1, paddingVertical: 10},
  textinputIcon: {marginHorizontal: 10},
});
