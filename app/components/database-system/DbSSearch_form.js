/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet, View, ScrollView, ActivityIndicator, Text, Keyboard, TouchableWithoutFeedback, TouchableOpacity
} from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@themes';
import { TDPickerSelect, TDTextInputNew, TDRadioList } from '@app/components/tdcommon';
import { Divider } from 'react-native-elements';
import { showMessage } from 'react-native-flash-message';
import { BASE_URL, fullOrderData } from '@app/data';

const typeData = [
  {
    label: "Cơ sở sản xuất, kinh doanh sản phẩm công nghiệp",
    value: "cssx"
  },
  {
    label: "Sản phẩm công nghiệp",
    value: "spcn"
  },
  {
    label: "Khu công nghiệp",
    value: "kcn"
  },
  {
    label: "Cụm công nghiệp",
    value: "ccn"
  },
  {
    label: "Làng nghề công nghiệp",
    value: "lncn"
  },
  {
    label: "Địa điểm kinh doanh",
    value: "ddkd"
  }
]
const data = [
  {
    title: "Cơ khí chế tạo",
    count: 214
  },
  {
    title: "Ô tô",
    count: 123
  },
  {
    title: "Dệt may",
    count: 111
  },
  {
    title: "Da giày",
    count: 32
  },
  {
    title: "Điện tử",
    count: 23
  },
  {
    title: "Khác",
    count: 12
  },
]

const Picker = (props) => {
  const { title, value, data, defaultValue, setDataFunc, isMultiSelect, isRequired, disabled } = props;
  return (
    <View style={{ marginVertical: 5 }}>
      <Text style={{ marginHorizontal: 10, color: '#5B6062', fontWeight: 'bold' }}> {title}{isRequired ? <Text style={{ color: Colors.red }}> *</Text> : <></>}</Text>
      <TDPickerSelect value={value} placeholder={title} token={''} data={data}
        fieldData={'label'} fieldId={'value'} isMultiSelect={isMultiSelect} disable={disabled}
        onPressReset={() => {
          setDataFunc(defaultValue)
        }}
        onPressSubmit={(e) => {
          setDataFunc(e);
        }}
        style={{ flex: 1 }}
      />
    </View>
  )
}

const DbSSearch_form = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false);
  const [order, setOrder] = useState(fullOrderData[0]);
  const [type, setType] = useState(typeData[0]);
  const [slLaoDong, setslLaoDong] = useState({});
  const [loaiHinh, setLoaiHinh] = useState({});
  const [tieuChuan, setTieuChuan] = useState({});
  const [diaBan, setDiaBan] = useState({});
  const [q, setQ] = useState('');

  useEffect(() => {
    setLoading(false);
    return () => { };
  }, [loading]);

  const handleSearch = () => {
    Keyboard.dismiss();
    setRefreshing(true);
    let obj = { q };
    if (order && order.value) obj["order"] = order.value || null;
    if (slLaoDong && slLaoDong.value) obj["slLaoDong"] = slLaoDong.value || null;
    if (loaiHinh && loaiHinh.value) obj["loaiHinh"] = loaiHinh.value || null;
    if (tieuChuan && tieuChuan.value) obj["tieuChuan"] = tieuChuan.value || null;
    if (diaBan && diaBan.value) obj["diaBan"] = diaBan.value || null;
    if (!(type && Object.keys(type).length !== 0 && Object.getPrototypeOf(type) === Object.prototype)) {
      showMessage({
        message: 'Chưa chọn loại cơ sở dữ liệu!',
        type: 'warning',
        duration: 800,
      });
      return;
    }
    else {
      switch (type.value) {
        case 'cssx':
          navigation.navigate("DBSBusiness_FilterScreen", obj);
          break;
        case 'spcn':
          navigation.navigate("DBSProduct_FilterScreen", obj);
          break;
        case 'kcn':
          //navigation.navigate("", obj);
          break;
        case 'ccn':
          //navigation.navigate("", obj);
          break;
        case 'lncn':
          //navigation.navigate("", obj);
          break;
        case 'ddkd':
          //navigation.navigate("", obj);
          break;
      }
    }
    setRefreshing(false);
  }

  return (
    <ScrollView style={[styles.container]}>
      {loading ? (
        <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} />
      ) : (
        <View style={{ backgroundColor: Colors.backgroundColor }}>
          <Picker title="Loại cơ sở dữ liệu" value={type} data={typeData} defaultValue={typeData[0]} setDataFunc={setType} isRequired disabled={refreshing}></Picker>
          {type.value == 'cssx' || type.value == 'spcn' ?
            <Picker title="Loại hình" value={order} data={fullOrderData} defaultValue={{}} setDataFunc={setOrder} isMultiSelect={true} disabled={refreshing}></Picker>
            : <></>}
          {type.value == 'cssx' ?
            <>
              <Picker title="Số lượng lao động" value={slLaoDong} data={fullOrderData} defaultValue={{}} setDataFunc={setslLaoDong} disabled={refreshing}></Picker>
              <Picker title="Loại hình doanh nghiệp" value={loaiHinh} data={fullOrderData} defaultValue={{}} setDataFunc={setLoaiHinh} disabled={refreshing}></Picker>
              <Picker title="Tiêu chuẩn chất lượng" value={tieuChuan} data={fullOrderData} defaultValue={{}} setDataFunc={setTieuChuan} disabled={refreshing}></Picker>
            </>
            : <></>}

          <Picker title="Địa bàn" value={diaBan} data={fullOrderData} defaultValue={{}} setDataFunc={setDiaBan} disabled={refreshing}></Picker>
          <TDTextInputNew
            value={q}
            onChangeText={setQ}
            placeholder={'Từ khóa'}
            title={'Từ khóa'}
            disable={refreshing}
          />
          <Divider width={1} color={Colors.lightBlueHope} />
          {/* Sắp xếp */}
          {/* <Picker title="Sắp xếp" value={order} data={fullOrderData} defaultValue={fullOrderData[0]} setDataFunc={setOrder} disabled={refreshing}></Picker> */}
          <TDRadioList
            onChangeValue={value => { setOrder(fullOrderData.filter(item => item.value == value)[0]) }}
            value={order.value}
            data={fullOrderData}
            title="Sắp xếp"
            inline />

          <Divider width={1} color={Colors.lightBlueHope} />
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 10
          }}>
            <Button title={'Tra cứu'} onPress={handleSearch} loading={refreshing}></Button>
          </View>
          <Divider width={1} color={Colors.white} style={{ marginTop: 75 }} />
        </View>
      )
      }
    </ScrollView >
  );
};

export default DbSSearch_form;

const styles = StyleSheet.create({
  container: {},

})
