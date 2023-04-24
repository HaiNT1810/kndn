/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Colors } from '@app/themes';
import { TD_Header } from '@app/components';
import { Card, List, WingBlank } from '@ant-design/react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import { ScrollView } from 'react-native-gesture-handler';

const DNHomeScreen = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const dataService = useSelector((state) => state.global.dataService);
  const user = useSelector((state) => state.global.user);
  const AccessToken = useSelector((state) => state.global.AccessToken);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {

    };
    if (refreshing) {
      fetchData();
      setRefreshing(false);
    }
    return () => { };
  }, [refreshing]);

  useEffect(() => {
    setRefreshing(true);
    return () => { };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.TD_Background }}>
      <TD_Header checkrightComponent {...props} title="Trang chủ" />
      {refreshing ? (
        <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} />
      ) : (
        <ScrollView style={{ flex: 1 }}>
          <WingBlank size="md" style={{ marginTop: 15 }}>
            <Card>
              <Card.Header
                title="Thống kê"
                thumb={<FontAwesome name="chart-area" size={20} color={Colors.primary} style={{ marginEnd: 5 }} solid />}
              />
              <Card.Body><Text>Không có thống kê thì bỏ!</Text></Card.Body>
            </Card>
          </WingBlank>
          <WingBlank size="md" style={{ marginTop: 15 }}>
            <Card>
              <Card.Header
                title="Lời nhắc"
                thumb={<FontAwesome name="bells" size={20} color={Colors.yellow} style={{ marginEnd: 5 }} solid />}
              />
              <Card.Body>
                <View style={{ marginHorizontal: 10 }}>
                  <List renderHeader={'Từ cơ quan quản lý'}>
                    <List.Item thumb={<FontAwesome name="bells" size={20} color={Colors.red} style={{ marginEnd: 5 }} />}>
                      <TouchableOpacity onPress={() => console.log(123)}>
                        <Text>Yêu cầu doanh nghiệp nộp báo cáo đúng hạn</Text>
                      </TouchableOpacity>
                    </List.Item>
                  </List>
                  <List renderHeader={'Sản phẩm'}>
                    <List.Item thumb={<FontAwesome name="eye" size={20} color={Colors.green} style={{ marginEnd: 5 }} />}>
                      <TouchableOpacity onPress={() => console.log(123)}>
                        <Text><Text style={{ fontWeight: "bold" }}>5</Text> người theo dõi mới</Text>
                      </TouchableOpacity>
                    </List.Item>
                    <List.Item thumb={<FontAwesome name="star" size={20} color={Colors.green} style={{ marginEnd: 5 }} />}>
                      <TouchableOpacity onPress={() => console.log(123)}>
                        <Text><Text style={{ fontWeight: "bold" }}>12</Text> đánh giá mới</Text>
                      </TouchableOpacity>
                    </List.Item>
                    <List.Item thumb={<FontAwesome name="comments" size={20} color={Colors.green} style={{ marginEnd: 5 }} />}>
                      <TouchableOpacity onPress={() => console.log(123)}>
                        <Text><Text style={{ fontWeight: "bold" }}>5</Text> phản hồi chưa xem</Text>
                      </TouchableOpacity>
                    </List.Item>
                    <List.Item thumb={<FontAwesome name="phone" size={20} color={Colors.green} style={{ marginEnd: 5 }} />}>
                      <TouchableOpacity onPress={() => console.log(123)}>
                        <Text><Text style={{ fontWeight: "bold" }}>7</Text> yêu cầu liên hệ về sản phẩm</Text>
                      </TouchableOpacity>
                    </List.Item>
                  </List>
                  <List renderHeader={'Doanh nghiệp/Cơ sở'}>
                    <List.Item thumb={<FontAwesome name="eye" size={20} color={Colors.blueHope} style={{ marginEnd: 5 }} />}>
                      <TouchableOpacity onPress={() => console.log(123)}>
                        <Text><Text style={{ fontWeight: "bold" }}>7</Text> người theo dõi mới</Text>
                      </TouchableOpacity>
                    </List.Item>
                    <List.Item thumb={<FontAwesome name="star" size={20} color={Colors.blueHope} style={{ marginEnd: 5 }} />}>
                      <TouchableOpacity onPress={() => console.log(123)}>
                        <Text><Text style={{ fontWeight: "bold" }}>78</Text> đánh giá mới</Text>
                      </TouchableOpacity>
                    </List.Item>
                    <List.Item thumb={<FontAwesome name="comments" size={20} color={Colors.blueHope} style={{ marginEnd: 5 }} />}>
                      <TouchableOpacity onPress={() => console.log(123)}>
                        <Text><Text style={{ fontWeight: "bold" }}>546</Text> phản hồi chưa xem</Text>
                      </TouchableOpacity>
                    </List.Item>
                    <List.Item thumb={<FontAwesome name="phone" size={20} color={Colors.blueHope} style={{ marginEnd: 5 }} />}>
                      <TouchableOpacity onPress={() => console.log(123)}>
                        <Text><Text style={{ fontWeight: "bold" }}>5</Text> liên hệ với doanh nghiệp</Text>
                      </TouchableOpacity>
                    </List.Item>
                  </List>
                </View>
              </Card.Body>
            </Card>
          </WingBlank>
        </ScrollView>
      )}
    </View >
  );
};

export default DNHomeScreen;
const styles = StyleSheet.create({
  newsTitle: { paddingTop: 10, fontSize: 18, fontWeight: 'bold' },
  itemImage: { width: '100%', height: 200, marginTop: 10, marginBottom: 2, marginRight: 10, borderRadius: 5 },
});
