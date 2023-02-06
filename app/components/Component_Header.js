/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Flex } from '@ant-design/react-native';
import { useNavigation } from '@react-navigation/native';
import { Header } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import LinearGradient from 'react-native-linear-gradient';

//Header of the blocks in homepage
const Component_Header = (props) => {
  let { headerText, lineColor, textIcon, seeMore } = props;
  headerText = headerText || "";
  //line color
  const lineColors = {
    blue: ['#e1f3fb', '#bae8fb', '#bae8fb', '#e1f3fb'],
    green: ['#9effca61', '#9effca', '#9effca', '#9effca61'],
    yellow: ['#fbe26742', '#fbe267', '#fbe267', '#fbe26742'],
    red: ['#ff3c3386', '#ff3c33', '#ff3c33', '#ff3c3386']
  }
  switch (lineColor) {
    case "blue":
    case "green":
    case "yellow":
    case "red":
      lineColor = lineColors[lineColor];
      break;
    default:
      lineColor = lineColor || ['#F0F1F3', '#E5E9ED', '#E5E9ED', '#F0F1F3'];
      break;
  }
  //
  textIcon = textIcon || { name: "calendar", color: "#64B5F6", size: 18 };
  seeMore = seeMore || { show: true, onPressFunc: () => { } }
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={lineColor}
      style={styles.lineStyle}>
      <Flex justify="between">
        <Text style={styles.headerText}><FontAwesome style={{ width: 20 }} name={textIcon?.name} size={textIcon?.size} color={textIcon?.color} /> {headerText}</Text>
        {seeMore.show ? (<TouchableOpacity onPress={seeMore.onPressFunc}><Text style={{ ...styles.seeMore, color: textIcon?.color }}>Xem thêm <FontAwesome style={{ width: 20 }} name="arrow-right" size={textIcon?.size} color={textIcon?.color} /></Text></TouchableOpacity>) : (<></>)}
      </Flex>
    </LinearGradient>
  );
};

export default Component_Header;

const styles = StyleSheet.create({
  //lineStyle: { paddingLeft: 10, paddingRight: 10, paddingTop: 8, paddingBottom: 8, borderBottomLeftRadius: 5, borderBottomRightRadius: 5 },
  headerText: { paddingTop: 8, paddingLeft: 15, paddingBottom: 8, fontWeight: 'bold', fontSize: 18 },
  itemImage: { width: 75, height: 75, marginBottom: 2, marginRight: 10, borderRadius: 5 },
  seeMore: { paddingRight: 20, fontWeight: 'bold', fontSize: 15 }
});
