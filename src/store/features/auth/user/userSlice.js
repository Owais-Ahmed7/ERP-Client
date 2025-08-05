import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteUser,
  getUsers,
  postUser,
  editUser,
  postLogout,
  editUserPassword,
  getDoctorUsers,
  postUserDetailInformation,
  postUserProfilePicture,
  suspendUser,
  createDoctorsScheduleNew,
  getDoctorsScheduleNew,
  postDoctorSchedule,
  editDoctorSchedule,
  markUserActiveInactive,
  addUser,
  editUserDetails,
} from "../../../../helpers/backend_helper";
import { setAlert } from "../../alert/alertSlice";

const initialState = {
  data: null,
  user: null,
  microLogin: null,
  schedule: null,
  doctor: null,
  counsellors: null,
  doctorLoading: false,
  centerAccess: null,
  userCenters: null,
  isUserLogout: false,
  forgetError: null,
  loading: false,
  profileLoading: false,
  form: { isOpen: false, data: null },
  showChangePasswordModal: false, // Added for modal state
  tempToken: null, // Added for tempToken
  requirePasswordChange: false,
};

export const registerUser = createAsyncThunk(
  "postUser",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await postUser(data);
      dispatch(
        setAlert({ type: "success", message: "User Registered Successfully" })
      );

      dispatch(setUserForm({ isOpen: false, data: null }));
      return response;
    } catch (error) {
      dispatch(setAlert({ type: "error", message: error.message }));
      return rejectWithValue("something went wrong");
    }
  }
);

export const addUserProfilePicture = createAsyncThunk(
  "postUserProfilePicture",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await postUserProfilePicture(data);
      dispatch(
        setAlert({
          type: "success",
          message: "User Profile Pictrue Uploaded Successfully",
        })
      );
      const authUser = JSON.parse(localStorage.getItem("authUser"));
      localStorage.setItem(
        "authUser",
        JSON.stringify({ ...authUser, data: response.payload })
      );
      return response;
    } catch (error) {
      dispatch(setAlert({ type: "error", message: error.message }));
      return rejectWithValue("something went wrong");
    }
  }
);

export const addUserDetailInformation = createAsyncThunk(
  "postUserDetailInformation",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await postUserDetailInformation(data);
      dispatch(
        setAlert({ type: "success", message: "User Updated Successfully" })
      );
      return response;
    } catch (error) {
      dispatch(setAlert({ type: "error", message: error.message }));
      return rejectWithValue("something went wrong");
    }
  }
);

export const addUserIncrementalSchedule = createAsyncThunk(
  "postUserIncrementalSchedule",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await createDoctorsScheduleNew(data);
      dispatch(
        setAlert({
          type: "success",
          message: "User Schedule Uploaded Successfully",
        })
      );

      return response;
    } catch (error) {
      dispatch(setAlert({ type: "error", message: error.message }));
      return rejectWithValue("something went wrong");
    }
  }
);

export const addUserWeeklySchedule = createAsyncThunk(
  "postUserWeeklySchedule",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await postDoctorSchedule(data);

      dispatch(
        setAlert({
          type: "success",
          message: "User Weekly Schedule Uploaded Successfully",
        })
      );
      return response;
    } catch (error) {
      dispatch(setAlert({ type: "error", message: error.message }));
      return rejectWithValue("something went wrong");
    }
  }
);

export const updateUserWeeklySchedule = createAsyncThunk(
  "updateUserWeeklySchedule",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await editDoctorSchedule(data);

      dispatch(
        setAlert({
          type: "success",
          message: "User Weekly Schedule Updated Successfully",
        })
      );
      return response;
    } catch (error) {
      dispatch(setAlert({ type: "error", message: error.message }));
      return rejectWithValue("something went wrong");
    }
  }
);

export const fetchUserSchedule = createAsyncThunk(
  "getUserSchedule",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await getDoctorsScheduleNew(data);

      return response;
    } catch (error) {
      dispatch(setAlert({ type: "error", message: error.message }));
      return rejectWithValue("something went wrong");
    }
  }
);

export const fetchDoctors = createAsyncThunk(
  "getDoctors",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await getDoctorUsers(data);
      return response;
    } catch (error) {
      dispatch(setAlert({ type: "error", message: error.message }));
      return rejectWithValue("something went wrong");
    }
  }
);

export const removeUser = createAsyncThunk(
  "deleteUser",
  async ({id, token}, { dispatch, rejectWithValue }) => {
    try {
      const response = await deleteUser(id, token);
      dispatch(
        setAlert({ type: "success", message: "User Deleted Successfully" })
      );
      return response;
    } catch (error) {
      dispatch(setAlert({ type: "error", message: error.message }));
      return rejectWithValue("something went wrong");
    }
  }
);

export const suspendStaff = createAsyncThunk(
  "suspendUser",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await suspendUser(data);
      dispatch(
        setAlert({
          type: "success",
          message:
            response.payload.status === "active"
              ? "User Restored Successfully!"
              : "User Suspended Successfully!",
        })
      );

      return response;
    } catch (error) {
      dispatch(setAlert({ type: "error", message: error.message }));
      return rejectWithValue("something went wrong");
    }
  }
);

export const markedUserActiveOrInactive = createAsyncThunk(
  "markedActiveOrInactive",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await markUserActiveInactive(data);
      dispatch(
        setAlert({
          type: "success",
          message: response.payload.isHideFromSearch
            ? "User Mask Successfully!"
            : "User Unmask Successfully!",
        })
      );

      return response;
    } catch (error) {
      dispatch(setAlert({ type: "error", message: error.message }));
      return rejectWithValue("something went wrong");
    }
  }
);

export const addNewUser = createAsyncThunk(
  "addUser",
  async ({data, token}, { dispatch, rejectWithValue }) => {
    try {
      console.log(data,token);
      const response = await addUser(data, token);
      dispatch(
        setAlert({ type: "success", message: "User Added Successfully" })
      );
      return response;
    } catch (error) {
      dispatch(setAlert({ type: "error", message: error.message }));
      return rejectWithValue("something went wrong");
    }
  }
);

export const updateUser = createAsyncThunk(
  "editUser",
  async ({data,id,token}, { dispatch, rejectWithValue }) => {
    try {
      const response = await editUserDetails(data,id,token);
      dispatch(
        setAlert({ type: "success", message: "User Updated Successfully" })
      );
      dispatch(setUserForm({ isOpen: false, data: null }));
      return response;
    } catch (error) {
      dispatch(setAlert({ type: "error", message: error.message }));
      return rejectWithValue("something went wrong");
    }
  }
);

export const updateUserPassword = createAsyncThunk(
  "editUserPassword",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await editUserPassword(data);
      dispatch(
        setAlert({
          type: "success",
          message: "User Password Updated Successfully",
        })
      );
      return response;
    } catch (error) {
      dispatch(setAlert({ type: "error", message: error.message }));
      return rejectWithValue("something went wrong");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "logoutUser",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await postLogout();
      return response;
    } catch (error) {
      dispatch(setAlert({ type: "error", message: error.message }));
      return rejectWithValue("something went wrong");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state) => {
      state.forgetError = null;
    },
    setMicroLogin: (state, action) => {
      state.microLogin = action.payload;
    },
    openChangePasswordModal: (state, action) => {
      state.requirePasswordChange = true;
      state.tempToken = action.payload;
      state.showChangePasswordModal = true;
    },
    closeChangePasswordModal(state) {
      state.showChangePasswordModal = false;
      state.tempToken = null;
      state.requirePasswordChange = false;
    },
    loginSuccess: (state, { payload }) => {
      state.user = payload.payload;
      state.centerAccess = payload.payload.centerAccess;
      state.userCenters = payload.userCenters;
      state.isUserLogout = false;
    },
    logoutUserSuccess: (state, { payload }) => {
      state.forgetError = payload;
    },
    changeUserAccess: (state, { payload }) => {
      state.centerAccess = payload;
    },
    searchUser: (state, { payload }) => {
      state.loading = true;
    },
    searchUserSuccess: (state, { payload }) => {
      state.data = payload.payload;
      state.loading = false;
    },
    searchUserFail: (state, { payload }) => {
      state.loading = false;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
      state.centerAccess = payload.centerAccess;
    },
    setUserForm: (state, { payload }) => {
      state.form = payload;
    },
    setUserCenters: (state, { payload }) => {
      state.userCenters = payload;
    },
    apiError: (state, { payload }) => {
      state.forgetError = payload;
    },
    socialLogin: (state, { payload }) => {
      state.forgetError = payload;
    },
    resetLoginFlag: (state, { payload }) => {
      state.forgetError = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = [payload.payload, ...state.data];
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
      });

    builder
      .addCase(addUserProfilePicture.pending, (state) => {
        state.profileLoading = true;
      })
      .addCase(addUserProfilePicture.fulfilled, (state, { payload }) => {
        state.profileLoading = false;
        state.user = payload.payload;
      })
      .addCase(addUserProfilePicture.rejected, (state, action) => {
        state.profileLoading = false;
      });

    builder
      .addCase(addUserDetailInformation.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUserDetailInformation.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.payload;
      })
      .addCase(addUserDetailInformation.rejected, (state, action) => {
        state.loading = false;
      });

    builder
      .addCase(addUserIncrementalSchedule.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUserIncrementalSchedule.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.schedule = payload.payload;
      })
      .addCase(addUserIncrementalSchedule.rejected, (state, action) => {
        state.loading = false;
      });

    builder
      .addCase(addUserWeeklySchedule.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUserWeeklySchedule.fulfilled, (state, { payload }) => {
        state.loading = false;

        state.weeklySchedule = payload.payload;
      })
      .addCase(addUserWeeklySchedule.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(updateUserWeeklySchedule.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserWeeklySchedule.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.weeklySchedule = payload.payload;
      })
      .addCase(updateUserWeeklySchedule.rejected, (state, action) => {
        state.loading = false;
      });

    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.doctorLoading = true;
      })
      .addCase(fetchDoctors.fulfilled, (state, { payload }) => {
        state.doctorLoading = false;
        state.doctor = payload.payload;
        state.counsellors = payload.counsellors;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.doctorLoading = false;
      });

    builder
      .addCase(fetchUserSchedule.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserSchedule.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.incrementalSchedule = payload.payload || [];
        state.weeklySchedule = payload.weeklySchedules || [];
        state.userCenters = payload.centerAccess || [];
        state.sessionPricing = payload.sessionPricing;
      })
      .addCase(fetchUserSchedule.rejected, (state, action) => {
        state.loading = false;
      });
    builder
      .addCase(removeUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = state.data.filter(
          (item) => item._id !== payload.payload._id
        );
      })
      .addCase(removeUser.rejected, (state, action) => {
        state.loading = false;
      });

    builder
      .addCase(suspendStaff.pending, (state) => {
        state.loading = true;
      })
      .addCase(suspendStaff.fulfilled, (state, { payload }) => {
        state.loading = false;
        const findUserIndex = state.data.findIndex(
          (el) => el._id === payload.payload._id
        );
        state.data[findUserIndex] = payload.payload;
      })
      .addCase(suspendStaff.rejected, (state, action) => {
        state.loading = false;
      });

    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        const findUserIndex = state.data.findIndex(
          (el) => el._id === payload.data._id
        );
        state.data[findUserIndex] = payload.data;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
      });

    builder
      .addCase(updateUserPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserPassword.fulfilled, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(updateUserPassword.rejected, (state, action) => {
        state.loading = false;
      });

    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isUserLogout = true;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const {
  loginUser,
  openChangePasswordModal,
  closeChangePasswordModal,
  setMicroLogin,
  loginSuccess,
  logoutUserSuccess,
  changeUserAccess,
  searchUser,
  searchUserSuccess,
  searchUserFail,
  setUser,
  setUserForm,
  setUserCenters,
  apiError,
  socialLogin,
  resetLoginFlag,
} = userSlice.actions;

export default userSlice.reducer;
