/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useEffect} from 'react';

import {StyleSheet, Text, View, ScrollView, Animated, TouchableOpacity, ActivityIndicator} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';

import RenderContentCascader from './RenderContentCascader';
import RenderHeaderCascader from './RenderHeaderCascader';
import {requestGET} from '../../services/Api';
const TextInputLuaChon = (props) => {
  const {
    value,
    title,
    placeholder,
    isImportant,
    onPressReset,
    onPressSubmit,
    token,
    dataUrl,
    isMultiSelect,
    numberOfLines,
    modalHeight,
    snapPoint,
  } = props;
  const refRBSheet = useRef();
  const contentRef = useRef < Animated.AnimatedComponent < ScrollView >> null;
  const modalizeRef = useRef(null);
  const [result, setResult] = useState(value ? value : []);
  const [dataCategory, setDataCategory] = useState(false);
  const [dataHistory, setDataHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchCategory = async () => {
      setIsLoading(true);
      var res = await requestGET(dataUrl);
      if (res && res.succeeded && res.data) {
        var newItem = {
          level: 1,
          title: title ? title : 'Lựa chọn',
          data: res.data,
        };
        setDataHistory([...dataHistory, newItem]);
      }
      setIsLoading(false);
    };
    fetchCategory();
    return () => {};
  }, [dataUrl]);
  const ModalHide = () => {
    setResult([]);
    setDataHistory([dataHistory[0]]);
    modalizeRef.current?.close();
  };
  const ModalShow = () => {
    modalizeRef.current?.open();
  };
  const handleOnPressSubmit = (val) => {
    //console.log(val);
    onPressSubmit(val);
  };
  const handleOnPressReset = () => {
    var temp = [...dataHistory];
    setResult([]);
    setDataHistory(temp.splice(0, 1));
    modalizeRef.current?.close();
    onPressReset();
  };

  const formatString = (arr) => {
    return arr.map((i) => i.name).join('/');
  };

  let colorText = value && value.length > 0 ? '#424242' : '#BDBDBD';

  return (
    <>
      {title ? (
        <TouchableOpacity
          style={styles.containterTitle}
          onPress={() => {
            modalizeRef.current?.open();
          }}>
          <View style={{flex: 1}}>
            <Text style={styles.title}>
              {title}:<Text style={{color: 'red', fontWeight: 'bold'}}>{isImportant ? ' *' : ''}</Text>
            </Text>

            <Text
              style={[
                styles.textinput,
                {
                  color: colorText,
                },
              ]}>
              {value && value.length > 0 ? formatString(value) : placeholder ? placeholder : title}
            </Text>
          </View>
          <FontAwesome name={'chevron-down'} color={'gray'} style={{marginStart: 5}} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.containerNoTitle}
          onPress={() => {
            modalizeRef.current?.open();
          }}>
          <View style={styles.contentNoTitle}>
            <Text
              style={[
                styles.textinput,
                {
                  color: colorText,
                },
              ]}>
              {value && value.length > 0 ? formatString(value) : placeholder ? placeholder : title}
            </Text>
          </View>
          <FontAwesome name={'chevron-down'} color={'gray'} style={{marginStart: 5}} />
        </TouchableOpacity>
      )}
      <Portal style={{backgroundColor: 'red'}}>
        <Modalize
          scrollViewProps={{showsVerticalScrollIndicator: false}}
          ref={modalizeRef}
          contentRef={contentRef}
          onOverlayPress={ModalHide}
          HeaderComponent={() => (
            <RenderHeaderCascader
              {...props}
              dataHistory={dataHistory}
              setDataHistory={setDataHistory}
              ModalHide={ModalHide}
              handleOnPressReset={handleOnPressReset}
            />
          )}
          FooterComponent={() => <View style={{height: 20}} />}
          modalHeight={modalHeight ? modalHeight : 500}
          //adjustToContentHeight={true}
          snapPoint={snapPoint || 500}>
          {isLoading ? (
            <View style={{flex: 1}}>
              <ActivityIndicator size="large" color="#fb8c00" style={{flex: 1, justifyContent: 'center', marginTop: 30}} />
            </View>
          ) : (
            <RenderContentCascader
              actionSheetRef={refRBSheet}
              ModalHide={ModalHide}
              ModalShow={ModalShow}
              {...props}
              dataHistory={dataHistory}
              setDataHistory={setDataHistory}
              onPressSubmit={handleOnPressSubmit}
              result={result}
              setResult={setResult}
            />
          )}
        </Modalize>
      </Portal>
    </>
  );
};

export default TextInputLuaChon;

const styles = StyleSheet.create({
  containerNoTitle: {
    paddingHorizontal: 10,
    borderRadius: 4,
    flex: 1,
    margin: 5,
    borderColor: '#D1D1D1',
    borderWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentNoTitle: {
    paddingBottom: 5,
    borderRadius: 4,
    flexDirection: 'row',
    flex: 9,
    minHeight: 40,
    alignItems: 'center',
  },
  containterTitle: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 4,
    flex: 1,
    margin: 10,
    borderColor: '#abb4bd65',
    borderWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {color: '#757575', fontSize: 14, fontWeight: 'bold'},
  textinput: {flex: 1, marginTop: 5, fontWeight: '500'},
});
