/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { Colors, Images } from '@app/themes';
import { TD_Header } from '@app/components';
import { feedbacks } from '@datas';
import { Flex, Icon } from '@ant-design/react-native';
import moment from 'moment';
import { FlatList } from 'react-native';
import { RefreshControl } from 'react-native';
import { Avatar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
const width = Dimensions.get('screen').width;
const imageWidth = width / 15 * 2 - 10;
const take = 10;

const ProductFeedbacks = (props) => {
    const user = useSelector((state) => state.global.user);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(true);
    const [takenTotal, setTakenTotal] = useState(6);//Số lượng đã lấy
    const [total, setTotal] = useState(16);
    const [footerLoad, setFooterLoad] = useState(true);
    const [replyFor, setReplyFor] = useState(null);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            while (takenTotal > data.length) {
                data.push(...feedbacks);
            }
            setData(feedbacks);
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

    const callbackReplyFor = (rp) => {
        setReplyFor(rp);
    }

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

    //Gửi bình luận
    const sendComment = useCallback(() => {
      let tmp = {
        ID: Math.random(),
        Content: inputValue,
        Time: moment().format("YYYY-MM-DDThh:mm:ssZ"),
        User: user,
        ParentID: replyFor?.ID || null,
        ChildrenCount: 0,
        Children: []
      }
      console.log(tmp)
      if (data) {
        let _data = data;
        let id = Math.max(..._data.data.map(o => o.ID));
        tmp.ID = id + 1;
        if (!replyFor?.ID) {
          _data.data.unshift(tmp);
        }
        else {
          let parentIndex = _data.data.findIndex(x => x.ID == replyFor.ID);
          if (parentIndex != -1) {
            _data.data[parentIndex].Children.unshift(tmp);
            _data.data[parentIndex].ChildrenCount = _data.data[parentIndex].Children.length;
          }
        }
        _data.count = _data.data.length;
        setData(_data);
        setReplyFor(null);
      }
      else setData({
        data: [tmp],
        count: 1
      })
      setInputValue('');
    })

    return (
        <View style={{ flex: 1, backgroundColor: Colors.TD_Background }}>
            <TD_Header checkrightComponent {...props} title="Phản hồi về sản phẩm" />
            {loading ? (
                <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} />
            ) : (
                <>
                    <View style={{ flex: 1 }}>
                        <FlatList
                            contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 10 }}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            data={data ? data : []}
                            renderItem={({ item, index }) => {
                                return <RenderRootComment cmt={item} key={index} _key={index} callbackParent={callbackReplyFor} />;
                            }}
                            //onScroll={(a, b) => { _handleOnScroll(a, b) }}
                            keyExtractor={(item, index) => index.toString()}
                            ListEmptyComponent={() => (
                                <Text style={{ textAlign: 'center', color: '#50565B', marginTop: 10 }}>Chưa có phản hồi nào</Text>
                            )}
                            onEndReached={() => {
                                getLoadMore()
                            }}
                            onEndReachedThreshold={0.5}
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                            ListFooterComponent={
                                <>
                                    <Text style={{ textAlign: 'center', paddingTop: 20, paddingBottom: 50 }}>Hiển thị <Text style={{ fontWeight: 'bold' }}>{takenTotal}</Text> / {total} phản hồi</Text>
                                    {footerLoad ? <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} /> : <></>}
                                </>
                            }
                        />
                    </View>
                    {replyFor ?
                        <View style={styles.footer} >
                            {replyFor == null ? <></> :
                                <Flex>
                                    <Flex.Item flex={2}>
                                    </Flex.Item>
                                    <Flex.Item flex={13}>
                                        <Text style={{ fontSize: 12, marginLeft: 15, marginBottom: 1 }}>
                                            Đang trả lời <Text style={{ fontWeight: 'bold' }}>{replyFor.User.DisplayName}</Text>&ensp;-&ensp;<Text style={{ fontWeight: 'bold', color: Colors.gray }} onPress={() => { setReplyFor(null); setInputValue('') }}>Hủy</Text>
                                        </Text>
                                    </Flex.Item>
                                    <Flex.Item flex={2}>
                                    </Flex.Item>
                                </Flex>
                            }
                            <Flex>
                                <Flex.Item flex={2}>
                                    <Avatar size='small' rounded source={user?.Avatar ? user?.Avatar : Images.images.slides_1} />
                                </Flex.Item>
                                <Flex.Item flex={13}>
                                    {user != null ?
                                        <TDCommentInput value={inputValue} onChangeText={setInputValue} placeholder={'Viết bình luận'} emoji onSubmitEditing={sendComment} />
                                        : <Text style={{ color: Colors.grey }} onPress={() => { ModalHide(); navigation.navigate('LoginScreen') }}><Text style={{ color: Colors.blueHope, fontWeight: 'bold' }}>Đăng nhập ngay</Text> để bình luận.</Text>
                                    }
                                </Flex.Item>
                                <Flex.Item flex={2} style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <Icon name='send' color={inputValue ? Colors.blueHope : ''} onPress={inputValue ? sendComment : () => { }} />
                                </Flex.Item>
                            </Flex>
                        </View> : <></>}
                </>
            )}
        </View >
    );
};

//Hiển thị 1 comment gốc + child, có thao tác ẩn hiện child
const RenderRootComment = (props) => {
    const { cmt, parentId, _key, callbackParent } = props;
    const [showedChildren, setShowedChildren] = useState(false);
    const [numberChildShow, setNumberChildShow] = useState(0);
    return (
        <View>
            <ItemComment cmt={cmt} parentId={parentId} _key={_key} callbackParent={callbackParent}></ItemComment>
            {/* Nếu có child thì hiển thị */}
            {cmt.ChildrenCount > 0 ?
                !showedChildren ?
                    // Nếu chưa bấm hiện thêm: hiển thị 1 con + nút hiện thêm
                    <View style={styles.cmt.childrenHaveSeeMore}>
                        <TouchableOpacity onPress={() => { setShowedChildren(true); setNumberChildShow(numberChildCommentShowOneTime) }}>
                            <Text style={{ marginLeft: 5, borderLeftColor: Colors.grey, borderLeftWidth: 0.5 }}>
                                &ensp;<Text style={styles.cmt.user}>{cmt.Children[0].User.DisplayName}</Text>&ensp;<Text style={styles.cmt.text}>{cmt.Children[0].Content}</Text>
                            </Text>
                            {/* nếu số lượng > 1 thì mới có nút xem thêm 123 phản hồi khác*/}
                            {cmt.ChildrenCount > 1 ?
                                <Text style={styles.cmt.replyBtn}>Xem {cmt.ChildrenCount - 1} phản hồi khác ...</Text>
                                : <></>
                            }
                        </TouchableOpacity>
                    </View>
                    //nếu đã bấm hiện thêm: hiển thị nút hiện thêm ... trả lời + danh sách các children đã hiển thị
                    : <View style={styles.cmt.childrenView}>
                        {cmt.ChildrenCount > cmt.Children.length ?
                            <Text style={styles.cmt.replyBtn} onPress={() => { setNumberChildShow(numberChildShow + numberChildCommentShowOneTime) }}>Xem thêm các câu trả lời trước...</Text>
                            : <></>
                        }
                        {cmt.Children.map((item, index) => {
                            return (<ItemComment cmt={item} parentId={cmt.ID} key={index} _key={index} callbackParent={callbackParent}></ItemComment>);
                        })}
                    </View>
                //
                : <></>
            }
        </View >)
}
//Render Detail comment
const ItemComment = (props) => {
    const { cmt, parentId, _key, callbackParent } = props;
    return <Flex style={styles.cmt.root}>
        <Flex.Item flex={2}>
            <View style={styles.cmt.viewAvatar}>
                <Avatar style={styles.cmt.avatar} rounded source={cmt.User?.Avatar ? { uri: cmt.User.Avatar } : Images.images.slides_1} />
            </View>
        </Flex.Item>
        <Flex.Item flex={13}>
            <Text>
                <Text style={styles.cmt.user}>{cmt.User.DisplayName}</Text>&ensp;
                <Text style={styles.cmt.text}>{cmt.Content}</Text></Text>
            <Text>
                <TouchableOpacity><Text style={styles.cmt.time}>{moment(cmt.Time).format("HH:mm DD/MM")}</Text></TouchableOpacity>&emsp;
                <TouchableOpacity onPress={() => {
                    callbackParent({ ID: parentId ? parentId : cmt.ID, User: cmt.User, Content: cmt.Content });
                }}>
                    <Text style={styles.cmt.replyBtn}> Trả lời</Text>
                </TouchableOpacity>
            </Text>
        </Flex.Item>
    </Flex >
}

export default ProductFeedbacks;
const styles = StyleSheet.create({
    headContent: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    leftIcon: { width: 48, marginVertical: 4, alignItems: 'center', justifyContent: 'center' },
    textCenter: { flex: 1, textAlign: 'center', textAlignVertical: 'center', fontWeight: '500', color: '#22313F', fontWeight: 'bold' },
    footer: { paddingHorizontal: 10, paddingVertical: 3, marginBottom: 10, borderTopWidth: 0.5, borderTopColor: Colors.grey },
    bodyContent: { marginHorizontal: 10, marginVertical: 7 },
    cmt: {
        root: { marginVertical: 5 },
        user: { fontWeight: 'bold', color: Colors.darkText },
        text: { color: Colors.darkText, fontSize: 13 },
        viewAvatar: { justifyContent: 'flex-start', alignItems: 'center', flex: 1, padding: 5 },
        avatar: { width: imageWidth, height: imageWidth, },
        time: { fontSize: 11, color: Colors.grey },
        replyBtn: { fontSize: 11, color: Colors.lightGray, fontWeight: 'bold' },
        childrenHaveSeeMore: { marginLeft: 13, marginBottom: 5 },
        childrenView: { marginLeft: 17, borderLeftColor: Colors.grey, borderLeftWidth: 0.5 }
    }
});
