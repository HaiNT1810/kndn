import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Colors } from '@themes';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

const TDDetailLegend = (props) => {
  const { title, children, show } = props;
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    setDisplay(show);
    return () => { };
  }, [show]);

  return title ? (
    <View style={{ marginBottom: 10 }}>
      <TouchableOpacity onPress={() => { setDisplay(!display) }}>
        <Text>
          {!display ? <FontAwesome name={'plus-square'} color="#42A5F5" style={{}} size={16} /> : <FontAwesome name={'minus-square'} color="#42A5F5" style={{}} size={16} />}
          &ensp;
          <Text style={{ marginLeft: 25, marginTop: 5, fontWeight: 'bold', color: Colors.blueHope, fontSize: 16 }}>{title}</Text>
        </Text>
      </TouchableOpacity>
      {display && children != null ?
        !Array.isArray(children) ? React.cloneElement(children) :
          children.length > 1 ?
            children.map((item) => {
              return React.cloneElement(item);
            })
            : <Text>Không có dữ liệu!</Text>
        : <></>}
    </View>
  ) : (
    <></>
  );
};

export default TDDetailLegend;

const styles = StyleSheet.create();
