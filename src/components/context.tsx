
"use client"
import { Theme } from "@radix-ui/themes";
import { createContext, useState } from "react";
export const Context=createContext();
export default function ThemeContext({children})
{
    const [isDark, setisDark] = useState(false)
    return(
        <Context.Provider value={{
            isDark,
            setisDark
        }}>
    <Theme appearance={isDark?"light":"Dark"}>
        {children}
    </Theme>
    </Context.Provider>
    )
}