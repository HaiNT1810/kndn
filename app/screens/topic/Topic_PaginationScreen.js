import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '@themes'
import { Flex } from '@ant-design/react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';
import { useEffect } from 'react';

const Topic_PaginationScreen = (props) => {
  const { total, parentCallback } = props
  const [current, setCurrent] = useState(total > 0 ? 1 : 0)
  const [pagination, setPagination] = useState({
    NextNotAvaible: current < total && total > 0 ? false : true,
    PreviousNotAvaible: current > 1 && total > 0 ? false : true,
    LastNotAvaible: current < total && total > 0 ? false : true,
    FirstNotAvaible: current > 1 && total > 0 ? false : true,
  })

  const onPagination = action => {
    switch (action) {
      case 'previous':
        setCurrent(current - 1)
        break;
      case 'next':
        setCurrent(current + 1)
        break;
      case 'first':
        setCurrent(1)
        break;
      case 'last':
        setCurrent(total)
        break;
    }
  }

  useEffect(() => {
    parentCallback(current)
    setPagination({
      NextNotAvaible: current < total && total > 0 ? false : true,
      PreviousNotAvaible: current > 1 && total > 0 ? false : true,
      LastNotAvaible: current < total && total > 0 ? false : true,
      FirstNotAvaible: current > 1 && total > 0 ? false : true,
    })
  }, [current])

  return (
    <View style={styles.container}>
      <Flex justify="between" styles={{ width: '100%' }}>
        <TouchableOpacity
          onPress={() => onPagination('first')}
          disabled={pagination.FirstNotAvaible}
        >
          <Icon name="step-backward" style={styles.actionItem}
            size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onPagination('previous')}
          disabled={pagination.PreviousNotAvaible}
        >
          <Icon name="chevron-left" style={styles.actionItem}
            size={20} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log(123)}>
          <Text >{current} / {total}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onPagination('next')}
          disabled={pagination.NextNotAvaible}
        >
          <Icon name="chevron-right" style={styles.actionItem}
            size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onPagination('last')}
          disabled={pagination.LastNotAvaible}
        >
          <Icon name="step-forward" style={styles.actionItem}
            size={20} />
        </TouchableOpacity>
      </Flex>
    </View>

  )
}

export default Topic_PaginationScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.GLOBAL_Header,
    width: '100%',
    paddingHorizontal: 18,
    paddingBottom: 6
  },
  actionItem: {
    color: Colors.white,
    width: 20
  }
})