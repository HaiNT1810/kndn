/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StatusBar, View, Image, StyleSheet, ImageBackground, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import LinearGradient from 'react-native-linear-gradient';

import * as actions from '@redux/global/Actions';

import {Images} from '@themes';

const Screen = (props) => {
  const dispatch = useDispatch();

  const _renderItem = ({item, dimensions}) => (
    <View style={{flex: 1, alignItems: 'center', padding: 20, marginTop: 80}}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  const _renderNextButton = () => {
    return (
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#00CEE0', '#00A0C4']}
        style={{flexDirection: 'row', alignItems: 'center', padding: 8, borderRadius: 50}}>
        <Text style={{marginEnd: 10, fontWeight: 'bold', color: '#FFF'}}>Tiếp tục</Text>
        <Icon name="chevron-right" color="#FFF" size={16} />
      </LinearGradient>
    );
  };
  const _renderBackButton = () => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center', padding: 8, borderRadius: 50}}>
        <Icon name="chevron-left" color="#00A0C4" size={16} />
      </View>
    );
  };
  const _renderDoneButton = () => {
    return (
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#00CEE0', '#00A0C4']}
        style={{flexDirection: 'row', alignItems: 'center', padding: 8, borderRadius: 50}}>
        <Text style={{marginEnd: 10, fontWeight: 'bold', color: '#FFF'}}>Bắt đầu khám phá</Text>
      </LinearGradient>
    );
  };

  const navigateToApp = async () => {
    dispatch(actions.setLoadIntro(true));
  };

  const slides = [
    {
      key: 0,
      title: 'Góp sức cùng chính quyền phát triển xã hội',
      text: ' cung cấp cho bạn kênh liên lạc chính thống giữa người dân với chính quyền',
      image: Images.images.slides_1,
    },
    {
      key: 1,
      title: 'Cập nhật thông tin nhanh chóng, đa dạng, chính thống',
      text: 'Thông báo từ chính quyền, tin tức luôn được cập nhật nhanh chóng, chính xác',
      image: Images.images.slides_2,
    },
    {
      key: 2,
      title: 'trong lòng bàn tay',
      text: 'Dễ dàng nắm bắt được mọi thông tin về thành phố như: giao thông, y tế, địa điểm du lịch, các sự kiện đang diễn ra...',
      image: Images.images.slides_3,
    },
    {
      key: 3,
      title: 'Cùng nhau xây dựng, phát triển cộng đồng',
      text: 'mang đến cho bạn các chương trình học miễn phí, các chức năng bổ trợ người yếu thế',
      image: Images.images.slides_4,
    },
  ];

  return (
    <View style={styles.mainContent}>
      <StatusBar backgroundColor="transparent" barStyle="light-content" translucent={true} />
      <AppIntroSlider
        data={slides}
        renderItem={_renderItem}
        showPrevButton
        buttonTextStyle={{color: '#2196F3', fontSize: 14}}
        onDone={() => navigateToApp()}
        onSkip={() => navigateToApp()}
        renderDoneButton={_renderDoneButton}
        renderNextButton={_renderNextButton}
        renderPrevButton={_renderBackButton}
        dotStyle={{color: 'transparent'}}
        activeDotStyle={{color: 'transparent'}}
        dotClickEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContent: {flex: 1},
  image: {
    width: 300,
    height: 250,
  },
  text: {
    color: '#49535B',
    lineHeight: 20,
    marginTop: 20,
  },
  title: {
    marginTop: 30,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#49535B',
  },
});
export default Screen;
