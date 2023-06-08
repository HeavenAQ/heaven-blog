import React from 'react'
import { BiCodeAlt } from 'react-icons/bi/index.js'

interface ExperienceInfo {
    title: string
    date: string
    skills?: string[]
    descriptions: string[]
    latest?: boolean
}

const experiences: ExperienceInfo[] = [
    {
        title: 'QNAP System .Inc',
        date: 'July 2022 - Current',
        skills: [
            'C',
            'Python',
            'Robot Framework',
            'Jenkins',
            'Unit Testing',
            'Automation',
            'Git'
        ],
        descriptions: [
            'Developing a unit test framework to curtail the time for unit testing',
            'Devised scripts to support user-group access control for SAMBA and WebDAV servers',
            'Designed and Implemented over 250+ unit tests within the first two month and was graded with excellent performance'
        ],
        latest: true
    },
    {
        title: 'National Sun Yat-sen University',
        date: 'Sep 2019 - Current',
        descriptions: [
            'Major in Foreign Languages and Literature',
            'Minor in Computer Science'
        ]
    }
]

export default function Experience(): JSX.Element {
    return (
        <>
            <h1 className="text-2xl uppercase underline underline-offset-8 dark:decoration-blue-300 decoration-orange-500 tracking-[1px] font-semibold font-mplus">
                Experience
            </h1>
            <div className="mt-8 w-full rounded-xl bg-orange-100 dark:bg-zinc-800 p-2">
                <ol className="relative border-l border-gray-200 dark:border-gray-700">
                    {experiences.map((info, i) => (
                        <li className="mb-10 ml-6" key={i}>
                            <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                <BiCodeAlt />
                            </span>
                            <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white font-mplus">
                                {info.title}
                                {info.latest && (
                                    <span className="bg-orange-200 text-red-400 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ml-3">
                                        Latest
                                    </span>
                                )}
                            </h3>
                            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                                {info.date}
                            </time>
                            <p className="mb-4 text-base font-normal font-mplus text-blue-300">
                                {info.skills && info.skills.join(' / ')}
                            </p>
                            <ul className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                                {info.descriptions.map((skill, i) => (
                                    <li key={i}>{skill}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ol>
            </div>
        </>
    )
}
