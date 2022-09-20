import { Colors } from '@themes';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

const TDDetailText = (props) => {
  const {
    title,//Tiêu đề
    content,//Nội dung
    isCurrency,//Có phải là tiền tệ, để format lại
  } = props;

  const formatMoney = (amount, decimalCount = 0, decimal = ",", thousands = ".") => {
    amount = (amount + "").replace(",", ".");
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
    const negativeSign = amount < 0 ? "-" : "";
    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substring(0, j) + thousands : '') + i.substring(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
  }

  return content ? (
    <View style={{ marginTop: 5, marginBottom: 5 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
        <FontAwesome name={'info-circle'} color={Colors.blueHope} style={{}} size={13} />
        <Text style={{ marginStart: 10, color: Colors.gray, fontSize: 13, width: '90%' }}>{title}</Text>
      </View>
      <Text style={{ marginStart: 25, marginTop: 5, fontWeight: '500', color: '#263238' }}>{!isCurrency ? content : isNaN(content) ? content : formatMoney(content)}</Text>
    </View>
  ) : (
    <></>
  );
};

export default TDDetailText;

const styles = StyleSheet.create();
