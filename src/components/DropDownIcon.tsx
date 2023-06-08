import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { FiMenu, FiX } from 'react-icons/fi/index.js'

export default function DropDownIcon() {
    const items = ['about', 'blogs', 'projects']
    const [isOpen, setIsOpen] = useState(false)
    return (
        <Menu as="div" className="relative inline-block text-left">
            <Menu.Button
                className="hover:bg-orange-200 hover:dark:bg-zinc-700 cursor-pointer flex items-center justify-center relative rounded-lg duration-200 p-[0.6rem]"
                onClick={() => {
                    setIsOpen(!isOpen)
                }}
            >
                {isOpen ? <FiX /> : <FiMenu />}
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
                <Menu.Items className="absolute right-0 w-56 -bottom-36 dark:divide-zinc-100 rounded-md bg-orange-50 dark:bg-zinc-500 flex flex-col p-1">
                    <Menu.Item>
                        <div className="w-full rounded-md p-1 pl-2 font-bold">
                            Content
                        </div>
                    </Menu.Item>
                    {items.map((item, i) => (
                        <Menu.Item key={i}>
                            {({ active }) => (
                                <a
                                    href={`/${item}`}
                                    className={`${
                                        active &&
                                        'dark:bg-orange-50 bg-zinc-600 text-white dark:text-black'
                                    } w-full rounded-md p-1 px-3`}
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
