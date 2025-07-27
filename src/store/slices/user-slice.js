import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../service/user-service";

// ✅ Fetch all users
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const localData = localStorage.getItem("users");
      if (localData) {
        return JSON.parse(localData);
      }
      const response = await getAllUsers();
      localStorage.setItem("users", JSON.stringify(response));
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Add user
export const addUser = createAsyncThunk(
  "users/addUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await createUser(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Edit user
export const editUser = createAsyncThunk(
  "users/editUser",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updateUser(id, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Remove user
export const removeUser = createAsyncThunk(
  "users/removeUser",
  async (id, { rejectWithValue }) => {
    try {
      await deleteUser(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Slice
const userSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
    error: null,
    searchQuery: "", // ✅ Added search query state
  },
  reducers: {
    // ✅ Set search query
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Add user
      .addCase(addUser.fulfilled, (state, action) => {
        state.list.push(action.payload);
        localStorage.setItem("users", JSON.stringify(state.list));
      })

      // ✅ Edit user
      .addCase(editUser.fulfilled, (state, action) => {
        const index = state.list.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
        localStorage.setItem("users", JSON.stringify(state.list));
      })

      // ✅ Remove user
      .addCase(removeUser.fulfilled, (state, action) => {
        state.list = state.list.filter((u) => u.id !== action.payload);
        localStorage.setItem("users", JSON.stringify(state.list));
      });
  },
});

export const { setSearchQuery } = userSlice.actions;
export const selectUsers = (state) => state.users.list;
export const selectSearchQuery = (state) => state.users.searchQuery;

// ✅ Selector for filtered users
export const selectFilteredUsers = createSelector(
  [selectUsers, selectSearchQuery],
  (users, searchQuery) => {
    if (!searchQuery) return users;
    return users.filter((user) =>
      `${user.first_name} ${user.last_name}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }
);

export default userSlice.reducer;
