/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {Animated, StyleSheet, View, Text} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import {RectButton} from 'react-native-gesture-handler';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const SwipeableGmail = (props) => {
  const _swipeableRow = useRef();

  const RenderLeftActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 80],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return (
      <View style={styles.leftAction}>
        <AnimatedIcon
          name={props?.iconLeft ?? 'home'}
          size={30}
          color="#e64a19"
          style={[styles.actionIcon, {transform: [{scale}]}]}
        />
      </View>
    );
  };

  const renderRightAction = (iconName, color, x, progress, onPress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });
    const pressHandler = () => {
      close();
      onPress();
    };

    return (
      <Animated.View style={{flex: 1, transform: [{translateX: trans}]}}>
        <RectButton style={[styles.rightActionApple, {backgroundColor: color}]} onPress={pressHandler}>
          <Icon style={styles.actionText} name={iconName} />
        </RectButton>
      </Animated.View>
    );
  };

  const RenderRightActionApples = (progress, _dragAnimatedValue) => (
    <View
      style={{
        width: 192,
        flexDirection: 'row',
      }}>
      {props.itemsRight.map((i) => renderRightAction(i.iconName, i.color, i.x, progress, i.onPress))}
    </View>
  );

  const RenderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <View style={styles.rightAction}>
        <AnimatedIcon
          name={props?.iconRight ?? 'home'}
          size={30}
          color="#e64a19"
          style={[styles.actionIcon, {transform: [{scale}]}]}
        />
      </View>
    );
  };

  const onLeft = () => {
    _swipeableRow.current.close();
    props.swipLeft(props.data);
  };

  const onRight = () => {
    _swipeableRow.current.close();
    props.swipRight(props.data);
  };

  const close = () => {
    _swipeableRow.current.close();
  };

  return (
    <Swipeable
      ref={_swipeableRow}
      friction={2}
      leftThreshold={80}
      rightThreshold={40}
      onSwipeableLeftOpen={() => onLeft()}
      renderLeftActions={props.iconLeft ? RenderLeftActions : null}
      onSwipeableRightOpen={props.iconRight ? onRight : null}
      enableTrackpadTwoFingerGesture
      renderRightActions={props.iconRight ? RenderRightActions : props.itemsRight ? RenderRightActionApples : null}>
      {props.children}
    </Swipeable>
  );
};

export default SwipeableGmail;

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  actionIcon: {
    width: 30,
    marginHorizontal: 20,
  },
  rightAction: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'flex-end',
  },
  rightActionApple: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  actionText: {
    color: 'white',
    fontSize: 25,
    backgroundColor: 'transparent',
    padding: 10,
  },
});
