import React from 'react'
import { BiCodeAlt } from 'react-icons/bi/index.js'
import Projects from './projects'

interface ExperienceInfo {
  title: string
  organization?: string
  date: string
  location?: string
  skills?: string[]
  descriptions: string[]
  latest?: boolean
}

const experiences: ExperienceInfo[] = [
  {
    title: 'Research Assistant',
    organization: 'National Sun Yat-sen University – Physical Education and Sports Sciences',
    date: 'Nov 2022 – Current',
    location: 'Remote',
    skills: ['Python', 'Computer Vision', 'LLM Integration', 'YOLOv11', 'GCP', 'OpenAI API'],
    descriptions: [
      'Design and develop a badminton pose estimation system integrating YOLOv11, OpenAI API, and GCP.',
      'Assist AI team in deploying models via Flask and ngrok for temporary testing environments.',
      'Contribute to research bridging AI-based movement analysis with cloud deployment.'
    ],
    latest: true
  },
  {
    title: 'Full-Stack Developer',
    organization: 'tsn',
    date: 'Apr 2023 – Dec 2024',
    skills: ['React.js', 'TypeScript', 'Golang', 'TailwindCSS', 'PostgreSQL', 'CI/CD', 'GCP'],
    descriptions: [
      'Developed and maintained LINE Bots integrated with GPTs and AI Pose Estimation tools.',
      'Established continuous deployment pipelines with GitHub Actions and GCP.',
      'Maintained and enhanced the company’s official website using React.js and TailwindCSS.',
      'Developed a full-stack e-commerce web application with PASETO-based authentication.'
    ]
  },
  {
    title: 'Assistant Software Engineer',
    organization: 'QNAP Systems, Inc.',
    date: 'Jul 2022 – Sep 2023',
    location: 'New Taipei City, Taiwan',
    skills: ['C', 'Python', 'Robot Framework', 'Jenkins', 'Git', 'Automation Testing'],
    descriptions: [
      'Developed a Python-based unit test framework with Robot Framework to reduce testing time.',
      'Integrated testing automation with GitLab CI/CD pipelines and internal servers.',
      'Designed scripts for SAMBA and WebDAV access control management.',
      'Implemented over 250 unit tests within two months and received an Excellent performance rating.'
    ]
  }
]

const education: ExperienceInfo[] = [
  {
    title: "Master's Degree – Human Sciences",
    organization: 'Waseda University',
    date: 'Expected Apr 2027',
    location: 'Tokyo, Japan',
    descriptions: ['On-campus program focusing on Human Sciences and AI research integration.'],
    latest: true
  },
  {
    title: 'Master of Science – Computer Science',
    organization: 'University of Illinois Urbana-Champaign (Online)',
    date: 'Expected Dec 2026',
    descriptions: ['Online MCS program emphasizing scalable AI systems and software design.']
  },
  {
    title: 'Bachelor of Arts – Foreign Languages and Literatures (Minor in Computer Science)',
    organization: 'National Sun Yat-sen University',
    date: 'Graduated Jun 2024',
    location: 'Kaohsiung, Taiwan',
    descriptions: ['Graduated with cross-disciplinary focus in computational linguistics and applied computing.']
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
              {info.organization && (
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {info.organization}
                </p>
              )}
              <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {info.date} {info.location && `– ${info.location}`}
              </time>
              <p className="mb-4 text-base font-normal font-mplus text-blue-300">
                {info.skills && info.skills.join(' / ')}
              </p>
              <ul className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400 list-disc ml-5">
                {info.descriptions.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>

      <h1 className="mt-12 text-2xl uppercase underline underline-offset-8 dark:decoration-blue-300 decoration-orange-500 tracking-[1px] font-semibold font-mplus">
        Education
      </h1>
      <div className="my-8 w-full rounded-xl bg-orange-100 dark:bg-zinc-800 p-2">
        <ol className="relative border-l border-gray-200 dark:border-gray-700">
          {education.map((info, i) => (
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
              {info.organization && (
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {info.organization}
                </p>
              )}
              <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {info.date} {info.location && `– ${info.location}`}
              </time>
              <ul className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400 list-disc ml-5">
                {info.descriptions.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>

      <Projects />
    </>
  )
}

