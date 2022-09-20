/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { Flex, Icon } from '@ant-design/react-native';
import { Colors } from '@app/themes';

let tmrSearch;
const DbSFilter_SumaryResult = (props) => {
  const { total, skip, top, funcChangePage, loading } = props;
  const [currentPage, setCurrentPage] = useState(Math.round(skip / top) + 1);
  const [thisPage, setThisPage] = useState(currentPage);
  const totalPage = Math.round(total / top);

  useEffect(() => {
    setCurrentPage(Math.round(skip / top) + 1);
    setThisPage(Math.round(skip / top) + 1);
  }, [skip])

  const change = (event) => {
    setThisPage(event.nativeEvent.text);
    let num = parseInt(event.nativeEvent.text.replace(/[^0-9]/g, '')) || 0;
    tmrSearch && clearTimeout(tmrSearch);
    tmrSearch = setTimeout(_ => setPage(num), 500);

  }
  const setPage = (num) => {
    if (num.length === 0 || num == 0 || num > totalPage) {
      num = currentPage;
    }
    setThisPage(num);
    if (num != currentPage) {
      setCurrentPage(num);
      funcChangePage(num);
    }
  }

  return (
    <View style={styles.filterText}>
      <Flex>
        <Flex.Item>
          <Text>
            Tìm thấy <Text style={{ color: Colors.red, fontWeight: 'bold' }}>{total}</Text> kết quả
          </Text>
        </Flex.Item>
        <Flex.Item style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Text>Trang&ensp;</Text>
          <Icon name='left-circle' size={18} color={!loading && thisPage > 1 ? Colors.blueHope : ''}
            onPress={!loading && thisPage > 1 ? () => { setPage(currentPage - 1) } : () => { }}></Icon>
          <TextInput
            style={styles.textInput}
            keyboardType='numeric'
            onChange={(event) => { change(event) }}
            value={thisPage + ''}
            editable={!loading}
          />
          <Text>/{totalPage}&ensp;</Text>
          <Icon name='right-circle' size={18} color={!loading && thisPage < totalPage ? Colors.blueHope : ''}
            onPress={!loading && thisPage < totalPage ? () => { setPage(currentPage + 1) } : () => { }}></Icon>
        </Flex.Item>
      </Flex>

    </View>
  );
};

export default DbSFilter_SumaryResult;

const styles = StyleSheet.create({
  filterText: {
    paddingHorizontal: 10, paddingVertical: 5, backgroundColor: '#fff', shadowColor: Colors.grey,
    shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3
  },
  textInput: { borderWidth: 0.5, borderColor: Colors.grey, height: 20, paddingHorizontal: 1, paddingVertical: 1, alignItems: 'center', marginHorizontal: 5, textAlign: 'center', }
})
