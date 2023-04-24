/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Colors } from '@app/themes';
import { TD_Header } from '@app/components';
import { Card, Flex, List, WingBlank } from '@ant-design/react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import { ScrollView } from 'react-native';
import { Image } from 'react-native';
import { Comment_StartView, Posts_TimeLikeView } from '@app/components/interactive';
import { TDDetailLegend, TDDetailText } from '@app/components/tdcommon';
import { BASE_URL, enterpriseData } from '@app/data';
import moment from 'moment';
import TDDetailListView from '@app/components/tdcommon/TDDetailListView';
import ActionButton from 'react-native-action-button';

const DNInfo = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const dataService = useSelector((state) => state.global.dataService);
  const user = useSelector((state) => state.global.user);
  const accessToken = useSelector((state) => state.global.accessToken);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const [refreshing, setRefreshing] = useState(true);
  const [showAll, setShowAll] = useState(false);//Hiển thị tất cả hoặc ẩn tất cả các legend
  const [edit, setEdit] = useState(false);//Hiển thị checkbox để chỉnh sửa thông tin
  const [checkEdit, setCheckEdit] = useState({
    tq: false,
    cc: false,
    dt: false,
    nlc: false,
    ttk: false,
    khc: false,
    ttxk: false,
    ttnk: false,
    vpdd: false,
    nlh: false,
    nx: false,
    sp: false,
    plgc: false,
    tb: false
  });

  useEffect(() => {
    const fetchData = async () => {
      setData(enterpriseData);
      setRefreshing(false);
    };
    if (refreshing) {
      fetchData();
    }
    return () => { };
  }, []);

  const setChecked = (name, value) => {
    let obj = {};
    obj[name] = value;
    setCheckEdit({ ...checkEdit, ...obj })
  }

  useEffect(() => {
    setLoading(false);
    return () => { };
  }, [loading]);

  const setCheckAll = (value) => {
    var keyNames = Object.keys(checkEdit);
    keyNames.map(x => {
      checkEdit[x] = value;
    })
    setCheckEdit(checkEdit);
    setLoading(true);
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.TD_Background }}>
      <TD_Header checkrightComponent {...props} title="Thông tin cơ sở" />
      {refreshing ? (
        <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} />
      ) : (
        <View style={{ flex: 1 }}>
          {data ? (
            <>
              <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={{ backgroundColor: '#fff' }}>
                <View style={{ flex: 1, paddingBottom: 50 }}>
                  <View style={{ paddingHorizontal: 10, marginBottom: 20 }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                      <Image
                        style={styles.logo}
                        source={{
                          uri: 'http://data.csdl.gov.vn/' + data?.MOIT_Logo,
                        }}
                      />
                    </View>
                    <Text style={styles.newsTitle}>{data.MOIT_TenCongTy_VN}</Text>
                    <Posts_TimeLikeView like={100} view={data.MOIT_LuotXem} comment={20}></Posts_TimeLikeView>
                    <TDDetailText title="Mã số thuế" content={data?.Title ?? ''} />
                    <TDDetailText title="Cập nhập lần cuối" content={data?.MOIT_NgayCapNhat ? moment(data?.MOIT_NgayCapNhat).format("DD/MM/yyyy") : ""} />
                    <TDDetailText title="Trạng thái tài khoản" content={data?.MOIT_TrangThai == 2 ? 'Đang hoạt động' : ''} />

                    <TouchableOpacity onPress={() => { setShowAll(!showAll) }}><Text>{showAll ? "Đóng tất cả" : "Mở tất cả"}</Text></TouchableOpacity>
                    {edit ? <>
                      <Text style={{ color: Colors.red, fontStyle: 'italic' }}>Vui lòng chọn các mục muốn chỉnh sửa</Text>
                      <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => { setCheckAll(true) }} style={{ marginRight: 20 }}><Text>{"Chọn tất cả"}</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => { setCheckAll(false) }} style={{ marginRight: 20 }}><Text>{"Bỏ chọn tất cả"}</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => { setEdit(false); setCheckAll(false); }}><Text style={{ color: Colors.red }}>{"Hủy chỉnh sửa"}</Text></TouchableOpacity>
                      </View>
                    </> : <></>}
                    {!loading ? <>
                      <TDDetailLegend show={showAll} title="Tổng quan" edit={edit} checked={checkEdit} name="tq" setChecked={setChecked}>
                        <TDDetailText key="tq1" title="Năm thành lập" content={data?.MOIT_NamThanhLap ?? ''} />
                        <TDDetailText key="tq2" title="Số lượng lao động" content={data?.MOIT_SoLuongLaoDong ?? ''} />
                        <TDDetailText key="tq3" title="Loại hình doanh nghiệp" content={data?.MOIT_LoaiHinhDoanhNghiep ?? ''} />
                        <TDDetailText key="tq4" title="Tên viết tắt" content={data?.MOIT_TenVietTat ?? ''} />
                        <TDDetailText key="tq5" title="Vốn đầu tư(USD)" content={data?.MOIT_VonDauTu ?? ''} />
                        <TDDetailText key="tq6" title="Công cụ quản lý" content={data?.MOIT_CongCuQuanLy.map(x => { return x.LookupValue }).join(" | ")} />
                        <TDDetailText key="tq7" title="Tên thương hiệu" content={data?.MOIT_TenThuongHieu ?? ''} />
                        <TDDetailText key="tq8" title="Vốn tư nhân" content={data?.MOIT_VonTuNhan ?? ''} />
                        <TDDetailText key="tq9" title="Hệ thống quản lý chất lượng" content={data?.MOIT_ChuanChatLuong.map(x => { return x.LookupValue }).join(" | ")} />
                        <TDDetailText key="tq10" title="Ngôn ngữ" content={data?.MOIT_NgonNgu.map(x => { return x.LookupValue }).join(" | ")} />
                      </TDDetailLegend>
                      <TDDetailLegend show={showAll} title="Chứng chỉ, chứng nhận" edit={edit} checked={checkEdit} name="cc" setChecked={setChecked}>
                        <TDDetailText key="cc1" title="Chứng chỉ nguyên liệu đầu vào" content={data?.MOIT_ChungChiNguyenLieuDauVao ?? ''} />
                        <TDDetailText key="cc2" title="Hiện đang là hội viên của hiệp hội" content={data?.MOIT_HoiVien ?? ''} />
                        <TDDetailText key="cc3" title="Các bài viết hoặc đánh giá được đăng trên các tài liệu, tạp chí, ấn phẩm của ngành, trong nước và quốc tế" content={data?.MOIT_DangBaiViet ? "Có" : "Không"} />
                        <TDDetailText key="cc4" title="Các chứng chỉ đã tham gia các chương trình hỗ trợ, các khóa đào tạo của các tổ chức chính phủ / phi chính phủ" content={data?.MOIT_ChungChiThamGiaCT ?? ''} />
                        <TDDetailText key="cc5" title="Chứng nhận nhà cung cấp tốt của hãng lớn" content={data?.MOIT_ChungNhanHangLon == 2 ? "Có" : "Không"} />
                      </TDDetailLegend>
                      <TDDetailLegend show={showAll} title="Doanh thu & nhân lực" edit={edit} checked={checkEdit} name="dt" setChecked={setChecked}>
                        {data?.oThongTinDoanhThuItem != null ? <>
                          <TDDetailText key="dt1" title="Năm" content={data?.oThongTinDoanhThuItem.Title ?? ''} />
                          <TDDetailText key="dt2" title="Doanh thu(USD)" isCurrency content={data?.oThongTinDoanhThuItem.MOIT_DoanhThu ?? ''} />
                          <TDDetailText key="dt3" title="Xuất khẩu(%)" content={data?.oThongTinDoanhThuItem.MOIT_XuatKhau ?? ''} />
                          <TDDetailText key="dt4" title="Lợi nhuận trước thuế (USD)" isCurrency content={data?.oThongTinDoanhThuItem.MOIT_LoiNhuanTruocThue ?? ''} />
                          <TDDetailText key="dt5" title="Lợi nhuận sau thuế (USD)" isCurrency content={data?.oThongTinDoanhThuItem.MOIT_LoiNhuanSauThue ?? ''} />
                          <TDDetailText key="dt6" title="Mức lương bình quân của lao động (VND)" isCurrency content={data?.oThongTinDoanhThuItem.MOIT_MucLuongBinhQuan ?? ''} />
                          <TDDetailText key="dt7" title="Tổng số lao động(người)" content={data?.oThongTinDoanhThuItem.MOIT_TongSoLaoDong ?? ''} /></> :
                          <></>}
                      </TDDetailLegend>
                      <TDDetailLegend show={showAll} title="Nguồn nguyên liệu chính" edit={edit} checked={checkEdit} name="nlc" setChecked={setChecked}>
                        <TDDetailText title="Năm thành lập" content={data?.MOIT_NamThanhLap ?? ''} />
                      </TDDetailLegend>
                      <TDDetailLegend show={showAll} title="TT khác" edit={edit} checked={checkEdit} name="ttk" setChecked={setChecked}>
                        <TDDetailText title="Năm thành lập" content={data?.MOIT_NamThanhLap ?? ''} />
                      </TDDetailLegend>
                      <TDDetailLegend show={showAll} title="Khách hàng chính" edit={edit} checked={checkEdit} name="khc" setChecked={setChecked}>
                        <TDDetailListView hasHeader={true}
                          titles={[{ field: "f1", text: "Tên khách hàng" }, { field: "f2", text: "Sản phẩm" }, { field: "f3", text: "Doanh thu" }]}>
                        </TDDetailListView>
                      </TDDetailLegend>
                      <TDDetailLegend show={showAll} title="Thị trường xuất khẩu" edit={edit} checked={checkEdit} name="ttxk" setChecked={setChecked}>
                        <TDDetailText title="Năm thành lập" content={data?.MOIT_NamThanhLap ?? ''} />
                      </TDDetailLegend>
                      <TDDetailLegend show={showAll} title="Thị trường nhập khẩu" edit={edit} checked={checkEdit} name="ttnk" setChecked={setChecked}>
                        <TDDetailText title="Năm thành lập" content={data?.MOIT_NamThanhLap ?? ''} />
                      </TDDetailLegend>
                      <TDDetailLegend show={showAll} title="Văn phòng đại diện" edit={edit} checked={checkEdit} name="vpdd" setChecked={setChecked}>
                        <TDDetailText title="Năm thành lập" content={data?.MOIT_NamThanhLap ?? ''} />
                      </TDDetailLegend>
                      <TDDetailLegend show={showAll} title="Người liên hệ" edit={edit} checked={checkEdit} name="nlh" setChecked={setChecked}>
                        <TDDetailText title="Năm thành lập" content={data?.MOIT_NamThanhLap ?? ''} />
                      </TDDetailLegend>
                      <TDDetailLegend show={showAll} title="Nhà xưởng" edit={edit} checked={checkEdit} name="nx" setChecked={setChecked}>
                        <TDDetailText title="Năm thành lập" content={data?.MOIT_NamThanhLap ?? ''} />
                      </TDDetailLegend>
                      <TDDetailLegend show={showAll} title="Sản phẩm" edit={edit} checked={checkEdit} name="sp" setChecked={setChecked}>
                        <TDDetailText title="Năm thành lập" content={data?.MOIT_NamThanhLap ?? ''} />
                      </TDDetailLegend>
                      <TDDetailLegend show={showAll} title="Phân loại gia công" edit={edit} checked={checkEdit} name="plgc" setChecked={setChecked}>
                        <TDDetailText title="Năm thành lập" content={data?.MOIT_NamThanhLap ?? ''} />
                      </TDDetailLegend>
                      <TDDetailLegend show={showAll} title="Thiết bị" edit={edit} checked={checkEdit} name="tb" setChecked={setChecked}>
                        <TDDetailText title="Năm thành lập" content={data?.MOIT_NamThanhLap ?? ''} />
                      </TDDetailLegend>
                    </> : <></>}
                    <TouchableOpacity onPress={() => { setShowAll(!showAll) }}><Text>{showAll ? "Đóng tất cả" : "Mở tất cả"}</Text></TouchableOpacity>
                    <Comment_StartView type="enterprise" dataId={1}></Comment_StartView>
                  </View>
                </View>
              </ScrollView>
              {!edit ? <ActionButton
                buttonColor={Colors.blueHope}
                onPress={() => { setEdit(true) }}
                renderIcon={() => { return <FontAwesome name={'edit'} color={Colors.white} size={20} /> }}
                size={50}
              /> :
                <><ActionButton
                  buttonColor={Colors.blueHope}
                  onPress={() => { setEdit(false); setCheckAll(false); navigation.navigate("DNEditInfo", { id: data.ID, checkEdit: checkEdit }) }}
                  renderIcon={() => { return <FontAwesome name={'pen'} color={Colors.white} size={20} /> }}
                  size={50} position={"center"}
                /><ActionButton
                    buttonColor={Colors.red}
                    onPress={() => { setEdit(false); setCheckAll(false); }}
                    renderIcon={() => { return <FontAwesome name={'times'} color={Colors.white} size={20} /> }}
                    size={50}
                  /></>}
            </>
          ) : (
            <Text>Không tìm thấy!!!</Text>
          )}
        </View>
      )}
    </View >
  );
};

export default DNInfo;
const styles = StyleSheet.create({
  newsTitle: { paddingTop: 10, fontSize: 18, fontWeight: 'bold' },
  itemImage: { width: '100%', height: 200, marginTop: 10, marginBottom: 2, marginRight: 10, borderRadius: 5 },
  logo: {
    width: 100,
    height: 100
  },
});
