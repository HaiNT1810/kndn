/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Text,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native';
import { useSelector } from 'react-redux';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Colors } from '@app/themes';
import { TD_Header } from '@app/components';
import { requestGET } from '@app/services/Api';
import { BASE_URL, bussinessData } from '@app/data';
import HTMLView from 'react-native-htmlview';
import { Comment_StartView, Posts_TimeLikeView } from '@app/components/interactive';
import { TDDetailText, TDDetailLegend, TDDetailListView } from '@app/components/tdcommon';
import moment from 'moment';

const DBSBusiness_DetailScreen = (props) => {
  const navigation = useNavigation();
  const dataService = useSelector((state) => state.global.dataService);
  const user = useSelector((state) => state.global.user);
  const AccessToken = useSelector((state) => state.global.AccessToken);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const dataRoute = route?.params ?? {};
  const [showAll, setShowAll] = useState(false);//Hiển thị tất cả hoặc ẩn tất cả các legend

  useEffect(() => {
    const fetchData = async () => {
      //console.log(dataRoute.id)
      setData(bussinessData);
      setLoading(false);
    };
    fetchData();
    return () => { };
  }, [dataRoute]);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.TD_Background }}>
      <TD_Header checkStack {...props} title="Thông tin cơ sở" />
      {loading ? (
        <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} />
      ) : (
        <View style={{ flex: 1 }}>
          {data ? (
            <View>
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
                    <TDDetailLegend show={showAll} title="Tổng quan">
                      <TDDetailText title="Năm thành lập" content={data?.MOIT_NamThanhLap ?? ''} />
                      <TDDetailText title="Số lượng lao động" content={data?.MOIT_SoLuongLaoDong ?? ''} />
                      <TDDetailText title="Loại hình doanh nghiệp" content={data?.MOIT_LoaiHinhDoanhNghiep ?? ''} />
                      <TDDetailText title="Tên viết tắt" content={data?.MOIT_TenVietTat ?? ''} />
                      <TDDetailText title="Vốn đầu tư(USD)" content={data?.MOIT_VonDauTu ?? ''} />
                      <TDDetailText title="Công cụ quản lý" content={data?.MOIT_CongCuQuanLy.map(x => { return x.LookupValue }).join(" | ")} />
                      <TDDetailText title="Tên thương hiệu" content={data?.MOIT_TenThuongHieu ?? ''} />
                      <TDDetailText title="Vốn tư nhân" content={data?.MOIT_VonTuNhan ?? ''} />
                      <TDDetailText title="Hệ thống quản lý chất lượng" content={data?.MOIT_ChuanChatLuong.map(x => { return x.LookupValue }).join(" | ")} />
                      <TDDetailText title="Ngôn ngữ" content={data?.MOIT_NgonNgu.map(x => { return x.LookupValue }).join(" | ")} />
                    </TDDetailLegend>
                    <TDDetailLegend show={showAll} title="Chứng chỉ, chứng nhận">
                      <TDDetailText title="Chứng chỉ nguyên liệu đầu vào" content={data?.MOIT_ChungChiNguyenLieuDauVao ?? ''} />
                      <TDDetailText title="Hiện đang là hội viên của hiệp hội" content={data?.MOIT_HoiVien ?? ''} />
                      <TDDetailText title="Các bài viết hoặc đánh giá được đăng trên các tài liệu, tạp chí, ấn phẩm của ngành, trong nước và quốc tế" content={data?.MOIT_DangBaiViet ? "Có" : "Không"} />
                      <TDDetailText title="Các chứng chỉ đã tham gia các chương trình hỗ trợ, các khóa đào tạo của các tổ chức chính phủ / phi chính phủ" content={data?.MOIT_ChungChiThamGiaCT ?? ''} />
                      <TDDetailText title="Chứng nhận nhà cung cấp tốt của hãng lớn" content={data?.MOIT_ChungNhanHangLon == 2 ? "Có" : "Không"} />
                    </TDDetailLegend>
                    <TDDetailLegend show={showAll} title="Doanh thu & nhân lực">
                      {data?.oThongTinDoanhThuItem != null ? <>
                        <TDDetailText title="Năm" content={data?.oThongTinDoanhThuItem.Title ?? ''} />
                        <TDDetailText title="Doanh thu(USD)" isCurrency content={data?.oThongTinDoanhThuItem.MOIT_DoanhThu ?? ''} />
                        <TDDetailText title="Xuất khẩu(%)" content={data?.oThongTinDoanhThuItem.MOIT_XuatKhau ?? ''} />
                        <TDDetailText title="Lợi nhuận trước thuế (USD)" isCurrency content={data?.oThongTinDoanhThuItem.MOIT_LoiNhuanTruocThue ?? ''} />
                        <TDDetailText title="Lợi nhuận sau thuế (USD)" isCurrency content={data?.oThongTinDoanhThuItem.MOIT_LoiNhuanSauThue ?? ''} />
                        <TDDetailText title="Mức lương bình quân của lao động (VND)" isCurrency content={data?.oThongTinDoanhThuItem.MOIT_MucLuongBinhQuan ?? ''} />
                        <TDDetailText title="Tổng số lao động(người)" content={data?.oThongTinDoanhThuItem.MOIT_TongSoLaoDong ?? ''} /></> :
                        <></>}
                    </TDDetailLegend>
                    <TDDetailLegend show={showAll} title="Nguồn nguyên liệu chính">
                      <TDDetailText title="Năm thành lập" content={data?.MOIT_NamThanhLap ?? ''} />
                    </TDDetailLegend>
                    <TDDetailLegend show={showAll} title="TT khác">
                      <TDDetailText title="Năm thành lập" content={data?.MOIT_NamThanhLap ?? ''} />
                    </TDDetailLegend>
                    <TDDetailLegend show={showAll} title="Khách hàng chính">
                      <TDDetailListView hasHeader={true}
                        titles={[{ field: "f1", text: "Tên khách hàng" }, { field: "f2", text: "Sản phẩm" }, { field: "f3", text: "Doanh thu" }]}></TDDetailListView>
                    </TDDetailLegend>
                    <TDDetailLegend show={showAll} title="Thị trường xuất khẩu">
                      <TDDetailText title="Năm thành lập" content={data?.MOIT_NamThanhLap ?? ''} />
                    </TDDetailLegend>
                    <TDDetailLegend show={showAll} title="Thị trường nhập khẩu">
                      <TDDetailText title="Năm thành lập" content={data?.MOIT_NamThanhLap ?? ''} />
                    </TDDetailLegend>
                    <TDDetailLegend show={showAll} title="Văn phòng đại diện">
                      <TDDetailText title="Năm thành lập" content={data?.MOIT_NamThanhLap ?? ''} />
                    </TDDetailLegend>
                    <TDDetailLegend show={showAll} title="Người liên hệ">
                      <TDDetailText title="Năm thành lập" content={data?.MOIT_NamThanhLap ?? ''} />
                    </TDDetailLegend>
                    <TDDetailLegend show={showAll} title="Nhà xưởng">
                      <TDDetailText title="Năm thành lập" content={data?.MOIT_NamThanhLap ?? ''} />
                    </TDDetailLegend>
                    <TDDetailLegend show={showAll} title="Sản phẩm">
                      <TDDetailText title="Năm thành lập" content={data?.MOIT_NamThanhLap ?? ''} />
                    </TDDetailLegend>
                    <TDDetailLegend show={showAll} title="Phân loại gia công">
                      <TDDetailText title="Năm thành lập" content={data?.MOIT_NamThanhLap ?? ''} />
                    </TDDetailLegend>
                    <TDDetailLegend show={showAll} title="Thiết bị">
                      <TDDetailText title="Năm thành lập" content={data?.MOIT_NamThanhLap ?? ''} />
                    </TDDetailLegend>
                    <TouchableOpacity onPress={() => { setShowAll(!showAll) }}><Text>{showAll ? "Đóng tất cả" : "Mở tất cả"}</Text></TouchableOpacity>
                    <Comment_StartView type="business" dataId={1}></Comment_StartView>
                  </View>
                </View>
              </ScrollView>
            </View>
          ) : (
            <Text>Không tìm thấy!!!</Text>
          )}
        </View>
      )}
    </View>
  );
};

export default DBSBusiness_DetailScreen;
const styles = StyleSheet.create({
  newsTitle: { paddingTop: 10, paddingBottom: 10, fontSize: 16, fontWeight: 'bold' },
  itemImage: { width: '100%', height: 200, marginTop: 10, marginBottom: 2, marginRight: 10, borderRadius: 5 },
  logo: {
    width: 100,
    height: 100
  }
});
