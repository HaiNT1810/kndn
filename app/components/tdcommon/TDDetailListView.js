import { Colors } from '@themes';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Flex } from '@ant-design/react-native';

const TDDetailListView = (props) => {
  const {
    hasHeader,//Có mở đầu, không cần title ở các ô dưới; nếu ko có thì các ô dưới có chú giải
    titles,//Tiêu đề (số nhiều): [{ field: "f1", text: "Tên khách hàng" },...]
    // content,//Nội dung
    // isCurrency,//Có phải là tiền tệ, để format lại
  } = props;

  return content ? (
    <View style={{ marginTop: 5, marginBottom: 5 }}>
      {hasHeader ?
        <Flex>
          <Flex.Item flex={1}><Text>#</Text></Flex.Item>
          <Flex.Item flex={10}>
            {/* {titles.map((title, index) => { return (<Text style={styles.titles[index]}>{title.text}</Text>) })} */}
          </Flex.Item>
        </Flex>
        : <></>
      }
    </View>
  ) : (
    <></>
  );
};

export default TDDetailListView;

const styles = StyleSheet.create({
  titles: [
    { color: Colors.darkText },
    { color: Colors.darkGray },
    { color: Colors.gray },
    { color: Colors.grey },
    { color: Colors.green },
    { color: Colors.blue }
  ]
});
