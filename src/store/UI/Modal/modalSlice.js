import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    modalContent: null,
    modalVisibility: false,
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setModalContent(state, action) {
            state.modalContent = action.payload;
        },
        setModalVisibility(state, action) {
            state.modalVisibility = action.payload;
        },
        resetModal(state) {
            state.modalContent = null;
            state.modalVisibility = false;
        },
    },
});

export const { setModalContent, setModalVisibility, resetModal } = modalSlice.actions;

export default modalSlice.reducer;