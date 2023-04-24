/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useRoute, useNavigation} from '@react-navigation/native';
import {Colors} from '@app/themes';
import {TD_Header} from '@app/components';
import {requestGET} from '@app/services/Api';
import {BASE_URL} from '@app/data';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const MapScreen = (props) => {
  const navigation = useNavigation();
  const dataService = useSelector((state) => state.global.dataService);
  const user = useSelector((state) => state.global.user);
  const accessToken = useSelector((state) => state.global.accessToken);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await requestGET(`${BASE_URL}/SeaPorts?skip=0&top=20`);
      if (res && res.result) {
        setData(res.result);
      }
      setLoading(false);
    };
    fetchData();
    return () => {};
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: Colors.TD_Background}}>
      <TD_Header checkrightComponent {...props} title="Bản đồ" />
      {loading ? (
        <ActivityIndicator size="large" color="#fb8c00" style={{flex: 1, justifyContent: 'center'}} />
      ) : (
        <View style={{flex: 1}}>
          {true ? (<></>
            // <MapView
            //   provider={PROVIDER_GOOGLE}
            //   mapType="satellite"
            //   style={{flex: 1}}
            //   region={{
            //     latitude: 21.037719949319637,
            //     longitude:105.83481780276229,
            //     latitudeDelta: 10,
            //     longitudeDelta: 10,
            //   }}
            //   showsUserLocation={true}>
            //   {/* {data.map((i) => (
            //     <MapView.Marker
            //       key={i.ID}
            //       coordinate={{latitude: parseFloat(i.Latitude), longitude: parseFloat(i.Longitude)}}
            //       draggable>
            //       <MapView.Callout
            //         tooltip={true}
            //         // onPress={() => {
            //         //   navigation.navigate('ChiTietCang_MainScreen', {id: i.ID});
            //         // }}
            //       >
            //         <View style={{backgroundColor: '#fff', padding: 10, borderRadius: 10}}>
            //           <Text style={{textAlign: 'center', marginBottom: 10, fontWeight: '600'}}>{i.Name}</Text>
            //           <Text>
            //             <Text style={{fontWeight: 'bold'}}>Địa chỉ: </Text>
            //             {i.Address}
            //           </Text>
            //           <Text>
            //             <Text style={{fontWeight: 'bold'}}>SĐT: </Text>
            //             {i.PhoneNumber}
            //           </Text>
            //           <Text>
            //             <Text style={{fontWeight: 'bold'}}>Fax: </Text>
            //             {i.Fax}
            //           </Text>
            //           <Text>
            //             <Text style={{fontWeight: 'bold'}}>Email: </Text>
            //             {i.Email}
            //           </Text>
            //         </View>
            //       </MapView.Callout>
            //     </MapView.Marker>
            //   ))} */}
            // </MapView>
          ) : (
            <></>
          )}
        </View>
      )}
    </View>
  );
};

export default MapScreen;
const styles = StyleSheet.create({});
