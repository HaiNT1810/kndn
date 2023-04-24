/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Keyboard,
  Dimensions,
  Image
} from 'react-native';
import { useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Colors } from '@app/themes';
import { TD_Header } from '@app/components';
import { requestGET } from '@app/services/Api';
import { BASE_URL } from '@app/data';
import { Flex, Icon, Tag } from '@ant-design/react-native';
import moment from 'moment';
import { News_MiniList } from '@app/components/news';
import HTMLView from 'react-native-htmlview';

const LoginHistoryScreen = (props) => {
  const navigation = useNavigation();
  const dataService = useSelector((state) => state.global.dataService);
  const user = useSelector((state) => state.global.user);
  const accessToken = useSelector((state) => state.global.accessToken);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const dataRoute = route?.params ?? {};
  const [webHeight, setWebHeight] = useState(100)

  useEffect(() => {
    const fetchData = async () => {
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
      <TD_Header checkStack title="Đọc tin" />
      {loading ? (
        <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} />
      ) : (
        <View style={{ flex: 1 }}>
          {data ? (
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={{ backgroundColor: '#fff' }}>
              <View style={{ flex: 1, paddingBottom: 50 }}>
                <View style={{ paddingHorizontal: 10, marginBottom: 20 }}>
                  <Text style={styles.newsTitle}>{data.title}</Text>
                  <Flex style={{}}>
                    <Flex.Item>
                      <Text style={{ textAlign: 'left', fontSize: 13 }}>
                        <Icon style={{ width: 20 }} name="calendar" size={13} color="#64B5F6" /> {data.from ? moment(data.from).format("DD/MM/yyyy") : ""}
                      </Text>
                    </Flex.Item>
                    <Flex.Item>
                      <Text style={{ textAlign: 'center', fontSize: 13 }}>
                        <FontAwesome style={{ width: 20 }} name="thumb" size={13} color="#64B5F6" /> 100
                      </Text>
                    </Flex.Item>
                    <Flex.Item>
                      <Text style={{ textAlign: 'left', fontSize: 13 }}>
                        <FontAwesome style={{ width: 20 }} name="comment" size={13} color="#009ef6" />20
                      </Text>
                    </Flex.Item>
                  </Flex>
                  <Text>{data.tags?.map(a => { return (<Tag style={{ paddingRight: 3 }} key={"t" + a} small>{a}</Tag>) })}</Text>
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
                  <News_MiniList headerText={"Tin khác"} showSeeMore={false}></News_MiniList>
                </View>
              </View>
            </ScrollView>
          ) : (
            <Text>Không tìm thấy!!!</Text>
          )}
        </View>
      )
      }
    </View >
  );
};

export default LoginHistoryScreen;
const styles = StyleSheet.create({
  newsTitle: { paddingTop: 10, paddingBottom: 10, fontSize: 18, fontWeight: 'bold' },
  itemImage: { width: '100%', height: 200, marginTop: 10, marginBottom: 2, marginRight: 10, borderRadius: 5 },
});
