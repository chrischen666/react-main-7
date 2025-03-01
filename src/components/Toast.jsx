import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toast as BsToast } from "bootstrap";
import { removeMessage } from "../redux/toastSlice";

export default function Toast() {
  const messages = useSelector((state) => state.toast.messages);

  const dispatch = useDispatch();

  //創建一個ref對象toastRefs，用於儲存每個 Toast 訊息的 DOM 元素
  const toastRefs = useRef({});

  // 元件首次渲染後，useEffect 會執行，遍歷 messages 陣列
  // 如果messageElement存在則創造一個BsToast的實例並打開
  const TOAST_DURATION = 2000;
  useEffect(() => {
    messages.forEach((message) => {
      // 從 toastRefs.current 物件中，根據 message.id 取得對應的 DOM 元素
      const messageElement = toastRefs.current[message.id];
      // 如果 messageElement 存在（表示該 Toast 訊息的 DOM 元素已渲染），則創建一個 BsToast 實例並顯示。
      if (messageElement) {
        const toastInstance = new BsToast(messageElement);
        toastInstance.show();
        setTimeout(() => {
          dispatch(removeMessage(message.id));
        }, TOAST_DURATION);
      }
    });
  }, [messages]);

  const handleRemove = (id) => {
    dispatch(removeMessage(id));
  };

  return (
    // 在 messages.map 遍歷時，使用 ref 回調函數將每個 Toast 訊息的 DOM 元素 el 儲存到 toastRefs.current 物件中，並以 message.id 作為鍵。
    // ref 回調函數會在元件掛載時被調用，el 參數指向對應的 DOM 元素。
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 9999 }}>
      {messages.map((message) => {
        return (
          <div
            ref={(el) => {
              return (toastRefs.current[message.id] = el);
            }}
            key={message.id}
            className="toast"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div
              className={`${
                message.status === "success" ? "bg-success" : "bg-danger"
              } toast-header text-white`}
            >
              <strong className="me-auto">
                {message.status === "success" ? "成功" : "失敗"}
              </strong>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => {
                  handleRemove(message.id);
                }}
              ></button>
            </div>
            <div className="toast-body">{message.text}</div>
          </div>
        );
      })}
    </div>
  );
}
