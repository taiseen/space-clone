import { createContext, useContext, useState } from "react"

const Style = createContext();

export const StyleContext = ({ children }) => {

    const [margin, setMargin] = useState(false);
    const [themeColor, setThemeColor] = useState('');
    
    return (
        <Style.Provider value={
            {
                margin,
                setMargin,
                themeColor,
                setThemeColor
            }
        }>
            {
                children
            }
        </Style.Provider>
    )
}

export const useStyleContext = () => useContext(Style);