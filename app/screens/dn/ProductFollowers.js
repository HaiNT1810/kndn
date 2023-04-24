/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    Text,
} from 'react-native';
import { Colors } from '@app/themes';
import { TD_Header } from '@app/components';
import { followers } from '@datas';
import { Flex } from '@ant-design/react-native';
import moment from 'moment';
import { FlatList } from 'react-native';
import { RefreshControl } from 'react-native';
const take = 10;

const ProductFollowers = (props) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(true);
    const [takenTotal, setTakenTotal] = useState(6);//Số lượng đã lấy
    const [total, setTotal] = useState(16);
    const [footerLoad, setFooterLoad] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (takenTotal > data.length) {
                data.push(...followers);
            }
            setData(followers);
            setLoading(false);
            setRefreshing(false);
        };
        if (loading || refreshing) {
            fetchData();
        }
        return () => { };
    }, [loading, refreshing]);

    const onRefresh = () => {
        setRefreshing(true);
    };

    const getLoadMore = async () => {
        setFooterLoad(true);
        if (takenTotal < total) {
            setTakenTotal(takenTotal + take);
            setRefreshing(true);
        }
        else {
            setFooterLoad(false);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: Colors.TD_Background }}>
            <TD_Header checkrightComponent {...props} title="Người theo dõi SP" />
            {loading ? (
                <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} />
            ) : (
                <View style={{ flex: 1 }}>
                    {data ? (
                        <View>
                            <FlatList
                                contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 10 }}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                data={data ? data : []}
                                renderItem={({ item, index }) => {
                                    return <RenderItem item={item} index={index} numberOrder={index + 1} />;
                                }}
                                //onScroll={(a, b) => { _handleOnScroll(a, b) }}
                                keyExtractor={(item, index) => index.toString()}
                                ListEmptyComponent={() => (
                                    <Text style={{ textAlign: 'center', color: '#50565B', marginTop: 10 }}>Không có dữ liệu</Text>
                                )}
                                onEndReached={() => {
                                    getLoadMore()
                                }}
                                onEndReachedThreshold={0.5}
                                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                                ListFooterComponent={
                                    <>
                                        <Text style={{ textAlign: 'center', paddingTop: 20, paddingBottom: 50 }}>Hiển thị <Text style={{ fontWeight: 'bold' }}>{takenTotal}</Text> / {total} người theo dõi</Text>
                                        {footerLoad ? <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} /> : <></>}
                                    </>
                                }
                            />
                        </View>
                    ) : (
                        <Text style={{ textAlign: 'center' }}>Không có dữ liệu!!!</Text>
                    )}
                </View>
            )}
        </View >
    );
};
const RenderItem = (props) => {
    const { item, index, numberOrder } = props;
    return (
        <View style={styles.item}>
            <Flex>
                <Flex.Item flex={1}><Text style={styles.itemOrder}>{numberOrder}</Text></Flex.Item>
                <Flex.Item flex={10}>
                    <Text style={styles.itemName}>{item.Name}</Text>
                    <Text style={styles.itemTime}>{item.Time ? "Ngày theo dõi: " + moment(item.Time).format("HH:mm DD/MM/YYYY") : ""}</Text>
                </Flex.Item>
            </Flex>
        </View>
    );
};

export default ProductFollowers;
const styles = StyleSheet.create({
    itemOrder: { textAlign: 'center', color: Colors.blueHope },
    item: { borderBottomWidth: 0.5, borderBottomColor: Colors.grey, paddingVertical: 5 },
    itemName: { fontSize: 16, fontWeight: '500' },
    itemTime: { color: Colors.grey, fontStyle: 'italic', fontSize: 13 }
});
