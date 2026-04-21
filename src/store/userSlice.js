import { createSlice } from '@reduxjs/toolkit';

// Hydration function to retrieve the user from localStorage on refresh
const loadUserFromStorage = () => {
    try {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
        return null;
    }
};

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: loadUserFromStorage(),
    },
    reducers: {
        setUser: (state, action) => {
            state.data = action.payload;
        },
        clearUser: (state) => {
            state.data = null;
        }
    }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
