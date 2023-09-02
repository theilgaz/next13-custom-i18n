"use client"

import { usePathname } from "next/navigation"
import React, { createContext, useContext, useEffect } from "react"
import { getProperty } from 'dot-prop'
import tr from "@/locales/tr.json"
import en from "@/locales/en.json"

interface ContextProps {
    lang: string
    setLang: (lang: string) => void
    t: (key: string) => string
  }
const LangContext = createContext<ContextProps>({} as ContextProps)
const localesMap : any = { tr, en }
export function LangProvider({children}:{children:React.ReactNode})
{
    const [lang, setLang] = React.useState("en")
    const t = (key:string) => {
        return getProperty(localesMap[lang], key) || key
    }

    const pathname = usePathname()
    
    useEffect(() => {
        const lang = pathname.split("/")?.[1]
        setLang(localesMap[lang] === undefined ? "en" : lang)
    }, [])
    
    return (
        <LangContext.Provider value={{lang, setLang, t}}>
            {children}
        </LangContext.Provider>
    )
}


export const useLang = () => useContext(LangContext)