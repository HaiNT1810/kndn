/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState } from 'react';
import { StyleSheet, ScrollView, View, Image, Text, Dimensions, TouchableOpacity } from 'react-native';
import { Flex } from '@ant-design/react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import LinearGradient from 'react-native-linear-gradient';
import { Component_Header } from '@app/components';
const { height, width } = Dimensions.get('window');
import { useRoute, useNavigation } from '@react-navigation/native';
import { Colors } from '@themes';
import { Posts_TimeLikeView } from '@app/components/interactive';

const News_List = (props) => {
  const navigation = useNavigation();
  const { headerText, onPressSeeMore, showSeeMore } = props;
  const data = [
    {
      ID: 1,
      image: require('@images/products/leather-shoes.jpg'),
      title: "Nhựa An Phú Việt tìm kiếm đối tác kết nối sản phẩm CNHT – Linh kiện điện thoại vỏ ốp",
      content: "Công ty TNHH nhựa An Phú Việt chuyên sản xuất các sản phẩm từ plastic như linh kiện điện tử, điện thoại, xe máy; lắp ráp các phụ tùng thiết bị điện tử cung cấp cho các Công ty lớn như Samsung Việt Nam, Panasonic, Brother, Honda,...",
      from: '2022-05-03',
      view: 25,
      tags: null
    }, {
      ID: 12,
      image: require('@images/products/car.jpg'),
      title: "Rạng Đông tìm kiếm đối tác kết nối sản phẩm CNHT - Phích nước thủy tinh",
      content: "Công ty cổ phần Bóng đèn Phích nước Rạng Đông (tiền thân là nhà máy Bóng đèn Phích nước Rạng Đông) được khởi công xây dựng từ năm 1958, là một trong 13 nhà máy đầu tiên được thành lập theo quyết định của Chính phủ, đặt nền móng cho nền công nghiệp Việt Nam thời kỳ đầu xây dựng chủ nghĩa xã hội.",
      from: '2022-05-04',
      view: 10,
      tags: ["Bóng đèn", "Rạng đông"]
    }, {
      ID: 13,
      image: require('@images/products/mechanical-engineering.jpg'),
      title: "Thành Long tìm kiếm đối tác kết nối sản phẩm CNHT - Lò xo",
      content: "CÔNG TY TNHH LÒ XO THÀNH PHÁT chuyên sản xuất các loại lò xo dùng trong sản xuất công nghiệp, dịch vụ, mặt hàng trang trí ... Lò xo được sản xuất trên dây chuyền công nghệ máy móc CNC hiện đại hoàn toàn tự động , đáp ứng được mọi yêu cầu của khách hàng",
      from: '2022-06-01',
      view: 200,
      tags: ["Cơ khí chế tạo", "ThanhLong", "CÔNG TY TNHH LÒ XO THÀNH PHÁT"]
    },]
  return (
    <View style={styles.container}>
      <Component_Header
        headerText={headerText || "Tin tức"}
        seeMore={{ show: showSeeMore == null ? true : showSeeMore, onPressFunc: onPressSeeMore }}
        textIcon={{ name: "newspaper", color: Colors.blueHope, size: 18 }}></Component_Header>
      {data && data.length ? (<>
        <ScrollView horizontal={true}>
          {data.map(x => {
            return (
              <View key={"new" + x.ID} style={styles.newsItem}>
                <TouchableOpacity onPress={() => { navigation.navigate('News_DetailScreen', { id: x.ID }); }}                >
                  <Image style={styles.newsImage} source={x.image}></Image>
                  <Text style={styles.newsTitle}>{x.title}</Text>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    colors={['#bbb1', '#bbb5']}
                    style={styles.newsParams}>
                    <Posts_TimeLikeView like={100} view={x.view} comment={20}></Posts_TimeLikeView>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </>) : <></>}

    </View>
  );
};

export default News_List;

const styles = StyleSheet.create({
  newsItem: { width: width * 0.75, padding: 10 },
  headerText: { paddingTop: 8, paddingLeft: 15, paddingBottom: 8, fontWeight: 'bold', fontSize: 18 },
  newsImage: { width: '100%', height: 150, marginBottom: 0, marginRight: 10, borderTopLeftRadius: 5, borderTopRightRadius: 5, borderColor: 'silver', borderWidth: 1 },
  newsTitle: { width: '100%', paddingLeft: 10, paddingRight: 10, position: 'absolute', bottom: 38, left: 0, color: '#fff', backgroundColor: "#28282873", fontSize: 16, textAlign: 'center' },
  newsParams: { paddingLeft: 10, paddingRight: 10, paddingTop: 8, paddingBottom: 8, borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }

})
