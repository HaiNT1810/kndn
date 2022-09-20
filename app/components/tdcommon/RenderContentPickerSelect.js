/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import _ from 'lodash';
/* import {TouchableOpacity, RectButton} from 'react-native-gesture-handler';
 */
import TDNoItem from './TDNoItem';

const RenderItem = (props) => {
  const {data, onPressSubmit, fieldData, key, checked} = props;

  return (
    <TouchableOpacity
      style={[styles.contentItem, {backgroundColor: checked ? '#F4F6FC' : null}]}
      onPress={() => onPressSubmit(data)}
      key={key}>
      <Text style={styles.textItem}>{data[fieldData]}</Text>
      {checked && <Icon name="check" color={'#3B6AE6'} size={16} />}
    </TouchableOpacity>
  );
};

const RenderLuaChon = (props) => {
  const {dataUrl, onPressSubmit, fieldData, fieldId, token, method, inputValue, showSearch, requestBody, value, isMultiSelect} =
    props;

  // const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState([]);
  const [dataItem, setDataItem] = useState(
    isMultiSelect ? (Array.isArray(value) ? _.without(value, {}) : _.without([value], {})) : _.without([value], {}),
  );

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const requestGET = async (URL) => {
      return await axios({
        method: method ? method : 'GET',
        url: inputValue ? `${URL}` : `${URL}`,
        headers: {
          Authorization: 'Bearer ' + token,
        },
        timeout: 15000,
        data: requestBody,
      })
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
          return {data: []};
        });
    };
    const fetchData = async () => {
      setIsLoading(true);
      const response = await requestGET(dataUrl);
      if (response.result || response.data) {
        setData(response.result || response.data);
      }
      setIsLoading(false);
    };
    if (props.data) {
      setData(props.data);
    } else if (dataUrl.length > 0) {
      fetchData();
    }
    return () => {};
  }, [dataUrl, method, props.data, requestBody, token, inputValue]);

  // const handleChangeText = (text) => {
  //   setInputValue(text);
  // };

  const onPressItem = (val) => {
    var temp = [...dataItem];
    temp = _.without(temp, {});
    var ind = temp.findIndex((i) => i[fieldId ? fieldId : 'ID'] === val[fieldId ? fieldId : 'ID']);
    if (ind > -1) {
      temp = temp.filter((i) => i[fieldId ? fieldId : 'ID'] !== val[fieldId ? fieldId : 'ID']);
    } else {
      temp.push(val);
    }
    setDataItem(temp);
    onPressSubmit(temp);
  };

  return (
    <View style={{flex: 1}}>
      {/* {showSearch && <SearchComponent value={inputValue} onChangeText={handleChangeText} />} */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#fb8c00" style={{flex: 1, justifyContent: 'center'}} />
      ) : data.length > 0 ? (
        data.map((item) => {
          var ind = -1;

          try {
            if (dataItem) {
              ind = dataItem.findIndex((i) => i[fieldId ? fieldId : fieldData] === item[fieldId ? fieldId : fieldData]);
            }
          } catch (error) {}

          //value && value[fieldData] === data[fieldData]

          return (
            <RenderItem
              data={item}
              fieldData={fieldData}
              onPressSubmit={isMultiSelect ? onPressItem : onPressSubmit}
              key={item[fieldId ? fieldId : 'ID']}
              value={value}
              checked={ind > -1}
            />
          );
        })
      ) : (
        <TDNoItem />
      )}
    </View>
  );
};

export default RenderLuaChon;

const styles = StyleSheet.create({
  contentItem: {
    paddingVertical: 15,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.2,
    borderBottomColor: '#42a5f560',
  },
  textItem: {
    color: '#22313F',
    fontWeight: '400',
    fontSize: 14,
    flex: 1,
  },
});
