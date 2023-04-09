import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { FiMenu, FiX } from 'react-icons/fi/index.js'

const DropDownMenu = () => {
    return (
        <div className="absolute -bottom-32 duration-300">
            Here is a drop down
        </div>
    )
}

export default function DropDownIcon() {
    const items = ['about', 'source', 'blogs', 'projects']
    return (
        <Menu as="div" className="relative inline-block text-left opacity-70">
            <Menu.Button className="hover:bg-orange-200 hover:dark:bg-zinc-700 cursor-pointer flex items-center justify-center relative rounded-lg duration-200 p-[0.6rem]">
                <FiMenu />
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 w-56 origin-top-right dark:divide-zinc-100 rounded-md bg-orange-50 dark:bg-zinc-500 flex flex-col p-1">
                    {items.map(item => (
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href={`/${item}`}
                                    className={`${
                                        active &&
                                        'dark:bg-orange-50 bg-zinc-600 text-white dark:text-black'
                                    } w-full mr-3 rounded-md p-1 pl-2`}
                                >
                                    {item.replace(
                                        item[0],
                                        item[0].toUpperCase()
                                    )}
                                </a>
                            )}
                        </Menu.Item>
                    ))}
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
//<div className="hover:bg-orange-100 hover:dark:bg-zinc-700 cursor-pointer flex items-center justify-center relative rounded-lg duration-200 ">
//<button
//className="p-2 text-xl"
//onClick={() => {
//setIsClicked(!isClicked)
//}}
//>
//{isClicked ? <FiX /> : <FiMenu />}
//</button>
//{isClicked && <DropDownMenu />}
//</div>
