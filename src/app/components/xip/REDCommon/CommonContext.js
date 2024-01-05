import React, { createContext, useContext, useState } from 'react';

const AppContext  = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState("");
    const [confirmAction, setConfirmAction] = useState(() => () => {});

    /**
     * 컨펌창
     * @param msg       텍스트
     * @param func    확인 눌렀을시 실행할 함수 
     * ex) openConfirm("정말 삭제하시겠습니까?", () => {console.log("삭제 로직 수행");}))
     */
    const openConfirm = (msg, func) => {
        setConfirmMessage(msg);
        setConfirmAction(() => func);
        setConfirm(true);
    };

    const closeConfirm = () => {
        setConfirm(false);
        setConfirmMessage(''); // 메시지 초기화
        setConfirmAction(() => {}); // 액션 초기화
    };

    return (
        <AppContext.Provider value={{ loading, setLoading , confirm, confirmMessage, openConfirm, closeConfirm, confirmAction}}>
        {children}
        </AppContext.Provider>
    );
};
