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
import { ScrollView } from 'react-native';

const CBHomeScreen = (props) => {
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
                title="Thống kê tổng hợp thành viên"
                thumb={<FontAwesome name="chart-area" size={20} color={Colors.primary} style={{ marginEnd: 5 }} solid />}
              />
              <Card.Body></Card.Body>
            </Card>
          </WingBlank>
          <WingBlank size="md" style={{ marginTop: 15 }}>
            <Card>
              <Card.Header
                title="Thống kê tổng hợp cơ sở"
                thumb={<FontAwesome name="chart-area" size={20} color={Colors.primary} style={{ marginEnd: 5 }} solid />}
              />
              <Card.Body></Card.Body>
            </Card>
          </WingBlank>
          <WingBlank size="md" style={{ marginTop: 15 }}>
            <Card>
              <Card.Header
                title="Thống kê sản phẩm"
                thumb={<FontAwesome name="chart-area" size={20} color={Colors.primary} style={{ marginEnd: 5 }} solid />}
              />
              <Card.Body></Card.Body>
            </Card>
          </WingBlank>
          <WingBlank size="md" style={{ marginTop: 15 }}>
            <Card>
              <Card.Header
                title="Thống kê đánh giá"
                thumb={<FontAwesome name="chart-area" size={20} color={Colors.primary} style={{ marginEnd: 5 }} solid />}
              />
              <Card.Body></Card.Body>
            </Card>
          </WingBlank>
          <WingBlank size="md" style={{ marginTop: 15 }}>
            <Card>
              <Card.Header
                title="Thống kê phản hồi"
                thumb={<FontAwesome name="chart-area" size={20} color={Colors.primary} style={{ marginEnd: 5 }} solid />}
              />
              <Card.Body></Card.Body>
            </Card>
          </WingBlank>
          <WingBlank size="md" style={{ marginTop: 15 }}>
            <Card>
              <Card.Header
                title="Thống kê bình luận"
                thumb={<FontAwesome name="chart-area" size={20} color={Colors.primary} style={{ marginEnd: 5 }} solid />}
              />
              <Card.Body></Card.Body>
            </Card>
          </WingBlank>
          <WingBlank size="md" style={{ marginVertical: 15 }}>
            <Card>
              <Card.Header
                title="Thống kê chủ đề"
                thumb={<FontAwesome name="chart-area" size={20} color={Colors.primary} style={{ marginEnd: 5 }} solid />}
              />
              <Card.Body></Card.Body>
            </Card>
          </WingBlank>
        </ScrollView>
      )}
    </View >
  );
};

export default CBHomeScreen;
const styles = StyleSheet.create({
  newsTitle: { paddingTop: 10, fontSize: 18, fontWeight: 'bold' },
  itemImage: { width: '100%', height: 200, marginTop: 10, marginBottom: 2, marginRight: 10, borderRadius: 5 },
});
