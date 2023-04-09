import React, { useEffect, useState } from 'react'
import { IoSunny, IoMoon } from 'react-icons/io5/index.js'

export default function ThemeToggleIcon() {
    const [isMounted, setIsMounted] = useState(false)
    const [theme, setTheme] = useState(
        (() => {
            if (import.meta.env.SSR) {
                return undefined
            }
            if (
                typeof localStorage !== 'undefined' &&
                localStorage.getItem('theme')
            ) {
                return 'dark'
            }
            if (window.matchMedia('prefers-color-scheme: dark').matches) {
                return 'dark'
            }
            return 'light'
        })()
    )
    const toggleTheme = () => {
        const t = theme === 'light' ? 'dark' : 'light'
        localStorage.setItem('theme', t)
        setTheme(t)
    }

    useEffect(() => {
        const root = document.documentElement
        theme === 'light'
            ? root.classList.remove('dark')
            : root.classList.add('dark')
    }, [theme])

    useEffect(() => setIsMounted(true), [])
    return isMounted ? (
        <div className="inline-flex items-center p-[1px] rounded-lg hover:bg-orange-300 hover:dark:bg-zinc-600 duration-200">
            <button
                className={
                    'text-black dark:text-zinc-100 cursor-pointer rounded-lg p-2'
                }
                arai-label="Toggle Theme Icon"
                onClick={toggleTheme}
            >
                {theme === 'light' ? <IoSunny /> : <IoMoon />}
            </button>
        </div>
    ) : (
        <></>
    )
}
