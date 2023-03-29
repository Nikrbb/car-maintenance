import React, { useContext } from 'react';

export const contextRoot = React.createContext(null);

export const useStore = () => {
    const context = useContext(contextRoot);

    if (context === null) {
        throw new Error('Error');
    }
    return context;
};
