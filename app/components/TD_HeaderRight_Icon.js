/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import { TouchableOpacity } from 'react-native-gesture-handler';

const TD_HeaderRight_Icon = (props) => {
  const { showSearch, showDots, funcSearch, funcMore } = props;
  return (
    <>
      {showSearch ? (
        <TouchableOpacity onPress={funcSearch}>
          <FontAwesome name="search" size={16} color="white" underlayColor="#00000000" style={{ marginLeft: 0, paddingTop: 5 }} />
        </TouchableOpacity>
      )
        : <></>
      }
      {showDots ? (
        <TouchableOpacity onPress={funcMore}>
          <FontAwesome name="sort-amount-down-alt" size={16} color="white" underlayColor="#00000000" style={{ marginLeft: 10, paddingTop: 5 }} />
        </TouchableOpacity>
      )
        : <></>
      }
    </>
  );
};

export default TD_HeaderRight_Icon;

const styles = StyleSheet.create({
});
