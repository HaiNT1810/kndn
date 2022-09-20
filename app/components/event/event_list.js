/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState } from 'react';
import { StyleSheet, ScrollView, View, Image, Text, FlatList, TouchableHighlight } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import moment from 'moment';


const Event_List = () => {
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
  const _onPress = (id) => {

  }
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item, index, separators }) => (
          <TouchableHighlight
            key={item.ID}
            onPress={() => _onPress(item.ID)}
            onShowUnderlay={separators.highlight}
            onHideUnderlay={separators.unhighlight} >
            <View style={{ backgroundColor: 'white' }}>
              <Text>{item.title} </Text>
            </View>
          </TouchableHighlight>
        )}
      />
    </View>
  );
};

export default Event_List;

const styles = StyleSheet.create({
})
