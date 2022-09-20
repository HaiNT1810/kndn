import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  dataApp: null,
  dataService: null,
  dataMenu: null,

  XacThucVanTay: false,
  isLoadIntro: false,
  fcmToken: null,
  filter: null,
  user: null,
  username_tmp: '',
  password_tmp: '',
  AccessToken: null,
  listLoading: false,
  actionsLoading: false,
  actionsLoadingMenu: false,
  isRefresh: false,
  random: 0,
  totalCount: 0,
  entities: null,
  customerForEdit: undefined,
  lastError: null,
  error: null,
  isRemember: true
};
export const callTypes = {
  list: 'list',
  action: 'action',
};

export const globalSlice = createSlice({
  name: 'global',
  initialState: initialState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    delError: (state, action) => {
      state.error = null;
      state.listLoading = false;
      state.actionsLoading = false;
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },

    catchErrorMenu: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      state.actionsLoadingMenu = false;
    },
    startCallMenu: (state, action) => {
      state.error = null;
      state.actionsLoadingMenu = true;
    },

    setTokenFirebase: (state, action) => {
      state.fcmToken = action.payload;
    },
    logOut: (state, action) => {
      console.log('LOGOUT');
      state.AccessToken = null;
      state.user = null;
      state.dataMenu = null;
    },
    setLoadIntro: (state, action) => {
      state.isLoadIntro = action.payload;
    },
    setIsRefresh: (state, action) => {
      state.isRefresh = action.payload;
    },
    setRemember: (state, action) => {
      state.isRemember = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setDataMenu: (state, action) => {
      state.dataMenu = action.payload;
      state.actionsLoadingMenu = false;
    },
    loginSuccess: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const payload = action.payload;

      state.user = payload.user;
      state.AccessToken = payload.token;
      state.username_tmp = payload.username;
      state.password_tmp = payload.password;
    },
  },
});
