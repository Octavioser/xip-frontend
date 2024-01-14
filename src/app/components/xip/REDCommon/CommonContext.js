import React, { createContext, useContext, useState } from 'react';

const AppContext  = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState("");
    const [confirmAction, setConfirmAction] = useState(() => () => {});
    const [region, setRegion] = useState('KOR');

    
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

    const value = { 
        loading, setLoading, 
        confirm, confirmMessage, openConfirm, closeConfirm, confirmAction, 
        region, setRegion
    }

    return (
        <AppContext.Provider value={value}>
        {children}
        </AppContext.Provider>
    );
};
