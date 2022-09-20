import React, { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Colors } from '@themes';
import { useSelector } from 'react-redux';
import { Flex, Tag } from '@ant-design/react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import moment from 'moment';

const Posts_TimeLikeView = (props) => {
    const { time, like = 0, comment = 0, view = 0,
        liked = false,
        showTags = true, tags = [],
        type, id } = props;
    const user = useSelector((state) => state.global.user);
    const [isLiked, setLike] = useState(false);
    return (<View>
        {time ?
            <Text style={styles.item}>
                <FontAwesome name="calendar-plus" size={15} color={Colors.lightGray} /> {time ? moment(time).format("DD/MM/yyyy") : ""}
            </Text>
            : <></>
        }
        <Flex style={{}}>
            <Flex.Item>
                {!user ?
                    <TouchableOpacity onPress={() => { setLike(!isLiked) }}>
                        <Text style={styles.item}>
                            {isLiked ? <FontAwesome name="heart" solid size={15} color={Colors.heart} />
                                : <FontAwesome name="heart" size={15} color={Colors.lightGray} />
                            } {like || 0}
                        </Text>
                    </TouchableOpacity>
                    : <Text style={styles.item}>
                        <FontAwesome name="heart" size={15} color={Colors.lightGray} /> {like || 0}
                    </Text>}
            </Flex.Item>
            <Flex.Item style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={styles.item}>
                    <FontAwesome name="comments" size={15} color={Colors.lightGray} /> {comment || 0}
                </Text>
            </Flex.Item>
            <Flex.Item style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Text style={styles.item}>
                    <FontAwesome name="eye" size={15} color={Colors.lightGray} /> {view || 0}
                </Text>
            </Flex.Item>
        </Flex>
        {showTags ?
            tags != null && tags.length > 0 ?
                <Text>{tags?.map((tag, index) => { return (<Tag style={{ paddingRight: 3 }} key={index} small>{tag}</Tag>) })}</Text>
                : <></>
            : <></>}

    </View>)
}
export default Posts_TimeLikeView;
const styles = StyleSheet.create({
    item: { textAlign: 'left', fontSize: 13, color: Colors.lightGray, marginTop: 3 }
});