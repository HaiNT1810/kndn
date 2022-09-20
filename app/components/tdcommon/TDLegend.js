import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { color } from 'react-native-reanimated';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '@themes';

const TDLegend = (props) => {
    const { title, icon, color } = props;
    return (
        <View style={[styles.fieldSet, icon ? { alignItems: 'flex-start' } : {}]}>
            <View style={styles.legend}>
                {icon ? <FontAwesome name={icon || 'circle'} solid color={color || Colors.blueHope} style={{ marginEnd: 5 }} size={16} /> : <></>}
                <Text style={{ color: color || "#36a3f7", fontSize: 16, fontWeight: 'bold' }}>{title}</Text>
            </View>
        </View>

    );
};

export default TDLegend;
const styles = StyleSheet.create({
    fieldSet: {
        marginVertical: 20,
        borderTopWidth: 1,
        borderColor: '#5867dd33',
        alignItems: 'center'
    },
    legend: {
        position: 'absolute',
        top: -12,
        paddingHorizontal: 3,
        fontWeight: 'bold',
        backgroundColor: '#FFFFFF',
        flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginBottom: 10
    },
});
