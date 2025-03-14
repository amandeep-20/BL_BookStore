import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getAllBooks } from "../utils/API.js";

export interface Book {
    _id?: string; // Match the API field (if using _id)
    rating: number;
    title: string;
    author: string;
    price: number;
    coverPic?: string;
    quantity?: number;
    bookName?: string;
    discountPrice?: number;
}

interface BooksState {
    allBooks: Book[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

export const fetchBooks = createAsyncThunk<Book[]>("books/fetchBooks", async () => {
    const response = await getAllBooks();
    return response; // Directly return the array
});

const initialState: BooksState = {
    allBooks: [],
    status: "idle",
    error: null,
};

const bookSlice = createSlice({
    name: "books",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
                state.status = "succeeded";
                state.allBooks = action.payload;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Something went wrong";
            });
    },
});

export default bookSlice.reducer;