import * as requestFromServer from './Crud';
import { globalSlice, callTypes } from './Slice';
import store from '../store';

const { actions } = globalSlice;

export const setTokenFirebase = (token) => (dispatch) => {
  return dispatch(actions.setTokenFirebase(token));
};

export const logOut = () => (dispatch) => {
  return dispatch(actions.logOut());
};

export const setRandom = () => (dispatch) => {
  dispatch(actions.setRandom());
};

export const setLoadIntro = (isLoadintro) => (dispatch) => {
  return dispatch(actions.setLoadIntro(isLoadintro));
};

export const login = (username, password) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .Login(username, password)
    .then((response) => {
      let res = response?.data;
      if (res) {
        const _res = res?.data;
        let tmp = {
          username,
          password,
          token: _res?.Token,
          user: {
            avartar: _res?.User.Avatar ?? "",
            fullName: _res?.User.FullName ?? "",
            birthday: _res?.User.Birthday ?? "",
            address: _res?.User.Address ?? "",
            sex: _res?.User.Sex ?? "",
            phoneNumber: _res?.User.Phone ?? "",
            email: _res?.User.Email ?? "",
            permissions: _res?.User.Permissions ?? ""
          }
        };
        dispatch(actions.loginSuccess(tmp));
      } else {
        dispatch(actions.catchError({ error: 'Đăng nhập không thành công', callType: callTypes.action }));
      }
    })
    .catch((error) => {
      error.clientMessage = "Can't find datadonvi";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const GetMenu = (token, isRefresh) => (dispatch) => {
  if (!isRefresh) {
    dispatch(actions.startCallMenu({ callType: callTypes.action }));
  }
  return requestFromServer
    .GetMenu(token)
    .then((response) => {
      var _res = response.data;
      if (_res?.result) {
        dispatch(actions.setDataMenu(_res?.result));
      } else {
        dispatch(actions.setDataMenu(null));
      }
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't find datadonvi";
      dispatch(actions.catchErrorMenu({ error, callType: callTypes.action }));
    });
};

export const delError = () => (dispatch) => {
  return dispatch(actions.delError());
};
export const setIsRefresh = (isRefresh) => (dispatch) => {
  return dispatch(actions.setIsRefresh(isRefresh));
};
export const setFilter = (isRefresh) => (dispatch) => {
  return dispatch(actions.setFilter(isRefresh));
};
export const setRemember = (isRemember) => (dispatch) => {
  return dispatch(actions.setRemember(isRemember));
};
export const setMainScreen = (key) => (dispatch) => {
  return dispatch(actions.setMainScreen(key));
};
