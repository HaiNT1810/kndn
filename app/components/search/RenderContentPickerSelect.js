/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import _ from 'lodash';
/* import {TouchableOpacity, RectButton} from 'react-native-gesture-handler';
 */
import TDNoItem from './TDNoItem';
import {requestGET} from '../../services//Api';
const RenderItem = (props) => {
  const {data, onPressSubmit, fieldData, index, checked} = props;

  return (
    <TouchableOpacity
      style={[styles.contentItem, {backgroundColor: checked ? '#F4F6FC' : null}]}
      onPress={() => onPressSubmit(data)}
      key={index}>
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
  const [dataTmp, setDataTmp] = useState([]);
  const [dataItem, setDataItem] = useState(
    isMultiSelect ? (Array.isArray(value) ? _.without(value, {}) : _.without([value], {})) : _.without([value], {}),
  );

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await requestGET(dataUrl);
      if (response.result || response.data) {
        setData(response.result || response.data);
        setDataTmp(response.result || response.data);
      }
      setIsLoading(false);
    };
    if (props.data) {
      setData(props.data);
      setDataTmp(props.data);
    } else if (dataUrl?.length > 0) {
      fetchData();
    }
    return () => {};
  }, [dataUrl, method, props.data, requestBody, token]);

  useEffect(() => {
    if (inputValue) {
      var temp = dataTmp.filter((i) => {
        return ToSlug(i[fieldData]).indexOf(ToSlug(inputValue)) > -1;
      });
      setData(temp);
    } else {
      setData(dataTmp);
    }
    return () => {};
  }, [inputValue]);

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
  const ToSlug = (str) => {
    if (str) {
      str = str.replace(/^\s+|\s+$/g, '');
      str = str.toLowerCase();
      0;
      var from = 'àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ·/_,:;';
      var to = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd------';
      for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
      }
      str = str
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
    }
    return str;
  };
  return (
    <View style={{flex: 1}}>
      {/* {showSearch && <SearchComponent value={inputValue} onChangeText={handleChangeText} />} */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#fb8c00" style={{flex: 1, justifyContent: 'center', marginTop: 30}} />
      ) : data.length > 0 ? (
        data.map((item, index) => {
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
              index={index}
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
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#42a5f560',
  },
  textItem: {
    color: '#22313F',
    fontWeight: '400',
    fontSize: 14,
    flex: 1,
  },
});
