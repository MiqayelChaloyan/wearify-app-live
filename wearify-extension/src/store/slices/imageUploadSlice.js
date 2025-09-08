import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const initialState = {
    selectedFiles: [],
    uploadedImage: '',
    userId: '',
    resultPath: '',
    // isUploading: false,
    // uploadProgress: 0,
    error: null,
    success: false,
    isLoading: false,
    toaster: {
        isVisible: false,
        message: '',
        type: 'error'
    }
};

const imageUploadSlice = createSlice({
    name: 'imageUpload',
    initialState,
    reducers: {
        uploadImage: (state, action) => {
            state.uploadedImage = action.payload.source;
            state.selectedFiles.push(action.payload);
            state.userId = action.payload.id;
            state.error = null;
            state.success = false;
        },
        setResultPath: (state, action) => {
            state.resultPath = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setSelectedFiles: (state, action) => {
            state.selectedFiles = action.payload;
            state.error = null;
            state.success = false;
        },
        clearSelectedFiles: (state) => {
            state.selectedFiles = [];
            state.error = null;
            state.success = false;
        },
        removeFile: (state, action) => {
            state.selectedFiles = state.selectedFiles.filter(
                (_, index) => index !== action.payload
            );
        },
        clearUploadedImage: (state) => {
            state.uploadedImage = '';
            state.userId = '';
            state.error = null;
            state.success = false;
        },
        setUploadProgress: (state, action) => {
            state.uploadProgress = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        clearSuccess: (state) => {
            state.success = false;
        },
        resetState: (state) => {
            return initialState;
        },
        showToaster: (state, action) => {
            state.toaster = {
                isVisible: true,
                message: action.payload.message,
                type: action.payload.type || 'error'
            };
        },
        hideToaster: (state) => {
            state.toaster.isVisible = false;
        },
    },
});

export const {
    uploadImage,
    setSelectedFiles,
    clearSelectedFiles,
    removeFile,
    clearUploadedImage,
    setUploadProgress,
    clearError,
    clearSuccess,
    resetState,
    setResultPath,
    setIsLoading,
    showToaster,
    hideToaster,
} = imageUploadSlice.actions;

export default imageUploadSlice.reducer;
