import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Dimensions,
  Alert,
  TextInput
} from 'react-native';
import { Avatar, Button, Divider } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import { useNavigation } from '@react-navigation/native';
import { Images, Colors } from '@app/themes';
import { TD_Header } from '@app/components';
import { Card, WhiteSpace, WingBlank, Flex, InputItem } from '@ant-design/react-native'
import * as actions from '@redux/global/Actions';
import ActionButton from '@app/modules/react-native-action-button/ActionButton';
import { TDDetailText, TDDetailLegend, TDDetailListView } from '@app/components/tdcommon';
import { Formik } from 'formik';
import DropDownPicker from 'react-native-dropdown-picker';

DropDownPicker.addTranslation("VN", {
  PLACEHOLDER: "Chọn",
  SEARCH_PLACEHOLDER: "Nhập để tìm",
  SELECTED_ITEMS_COUNT_TEXT: "{count} lựa chọn", // See below for advanced options
  NOTHING_TO_SHOW: "Không có lựa chọn nào!"
});
DropDownPicker.setLanguage("VN")


const UserProfileScreen = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const dataService = useSelector((state) => state.global.dataService);
  const user = useSelector((state) => state.global.user);
  const accessToken = useSelector((state) => state.global.accessToken);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const iconColor = Colors.blue;
  const { permissions } = user?.permissions || {};
  const [showAll, setShowAll] = useState(false);//Hiển thị tất cả hoặc ẩn tất cả các legend

  useEffect(() => {
    if (!accessToken) {
      navigation.navigate("HomeScreen")
    }
    const fetchData = async () => {
      setLoading(false);
    };
    fetchData();
    return () => { };
  }, []);

  const headerTitle = () => {
    let result = "Thông tin ";
    if (permissions?.includes("DoanhNghiep")) {
      result += "doanh nghiệp"
    }
    return result;
  }

  const RenderItem = (props) => {
    const { title, content, header, select } = props;
    const [change, setChange] = useState(content)
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(select ? content : []);
    const [items, setItems] = useState([
      { id: 1, label: '5S' },
      { id: 2, label: 'ISO' },
    ]);

    return (
      <View style={{ width: '100%', marginTop: 10 }}>
        <View style={styles.flexInline}>
          <Text style={!header ? { color: Colors.darkGray } :
            { fontSize: 18, fontWeight: '600', color: '#263238' }}>{title}</Text>
        </View>
        {content ?
          !select &&
          <TextInput
            style={{
              fontWeight: '400',
              color: '#263238',
              paddingBottom: 2,
              paddingStart: 10,
            }}
            onChangeText={value => setChange(value)}
            value={change}
          /> ||
          <DropDownPicker
            multiple
            style={{ borderWidth: 0 }}
            dropDownContainerStyle={{
              borderWidth: 0
            }}
            schema={{
              value: 'id'
            }}
            open={open}
            value={value}
            items={items}
            setValue={setValue}
            setItems={setItems}
            setOpen={setOpen}
          />
          : <></>}
      </View>);
  };

  const RenderUserProfile = () => <>
    <View style={styles.container}>
      <View style={[styles.flexInline, { paddingLeft: 10 }]}>
        <FontAwesome name={'address-book'} solid color={iconColor} style={{ paddingStart: 0, width: 24 }} size={18} />
        <Text style={styles.headText}>Thông tin cá nhân</Text>
        <TouchableOpacity onPress={() => { navigation.navigate("UserProfile_EditScreen") }} style={[styles.icon, styles._iconRounded]}><FontAwesome name='pencil' size={16} /></TouchableOpacity>
      </View>
      <View>
        <Flex>
          <Flex.Item>
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity onPress={() => { }}>
                <Avatar size="large" rounded source={Images.logos._logo} />
              </TouchableOpacity>
            </View>
          </Flex.Item>
          <Flex.Item flex={2}>
            <View>
              <Text>Admin</Text>
              <Text>abc@gmail.com</Text>
              <Text>0132654987</Text>
            </View>
          </Flex.Item>
        </Flex>
      </View>
    </View>
  </>

  const RenderEnterpriseProfile = () => <>
    <Formik style={styles.container}
      initialValues={{
        MaSoThue: '0313881469',
        NamThanhLap: '2016',
        SoLuongLaoDong: '130',
        LoaiHinhDoanhNghiep: 'Doanh nghiệp ngoài Nhà nước',
        TenVietTat: 'Tan Dan JSC',
        VonDauTu: '1,000,000',
        CongCuQuanLy: [1, 2],
        VonTuNhan: 'Việt Nam: 100%',
        TenThuongHieu: 'Tân Dân',
        NgonNgu: "Tiếng Anh | Tiếng Việt | Tiếng Hàn"
      }}>
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
          <WhiteSpace size="lg" />
          <Card >
            <Card.Header
              title={<View style={{ paddingHorizontal: 15, color: '#263238' }}>
                <RenderItem
                  header="1213"
                  title="Công ty cổ phần tin học Tân Dân"
                  content={values.MaSoThue}
                />
              </View>}
              thumbStyle={{ width: 40, height: 40 }}
              thumb={<Avatar size="medium" rounded source={Images.logos._logo} />}
            />
            <Card.Body>
              <View style={{ paddingHorizontal: 15 }}>

                <TDDetailLegend show={false} title="Tổng quan">
                  <RenderItem
                    title="Năm thành lập"
                    content={values.NamThanhLap}
                  />
                  <RenderItem
                    title="Số lượng lao động"
                    content={values.SoLuongLaoDong}
                  />
                  <RenderItem
                    title="Loại hình doanh nghiệp"
                    content={values.LoaiHinhDoanhNghiep}
                  />
                  <RenderItem
                    title="Tên viết tắt"
                    content={values.TenVietTat}
                  />
                  <RenderItem
                    title="Vốn đầu tư (USD)"
                    content={values.VonDauTu}
                  />
                  <RenderItem
                    select
                    title="Công cụ quản lý"
                    content={values.CongCuQuanLy}
                  />
                  <RenderItem
                    title="Vốn tư nhân"
                    content={values.VonTuNhan}
                  />
                  <RenderItem
                    title="Tên thương hiệu"
                    content={values.TenThuongHieu}
                  />
                  <RenderItem
                    title="Ngôn ngữ"
                    content={values.NgonNgu}
                  />
                </TDDetailLegend>
                <TDDetailLegend show={showAll} title="Thông tin chứng chỉ chứng nhận">
                  <RenderItem
                    title="Địa chỉ"
                    content="60 ngõ Thịnh Hào 1"
                  />
                </TDDetailLegend>
                <TDDetailLegend show={showAll} title="Thông tin doanh thu và nguồn nhân lực">
                  <RenderItem
                    title="Địa chỉ"
                    content="60 ngõ Thịnh Hào 1"
                  />
                </TDDetailLegend>

              </View>
              <View style={{
                flex: 1,
                backgroundColor: 'red',
                height: 80,
                position: 'relative',
              }}>
                <ActionButton

                  elevation={5}
                  buttonText=""
                  buttonColor={Colors.success}
                  renderIcon={() => <FontAwesome name="save" size={24} color={Colors.white} />}
                >
                </ActionButton>
              </View>

            </Card.Body>
          </Card>


        </View>
      )}
    </Formik>
    <Divider width={0.5} color="#E0E0E0" />

  </>


  const alertLogout = () => {
    Alert.alert(
      'Đăng xuất',
      'Bạn có chắc muốn đăng xuất không?',
      [
        { text: 'ĐÓNG', onPress: () => console.log('Thoat') },
        {
          text: 'ĐĂNG XUẤT',
          onPress: () => { dispatch(actions.logOut()); navigation.navigate("HomeScreen") },
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.TD_Background }}>
      <TD_Header
        checkStack
        title={headerTitle()}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} />
      ) : (
        //Object.keys(data).length !== 0
        <View style={{ flex: 1 }}>
          {data ? (
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={{ backgroundColor: '#fff' }}>
              <View style={styles.container}>
                <View style={[styles.flexInline, { paddingLeft: 10 }]}>
                  <FontAwesome name={'address-book'} solid color={iconColor} style={{ paddingStart: 0, width: 24 }} size={18} />
                  <Text style={styles.headText}>Thông tin cá nhân</Text>
                  <TouchableOpacity onPress={() => { navigation.navigate("UserProfile_EditScreen") }} style={[styles.icon, styles._iconRounded]}><FontAwesome name='pencil' size={16} /></TouchableOpacity>
                </View>
                <View>
                  <Flex>
                    <Flex.Item>
                      <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => { }}>
                          <Avatar size="large" rounded source={Images.logos._logo} />
                        </TouchableOpacity>
                      </View>
                    </Flex.Item>
                    <Flex.Item flex={2}>
                      <View>
                        <Text>{user.fullName}</Text>
                        <Text>{user.email || <Text style={{ fontStyle: 'italic', color: Colors.lightGray }}>Chưa cập nhật email</Text>}</Text>
                        <Text>{user.phoneNumber || <Text style={{ fontStyle: 'italic', color: Colors.lightGray }}>Chưa cập nhật số điện thoại</Text>}</Text>
                      </View>
                    </Flex.Item>
                  </Flex>
                </View>
              </View>
              <Divider width={0.5} color="#E0E0E0" />
              <TouchableOpacity onPress={() => { }} style={[styles.container, styles.flexInline, { paddingLeft: 15 }]}>
                <FontAwesome name={'wrench'} solid color={iconColor} style={{ paddingStart: 0, width: 24 }} size={18} />
                <Text style={{ color: Colors.darkGray }}>Cài đặt</Text>
              </TouchableOpacity>
              <Divider width={0.5} color="#E0E0E0" />
              <TouchableOpacity onPress={() => { navigation.navigate("ChangePassScreen") }} style={[styles.container, styles.flexInline, { paddingLeft: 15 }]}>
                <FontAwesome name={'lock-alt'} solid color={iconColor} style={{ paddingStart: 0, width: 24 }} size={18} />
                <Text style={{ color: Colors.darkGray }}>Đổi mật khẩu</Text>
              </TouchableOpacity>
              <Divider width={0.5} color="#E0E0E0" />
              <TouchableOpacity onPress={alertLogout} style={[styles.container, styles.flexInline, { paddingLeft: 15 }]}>
                <FontAwesome name={'sign-out-alt'} solid color={iconColor} style={{ paddingStart: 0, width: 24 }} size={18} />
                <Text style={{ color: Colors.darkGray }}>Đăng xuất</Text>
              </TouchableOpacity>
            </ScrollView>
          ) : (
            <Text>Không tìm thấy!!!</Text>
          )}
        </View>
      )
      }
    </View >
  );
};

export default UserProfileScreen;
const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 5, paddingVertical: 10 },
  avatar: { borderWidth: 1, borderColor: Colors.grey },
  headText: { fontSize: 15, fontWeight: '700', paddingVertical: 3, color: Colors.darkGray },
  icon: { position: 'absolute', right: 15, top: 5, },
  iconRounded: {
    borderWidth: 1, borderColor: Colors.lightBlueHope, borderRadius: 12,
    padding: 5, backgroundColor: Colors.lightBlueHope,
  },
  flexInline: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
});
