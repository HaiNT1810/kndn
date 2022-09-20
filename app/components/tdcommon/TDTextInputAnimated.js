import React, {useEffect, useRef, useState} from 'react';
import {Text, TextInput, StyleSheet, View, Animated, Easing, TouchableWithoutFeedback} from 'react-native';

const TextField = (props) => {
  const {multiline, title, errorText, value, style, onBlur, onFocus, ...restOfProps} = props;
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef(null);
  const focusAnim = useRef(new Animated.Value(0)).current;
  const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused || !!value ? 1 : 0,
      duration: 150,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  }, [focusAnim, isFocused, value]);

  let color = isFocused ? '#2F6BFFCC' : '#757575';
  let borderColor = isFocused ? '#2F6BFFCC' : '#abb4bd65';

  if (errorText) {
    color = '#B00020';
    borderColor = '#B00020';
  }

  return (
    <View style={{}}>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: borderColor,
          },
        ]}
        ref={inputRef}
        {...restOfProps}
        value={value}
        onBlur={(event) => {
          setIsFocused(false);
          onBlur?.(event);
        }}
        onFocus={(event) => {
          setIsFocused(true);
          onFocus?.(event);
        }}
        multiline={multiline || false}
        underlineColorAndroid={'transparent'}
        placeholderTextColor={'#BCBCBE'}
      />
      <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
        <Animated.View
          style={[
            styles.labelContainer,
            {
              transform: [
                {
                  scale: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.85],
                  }),
                },
                {
                  translateY: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, -2],
                  }),
                },
                {
                  translateX: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [16, 16],
                  }),
                },
              ],
            },
          ]}>
          <Text
            style={[
              styles.label,
              {
                color,
              },
            ]}>
            {title}
            {errorText ? '*' : ''}
          </Text>
        </Animated.View>
      </TouchableWithoutFeedback>
      {!!errorText && <Text style={styles.error}>{errorText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    /*  padding: 24,
    borderWidth: 0.5,
    borderRadius: 4, */

    padding: 14,
    paddingTop: 14,
    backgroundColor: '#FFF',
    borderRadius: 4,
    margin: 10,
    borderColor: '#abb4bd65',
    borderWidth: 0.5,
  },
  labelContainer: {
    position: 'absolute',
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  label: {},
  error: {
    marginTop: 4,
    marginLeft: 12,
    fontSize: 12,
    color: '#B00020',
    fontFamily: 'Avenir-Medium',
  },
});

export default TextField;
