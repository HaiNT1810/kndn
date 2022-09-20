/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, View, Text, KeyboardAvoidingView, ScrollView, Keyboard, TouchableOpacity } from 'react-native';
import { Images, Colors, Helpers } from '@themes';
import { shallowEqual, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Comment_Modal from './Comment_Modal'
import { Flex } from '@ant-design/react-native';
import { Avatar } from 'react-native-elements';

const Comment_StartView = (props) => {
  var navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const { type, dataId } = props;
  const [openModal, setOpenModal] = useState(0);
  const user = useSelector((state) => state.global.user);

  useEffect(() => {
    const fetchData = async () => {
      setData({
        data: [{
          Content: "Bài viết rất hay Bài viết rất hay Bài viết rất hay Bài viết rất hay Bài viết rất hay Bài viết rất hay Bài viết rất hay Bài viết rất hay",
          User: {
            DisplayName: "Demo ok",
            Account: "demo",
            Avatar: ""
          },
          children: [
            {
              Content: "Có gì đâu mà hay nhỉ Có gì đâu mà hay nhỉ Có gì đâu mà hay nhỉ",
              User: {
                DisplayName: "Demo2",
                Account: "demo2",
                Avatar: ""
              },
            }
          ]
        }],
        count: 234
      })
    }
    fetchData();
    return () => { };
  }, []);

  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={() => { setOpenModal(openModal + 1) }}>
        <View>
          <Text style={{ color: Colors.grey, fontSize: 13 }}>Xem toàn bộ {data?.count} bình luận</Text>
          {data != null && data.data != null && data.data.length > 0 ?
            <View style={{ marginLeft: 10, marginRight: 30 }}>
              <Text numberOfLines={1} ellipsizeMode={'tail'}>
                <Text style={styles.text}>{data.data[0].User.DisplayName}</Text>: <Text style={styles.text}>{data.data[0].Content}</Text>
              </Text>
              {data.data[0].children != null && data.data[0].children.length > 0 ?
                <Text style={{ marginLeft: 5, borderLeftColor: Colors.grey, borderLeftWidth: 2 }} numberOfLines={1} ellipsizeMode={'tail'}>
                  &ensp;<Text style={styles.text}>{data.data[0].children[0].User.DisplayName}</Text>: <Text style={styles.text}>{data.data[0].children[0].Content}</Text>
                </Text>
                : <></>
              }
            </View>
            : <></>
          }
          <View style={{ marginVertical: 10 }}>
            <Flex>
              <Flex.Item>
                <Avatar size='small' rounded source={user?.Avatar ? user?.Avatar : Images.images.slides_1} />
              </Flex.Item>
              <Flex.Item flex={7}>
                <Text style={{ color: Colors.grey, fontSize: 13 }}>Thêm bình luận</Text>
              </Flex.Item>
              <Flex.Item>
              </Flex.Item>
            </Flex>
            <Comment_Modal open={openModal}></Comment_Modal>
          </View>
        </View>
      </TouchableOpacity>
    </View>
    //  
  );
};

export default Comment_StartView;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-start', margin: 10 },
  text: { color: Colors.darkText, fontSize: 13 }
});
