"use client";
import { useRef, useEffect } from "react";
import { makeStore } from "@/store";
import { Provider, useDispatch } from "react-redux";
import { fetchUser } from "@/store/slices/userSlice";

function UserLoader({ children }) {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    return <>{children}</>;
}

export default function StoreProvider({ children }) {
    const storeRef = useRef(undefined);
    if (!storeRef.current) {
        storeRef.current = makeStore();
    }
    
    return (
        <Provider store={storeRef.current}>
            <UserLoader>
                {children}
            </UserLoader>
        </Provider>
    );
}
