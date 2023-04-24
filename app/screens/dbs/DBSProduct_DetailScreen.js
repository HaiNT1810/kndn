/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Text,
  Dimensions,
  Image
} from 'react-native';
import { useSelector } from 'react-redux';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Colors } from '@app/themes';
import { TD_Header } from '@app/components';
import { requestGET } from '@app/services/Api';
import { BASE_URL } from '@app/data';
import { FB_MiniList } from '@app/components/forbuy';
import HTMLView from 'react-native-htmlview';
import { Comment_StartView, Posts_TimeLikeView } from '@app/components/interactive';

const DBSProduct_DetailScreen = (props) => {
  const navigation = useNavigation();
  const dataService = useSelector((state) => state.global.dataService);
  const user = useSelector((state) => state.global.user);
  const accessToken = useSelector((state) => state.global.accessToken);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const dataRoute = route?.params ?? {};

  useEffect(() => {
    const fetchData = async () => {
      //console.log(dataRoute.id)
      setData({
        ID: 12,
        image: require('@images/products/car.jpg'),
        title: "Rạng Đông tìm kiếm đối tác kết nối sản phẩm CNHT - Phích nước thủy tinh",
        content: "<div>Công ty cổ phần Bóng đèn <b>Phích nước Rạng Đông</b> (tiền thân là nhà máy Bóng đèn Phích nước Rạng Đông) được khởi công xây dựng từ năm 1958, là một trong 13 nhà máy đầu tiên được thành lập theo quyết định của Chính phủ, đặt nền móng cho nền công nghiệp Việt Nam thời kỳ đầu xây dựng chủ nghĩa xã hội.</div>",
        from: '2022-05-04',
        view: 10,
        tags: ["Bóng đèn", "Rạng đông"]
      });
      setLoading(false);
    };
    fetchData();
    return () => { };
  }, [dataRoute]);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.TD_Background }}>
      <TD_Header checkStack {...props} title="Thông tin cơ sở" />
      {loading ? (
        <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} />
      ) : (
        <View style={{ flex: 1 }}>
          {data ? (
            <View>
              <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={{ backgroundColor: '#fff' }}>
                <View style={{ flex: 1, paddingBottom: 50 }}>
                  <View style={{ paddingHorizontal: 10, marginBottom: 20 }}>
                    <Text style={styles.newsTitle}>{data.title}</Text>
                    <Posts_TimeLikeView time={data.from} like={100} view={data.view} comment={20} tags={data.tags}></Posts_TimeLikeView>
                    <Image
                      source={data.image}
                      style={styles.itemImage}
                    />

                    <View style={{ flex: 1 }}>
                      <HTMLView
                        value={data.content}
                      />
                    </View>
                  </View>

                  <View style={{ flex: 1 }}>
                    <FB_MiniList headerText={"Chào mua khác"} showSeeMore={false}></FB_MiniList>
                  </View>
                </View>
              </ScrollView>
            </View>
          ) : (
            <Text>Không tìm thấy!!!</Text>
          )}
        </View>
      )}
    </View>
  );
};

export default DBSProduct_DetailScreen;
const styles = StyleSheet.create({
  newsTitle: { paddingTop: 10, paddingBottom: 10, fontSize: 18, fontWeight: 'bold' },
  itemImage: { width: '100%', height: 200, marginTop: 10, marginBottom: 2, marginRight: 10, borderRadius: 5 },
});
