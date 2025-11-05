import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { FiMenu, FiX, FiExternalLink } from 'react-icons/fi/index.js'

type NavItem = { label: string; href: string; external?: boolean }

export default function NavMenu() {
    const items: NavItem[] = [
        { label: 'About', href: '/about' },
        { label: 'Posts', href: '/blog' },
        { label: 'Topics', href: '/categories' },
        { label: 'Tags', href: '/tags' },
        { label: 'Source', href: 'https://github.com/withastro/astro', external: true },
    ]
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
                <Menu.Items className="absolute right-0 w-56 -bottom-40 rounded-md bg-orange-50/90 dark:bg-zinc-700/80 backdrop-blur flex flex-col p-1 shadow-lg ring-1 ring-black/5">
                    <Menu.Item>
                        <div className="w-full rounded-md p-1 pl-2 font-bold">
                            Content
                        </div>
                    </Menu.Item>
                    {items.map((item, i) => (
                        <Menu.Item key={i}>
                            {({ active }) => (
                                <a
                                    href={item.href}
                                    target={item.external ? '_blank' : undefined}
                                    rel={item.external ? 'noopener noreferrer' : undefined}
                                    className={`${active ? 'bg-orange-200/60 dark:bg-zinc-600 text-zinc-900 dark:text-zinc-100' : ''} w-full rounded-md p-1 px-3 inline-flex items-center justify-between`}
                                >
                                    <span>{item.label}</span>
                                    {item.external && <FiExternalLink className="opacity-70"/>}
                                </a>
                            )}
                        </Menu.Item>
                    ))}
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
