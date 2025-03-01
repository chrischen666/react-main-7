import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: [
    ],
};

//記法store.js只有一個，所以reducer也是單數
//slice.js有複數個，所以reducer也是複數
const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        //新增訊息
        pushMessage(state, action) {
            const { text, status } = action.payload;
            const id = Date.now();
            state.messages.push({
                id,
                text,
                status
            })
        },
        //移除訊息
        removeMessage(state, action) {
            //點選當下的值
            const message_id = action.payload;
            // 找到state符合條件的
            const index = state.messages.findIndex((message) => {
                return message.id === message_id;
            })
            if (index !== -1) {
                state.messages.splice(index, 1);
            }
        }
    }
})

export const { pushMessage,removeMessage } = toastSlice.actions;

export default toastSlice.reducer;