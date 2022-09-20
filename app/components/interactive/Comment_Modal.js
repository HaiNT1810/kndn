/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState, useMemo, useCallback, memo } from 'react';
import { Button, SafeAreaView, StyleSheet, View, Text, Animated, ScrollView, Keyboard, ActivityIndicator, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { Images, Colors, Helpers } from '@themes';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import { Flex, Icon } from '@ant-design/react-native';
import { Avatar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { TDCommentInput, TDTextInputNew } from '@app/components/tdcommon';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { getCombinedStyles } from 'react-native-paper';

const { width, height: initialHeight } = Dimensions.get('window');
const numberChildCommentShowOneTime = 10;//số lượng cmt con mỗi lần thêm
const Comment_Modal = (props) => {
  const {
    open,
    modalHeight,
    snapPoint,
    disable,
    title
  } = props;
  const navigation = useNavigation();
  const modalizeRef = useRef(null);
  const contentRef = useRef < Animated.AnimatedComponent < ScrollView >> null;
  const [inputValue, setInputValue] = useState('');
  const user = useSelector((state) => state.global.user);
  const [data, setData] = useState();
  const [replyFor, setReplyFor] = useState(null);
  const [footerLoad, setFooterLoad] = useState(false);

  useEffect(() => {
    modalizeRef.current?.open();

  }, [open]);
  useMemo(() => {
    const fetchData = () => {

    }
    fetchData();
    return () => { };
  }, []);

  const ModalHide = () => {
    modalizeRef.current?.close();
  };
  const callbackReplyFor = (rp) => {
    setReplyFor(rp);
  }
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
  //
  const keyExt = useCallback((item) => item.value);
  return (
    <Portal>
      <Modalize
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
        ref={modalizeRef}
        contentRef={contentRef}
        HeaderComponent={() => (
          <View style={styles.headContent}>
            <Flex>
              <Flex.Item>
              </Flex.Item>
              <Flex.Item flex={6}>
                <Text style={styles.textCenter}>{title ? title : 'Bình luận (' + (data?.count || 0) + ')'}</Text>
              </Flex.Item>
              <Flex.Item>
                <TouchableOpacity
                  style={styles.leftIcon}
                  onPress={() => {
                    ModalHide();
                  }}>
                  <FontAwesome name={'times'} size={20} color={Colors.gray} />
                </TouchableOpacity>
              </Flex.Item>
            </Flex>
          </View>
        )}
        FooterComponent={() => (
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
          </View>
        )}
        modalHeight={modalHeight ? modalHeight : 400}
        snapPoint={snapPoint || 400}
      >
        {/* Render content comment */}
        <SafeAreaView style={{ flex: 1 }}>
          <FlatList
            data={data?.data ? data?.data : []}
            style={{ flex: 1, paddingHorizontal: 10 }}
            renderItem={({ item, index }) => {
              return <RenderRootComment cmt={item} key={index} _key={index} callbackParent={callbackReplyFor} />;
            }}
            keyExtractor={keyExt}
            ListEmptyComponent={() => (
              <Text style={{ color: Colors.grey, textAlign: 'center', marginTop: 10 }}>Hãy là người đầu tiên để lại bình luận!</Text>
            )}
            onEndReached={() => {
              if (data?.data.length < data?.count)
                setFooterLoad(true);
            }}
            onEndReachedThreshold={0.8}
            ListFooterComponent={data?.data.length < data?.count && footerLoad ? <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} /> : <></>}
          />
        </SafeAreaView>
      </Modalize>
    </Portal >
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
  return <Flex>
    <Flex.Item>
      <View style={styles.cmt.viewAvatar}>
        <Avatar style={styles.cmt.avatar} rounded source={cmt.User?.Avatar ? cmt.User?.Avatar : Images.images.slides_1} />
      </View>
    </Flex.Item>
    <Flex.Item flex={10}>
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

export default Comment_Modal;

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
    user: { fontWeight: 'bold', color: Colors.darkText },
    text: { color: Colors.darkText, fontSize: 13 },
    viewAvatar: { justifyContent: 'flex-start', alignItems: 'center', flex: 1 },
    avatar: { width: 22, height: 22, },
    time: { fontSize: 11, color: Colors.grey },
    replyBtn: { fontSize: 11, color: Colors.lightGray, fontWeight: 'bold' },
    childrenHaveSeeMore: { marginLeft: 13, marginBottom: 5 },
    childrenView: { marginLeft: 17, borderLeftColor: Colors.grey, borderLeftWidth: 0.5 }
  }
});
