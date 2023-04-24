/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Colors } from '@app/themes';
import { TD_Header } from '@app/components';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import { ScrollView } from 'react-native';
import { Image } from 'react-native';
import { ItemDateInput, TDDetailLegend, TDDetailText, TDTextInputNew } from '@app/components/tdcommon';
import { BASE_URL, enterpriseData } from '@app/data';
import moment from 'moment';
import ActionButton from 'react-native-action-button';
import { Avatar, CheckBox } from 'react-native-elements';
import { useFormik } from 'formik';

const Enterprise_Info_Edit = (props) => {
  const route = useRoute();
  const dataRoute = route?.params ?? {
    id: 0,
    checkEdit: {
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
    }
  };
  const checkEdit = dataRoute?.checkEdit;
  const [data, setData] = useState(null);
  const [refreshing, setRefreshing] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const { handleChange, handleSubmit, handleBlur, values, errors, touched, setFieldValue, handleReset } = useFormik({
    enableReinitialize: true,
    initialValues: data,
    onSubmit: async (item) => {

      var newData = item;
      if (dataRoute?.id > 0) {
        newData.id = dataRoute.id;
      }
      if (!newData.MOIT_TenCongTy_VN) {
        showMessage({
          type: 'warning',
          message: 'Vui lòng điền đầy đủ thông tin.',
        });
      } else {
        var body = {
          token: accessToken,
          entity: newData,
        };

        try {
          setButtonLoading(true);
          navigation.navigate("DNInfo", { id: dataRoute?.id, refresh: true });
          //var response = await requestPOST(`${BASE_URL}/EditDN`, body);
          if (response?.result) {
            showMessage({
              type: 'success',
              message: 'Thành công!',
              //description: 'Cập nhật thành công!',
            });
            handleReset();
            setButtonLoading(false);
            if (dataRoute?.id > 0) {
              navigation.goBack();
            }
          } else {
            showMessage({
              type: 'danger',
              message: 'Thất bại!',
              description: 'Xảy ra lỗi trong quá trình tải lên, vui lòng thử lại',
            });
          }
          setButtonLoading(false);
        } catch (error) {
          console.log(error);
          setButtonLoading(false);
        }
      }
    },
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
  }, [refreshing]);

  const changeObjectValue = (item, name, value, isNumber = false) => {
    let obj = {};
    if (isNumber)
      value = value.replace(/[^0-9]/g, '');
    if (!name.includes("."))
      obj[name] = value;
    else {
      var _name = name.split(".");
      obj = recursive(obj, _name, value, 0);
    }
    return ({ ...item, ...obj })
  }
  const recursive = (obj = {}, _name = [], value = "", index = 0) => {
    if (_name.length > index) {
      obj[_name[index]] = recursive(obj[_name[index]], _name, value, ++index);
      return obj;
    }
    else return value;
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.TD_Background }}>
      <TD_Header checkStack {...props} title="Chỉnh sửa thông tin" />
      {refreshing ? (
        <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} />
      ) : (
        <View style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={{ backgroundColor: '#fff' }}>
            <View style={{ flex: 1, paddingBottom: 50 }}>
              <View style={{ paddingHorizontal: 10, marginBottom: 20 }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                  <Avatar
                    size="xlarge"
                    showEditButton
                    source={{
                      uri: 'http://data.csdl.gov.vn/' + values?.MOIT_Logo,
                    }}
                  />
                </View>
                <TDTextInputNew isImportant multiline value={values?.MOIT_TenCongTy_VN} onChangeText={handleChange("MOIT_TenCongTy_VN")} placeholder={'Tên công ty'} title={'Tên công ty'} />
                <TDTextInputNew isImportant multiline value={values?.Title} onChangeText={handleChange("Title")} placeholder={'Mã số thuế'} title={'Mã số thuế'} />
                {checkEdit.tq ?
                  <>
                    <TDDetailLegend show={true} title="Tổng quan">
                      <TDTextInputNew key="tq1" value={values?.MOIT_NamThanhLap} onChangeText={handleChange("MOIT_NamThanhLap")} placeholder={'Năm thành lập'} title={'Năm thành lập'} />
                      <TDTextInputNew key="tq2" value={values?.MOIT_SoLuongLaoDong} onChangeText={handleChange("MOIT_SoLuongLaoDong")} placeholder={'Số lượng lao động'} title={'Số lượng lao động'} />
                      <TDTextInputNew key="tq3" value={values?.MOIT_LoaiHinhDoanhNghiep} onChangeText={handleChange("MOIT_LoaiHinhDoanhNghiep")} placeholder={'Loại hình doanh nghiệp'} title={'Loại hình doanh nghiệp'} />
                      <TDTextInputNew key="tq4" value={values?.MOIT_TenVietTat} onChangeText={handleChange("MOIT_TenVietTat")} placeholder={'Tên viết tắt'} title={'Tên viết tắt'} />
                      <TDTextInputNew key="tq5" value={values?.MOIT_VonDauTu} onChangeText={handleChange("MOIT_VonDauTu")} placeholder={'Vốn đầu tư(USD)'} title={'Vốn đầu tư(USD)'} />
                      <TDTextInputNew key="tq6" value={values?.MOIT_CongCuQuanLy.map(x => { return x.LookupValue }).join(" | ")} onChangeText={handleChange("MOIT_CongCuQuanLy")} placeholder={'Công cụ quản lý'} title={'Công cụ quản lý'} />
                      <TDTextInputNew key="tq7" value={values?.MOIT_TenThuongHieu} onChangeText={handleChange("MOIT_TenThuongHieu")} placeholder={'Tên thương hiệu'} title={'Tên thương hiệu'} />
                      <TDTextInputNew key="tq8" value={values?.MOIT_VonTuNhan} onChangeText={handleChange("MOIT_VonTuNhan")} placeholder={'Vốn tư nhân'} title={'Vốn tư nhân'} />
                      <TDTextInputNew key="tq9" value={values?.MOIT_ChuanChatLuong.map(x => { return x.LookupValue }).join(" | ")} onChangeText={handleChange("MOIT_ChuanChatLuong")} placeholder={'Hệ thống quản lý chất lượng'} title={'Hệ thống quản lý chất lượng'} />
                      <TDTextInputNew key="tq10" value={values?.MOIT_NgonNgu.map(x => { return x.LookupValue }).join(" | ")} onChangeText={handleChange("MOIT_NgonNgu")} placeholder={'Ngôn ngữ'} title={'Ngôn ngữ'} />
                    </TDDetailLegend>
                  </> : <></>
                }
                {checkEdit.cc ?
                  <>
                    <TDDetailLegend show={true} title="Chứng chỉ, chứng nhận">
                      <TDTextInputNew key="cc1" value={values?.MOIT_ChungChiNguyenLieuDauVao} onChangeText={handleChange("MOIT_ChungChiNguyenLieuDauVao")} placeholder={'Chứng chỉ nguyên liệu đầu vào'} title={'Chứng chỉ nguyên liệu đầu vào'} />
                      <TDTextInputNew key="cc2" value={values?.MOIT_HoiVien} onChangeText={handleChange("MOIT_HoiVien")} placeholder={'Hiện đang là hội viên của hiệp hội'} title={'Hiện đang là hội viên của hiệp hội'} />
                      <TDTextInputNew key="cc3" value={values?.MOIT_DangBaiViet} onChangeText={handleChange("MOIT_DangBaiViet")} placeholder={'Các bài viết hoặc đánh giá được đăng trên các tài liệu, tạp chí, ấn phẩm của ngành, trong nước và quốc tế'} title={'Các bài viết hoặc đánh giá được đăng trên các tài liệu, tạp chí, ấn phẩm của ngành, trong nước và quốc tế'} />
                      <TDTextInputNew key="cc4" value={values?.MOIT_ChungChiThamGiaCT} onChangeText={handleChange("MOIT_ChungChiThamGiaCT")} placeholder={'Các chứng chỉ đã tham gia các chương trình hỗ trợ, các khóa đào tạo của các tổ chức chính phủ / phi chính phủ'} title={'Các chứng chỉ đã tham gia các chương trình hỗ trợ, các khóa đào tạo của các tổ chức chính phủ / phi chính phủ'} />
                      <CheckBox size={22} checked={values?.MOIT_ChungNhanHangLon} onPress={() => { setFieldValue("MOIT_ChungNhanHangLon", !values?.MOIT_ChungNhanHangLon) }} checkedColor={Colors.green} title={"Chứng nhận nhà cung cấp tốt của hãng lớn"} />
                    </TDDetailLegend>
                  </> : <></>
                }
                {checkEdit.dt ?
                  <>
                    <TDDetailLegend show={true} title="Doanh thu & nhân lực">
                      <TDTextInputNew mode="dt0" keyboardType='numeric' value={values?.oThongTinDoanhThuItem?.Title} onChangeText={(val) => { setFieldValue("oThongTinDoanhThuItem", changeObjectValue(values?.oThongTinDoanhThuItem, "Title", val)) }} placeholder={'Năm'} title={'Năm'} />
                      <TDTextInputNew key="dt1" keyboardType='numeric' value={values?.oThongTinDoanhThuItem?.MOIT_DoanhThu} onChangeText={(val) => { setFieldValue("oThongTinDoanhThuItem", changeObjectValue(values?.oThongTinDoanhThuItem, "MOIT_DoanhThu", val, true)) }} placeholder={'Doanh thu(USD)'} title={'Doanh thu(USD)'} />
                      <TDTextInputNew key="dt2" keyboardType='numeric' value={values?.oThongTinDoanhThuItem?.MOIT_XuatKhau} onChangeText={(val) => { setFieldValue("oThongTinDoanhThuItem", changeObjectValue(values?.oThongTinDoanhThuItem, "MOIT_XuatKhau", val, true)) }} placeholder={'Xuất khẩu(%)'} title={'Xuất khẩu(%)'} />
                      <TDTextInputNew key="dt3" keyboardType='numeric' value={values?.oThongTinDoanhThuItem?.MOIT_LoiNhuanTruocThue} onChangeText={(val) => { setFieldValue("oThongTinDoanhThuItem", changeObjectValue(values?.oThongTinDoanhThuItem, "MOIT_LoiNhuanTruocThue", val, true)) }} placeholder={'Lợi nhuận trước thuế (USD)'} title={'Lợi nhuận trước thuế (USD)'} />
                      <TDTextInputNew key="dt4" keyboardType='numeric' value={values?.oThongTinDoanhThuItem?.MOIT_LoiNhuanSauThue} onChangeText={(val) => { setFieldValue("oThongTinDoanhThuItem", changeObjectValue(values?.oThongTinDoanhThuItem, "MOIT_LoiNhuanSauThue", val, true)) }} placeholder={'Lợi nhuận sau thuế (USD)'} title={'Lợi nhuận sau thuế (USD)'} />
                      <TDTextInputNew key="dt5" keyboardType='numeric' value={values?.oThongTinDoanhThuItem?.MOIT_MucLuongBinhQuan} onChangeText={(val) => { setFieldValue("oThongTinDoanhThuItem", changeObjectValue(values?.oThongTinDoanhThuItem, "MOIT_MucLuongBinhQuan", val, true)) }} placeholder={'Mức lương bình quân của lao động (VND)'} title={'Mức lương bình quân của lao động (VND)'} />
                      <TDTextInputNew key="dt6" keyboardType='numeric' value={values?.oThongTinDoanhThuItem?.MOIT_TongSoLaoDong} onChangeText={(val) => { setFieldValue("oThongTinDoanhThuItem", changeObjectValue(values?.oThongTinDoanhThuItem, "MOIT_TongSoLaoDong", val, true)) }} placeholder={'Tổng số lao động(người)'} title={'Tổng số lao động(người)'} />
                    </TDDetailLegend>
                  </> : <></>
                }
              </View>
            </View>
          </ScrollView>
          <ActionButton
            buttonColor={Colors.blueHope}
            onPress={handleSubmit}
            renderIcon={() => { return <FontAwesome name={'save'} color={Colors.white} size={20} /> }}
            size={50}
          />
        </View>
      )}
    </View >
  );
};

export default Enterprise_Info_Edit;
const styles = StyleSheet.create({
  newsTitle: { paddingTop: 10, fontSize: 18, fontWeight: 'bold' },
  itemImage: { width: '100%', height: 200, marginTop: 10, marginBottom: 2, marginRight: 10, borderRadius: 5 },
  logo: {
    width: 100,
    height: 100
  },
});
