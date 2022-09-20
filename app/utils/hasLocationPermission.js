import {Platform, PermissionsAndroid} from 'react-native';
import {showMessage} from 'react-native-flash-message';

const hasLocationPermission = async () => {
  if (Platform.OS === 'ios' || (Platform.OS === 'android' && Platform.Version < 23)) {
    return true;
  }
  const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
  if (hasPermission) {
    return true;
  }
  const status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }
  if (status === PermissionsAndroid.RESULTS.DENIED) {
    showMessage({
      message: 'Lỗi!',
      description: 'Vui lòng cấp quyền cho ứng dụng sử dụng vị trí hiện tại của bạn',
      type: 'danger',
      duration: 5000,
    });
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    showMessage({
      message: 'Lỗi!',
      description: 'Vui lòng cấp quyền cho ứng dụng sử dụng vị trí hiện tại của bạn',
      type: 'danger',
      duration: 5000,
    });
  }
  return false;
};

export {hasLocationPermission};
