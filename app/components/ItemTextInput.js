/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';

const ItemTextInput = (props) => {
  const [hide, isHide] = useState(false);
  const { value, onChangeText, placeholder, icon, title, description, showEye, keyboardType, isImportant } = props;
  return (
    <View style={{ marginVertical: 5 }}>
      <Text style={{ marginHorizontal: 10, color: '#5B6062', fontWeight: 'bold' }}>{title}<Text style={{ color: '#e91e1ee6', fontWeight: 'bold' }}>{isImportant ? ' *' : ''}</Text></Text>
      <View style={[styles.textinputContainer, { backgroundColor: onChangeText ? 'transparent' : '#eeeeee' }]}>
        {icon ? <FontAwesome name={icon} color="#787C7E" size={20} style={styles.textinputIcon} /> : <></>}
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
            autoCapitalize='none'
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
        <Text style={{ marginHorizontal: 10, color: '#bdbdbd', fontStyle: 'italic', fontSize: 13 }}>{description}</Text>
      )}
    </View>
  );
};

export default ItemTextInput;
const styles = StyleSheet.create({
  container: { flex: 1 },

  textinputContainer: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    borderRadius: 4,
    padding: 0,
    margin: 10,
    alignItems: 'center',
    borderColor: '#abb4bd65',
    borderWidth: 0.4,
  },
  textinput: { flex: 1, paddingVertical: 10 },
  textinputIcon: { marginHorizontal: 10 },
});
