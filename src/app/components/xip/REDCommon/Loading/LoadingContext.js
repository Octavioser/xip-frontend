import React, { createContext, useContext, useState } from 'react';

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState("");
    const [onConfirm, setOnConfirm] = useState(() => () => {});
    const [onCancel, setOnCancel] = useState(() => () => {});

    const confirm = (message, confirmAction, cancelAction) => {
        setConfirmMessage(message);
        setOnConfirm(() => confirmAction);
        setOnCancel(() => cancelAction);
        setConfirmOpen(true);
    };

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
        {children}
        </LoadingContext.Provider>
    );
};
