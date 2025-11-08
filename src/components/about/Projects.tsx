interface Project {
  name: string
  url: string
  description: string
  tech?: string[]
  featured?: boolean
}

interface ProjectCategory {
  category: string
  icon: string
  color: string
  projects: Project[]
}

const projectCategories: ProjectCategory[] = [
  {
    category: 'Computer Vision & Image Processing',
    icon: '🎨',
    color: 'bg-white dark:bg-zinc-800 border-gray-200 dark:border-gray-700',
    projects: [
      {
        name: 'Badminton Pose Estimation System',
        url: 'https://github.com/HeavenAQ/badminton-linebot',
        description: 'AI-powered LINE Bot integrating YOLOv11 pose estimation with OpenAI API for real-time badminton instruction and feedback.',
        tech: ['Go', 'Python', 'YOLOv11', 'OpenAI API', 'GCP'],
        featured: true
      },
      {
        name: 'Gradient-Fusion',
        url: 'https://github.com/HeavenAQ/Gradient-Fusion',
        description: 'Poisson blending / gradient-domain fusion for seamless image compositing.',
        tech: ['Python', 'OpenCV', 'Jupyter Notebook']
      },
      {
        name: 'Image-Quilting',
        url: 'https://github.com/HeavenAQ/Image-Quilting',
        description: 'Texture synthesis & transfer via image-quilting (SIGGRAPH 2001).',
        tech: ['Python', 'NumPy', 'Jupyter Notebook']
      },
      {
        name: 'Hybrid-Images',
        url: 'https://github.com/HeavenAQ/Hybrid-Images',
        description: 'Combine low-freq of one image + high-freq of another to create hybrid illusions.',
        tech: ['Python', 'OpenCV', 'Computational Photography']
      }
    ]
  },
  {
    category: 'Machine Learning & Deep Learning',
    icon: '🤖',
    color: 'bg-white dark:bg-zinc-800 border-gray-200 dark:border-gray-700',
    projects: [
      {
        name: 'CS446 Machine Learning',
        url: 'https://github.com/HeavenAQ/CS446-Machine-Learning',
        description: 'UIUC ML coursework: perceptron, SVM, regression, neural networks, and more.',
        tech: ['Python', 'PyTorch', 'Scikit-learn'],
        featured: true
      }
    ]
  },
  {
    category: 'Full-Stack Development',
    icon: '🚀',
    color: 'bg-white dark:bg-zinc-800 border-gray-200 dark:border-gray-700',
    projects: [
      {
        name: 'TSN E-Commerce Platform',
        url: 'https://github.com/HeavenAQ/tsn-ecommerce',
        description: 'Full-stack e-commerce platform with PASETO-based authentication, payment integration, and responsive design.',
        tech: ['Go', 'PostgreSQL', 'React', 'TailwindCSS'],
        featured: true
      },
      {
        name: 'NPM Project',
        url: 'https://github.com/HeavenAQ/npm-project',
        description: 'National Palace Museum collaboration for bilingual exhibition access system.',
        tech: ['TypeScript', 'React', 'Web Development']
      },
      {
        name: 'TSN Activity Website',
        url: 'https://github.com/HeavenAQ/tsn-act1',
        description: 'Dynamic activity management website with modern UI/UX.',
        tech: ['TypeScript', 'React', 'TailwindCSS']
      }
    ]
  },
  {
    category: 'AI Integration & Chatbots',
    icon: '💬',
    color: 'bg-white dark:bg-zinc-800 border-gray-200 dark:border-gray-700',
    projects: [
      {
        name: 'GPT-Powered Badminton Bot',
        url: 'https://github.com/HeavenAQ/gpt-chatbot',
        description: 'ChatGPT-based LINE bot for badminton rules and coaching assistance.',
        tech: ['Python', 'OpenAI API', 'LINE Bot']
      },
      {
        name: '2025 LINE Bot',
        url: 'https://github.com/HeavenAQ/2025-linebot',
        description: 'Modern LINE bot implementation with Go for scalable messaging.',
        tech: ['Go', 'LINE Messaging API']
      }
    ]
  },
  {
    category: 'Full-Stack Web Applications',
    icon: '🌐',
    color: 'bg-white dark:bg-zinc-800 border-gray-200 dark:border-gray-700',
    projects: [
      {
        name: 'STJ Official Website',
        url: 'https://github.com/HeavenAQ/stj-official',
        description: 'Full-stack official website with Go backend and TypeScript frontend, featuring CI/CD integration.',
        tech: ['Go', 'TypeScript', 'GitHub Actions']
      }
    ]
  }
]

export default function Projects(): JSX.Element {
  return (
    <section>
      <h1 className="mt-12 text-2xl uppercase underline underline-offset-8 dark:decoration-blue-300 decoration-orange-500 tracking-[1px] font-semibold font-mplus mb-8">
        Projects
      </h1>

      {projectCategories.map((category, catIndex) => (
        <div key={catIndex} className="mb-12">
          {/* Category Header */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">{category.icon}</span>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 font-mplus">
              {category.category}
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-300 dark:from-gray-700 to-transparent"></div>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {category.projects.map((project, projIndex) => (
              <a
                key={projIndex}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative block p-5 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl ${category.color} ${
                  project.featured
                    ? 'ring-2 ring-offset-2 ring-orange-400 dark:ring-blue-400 dark:ring-offset-gray-900'
                    : ''
                }`}
              >
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute -top-3 -right-3 bg-orange-500 dark:bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    Featured
                  </div>
                )}

                {/* Project Name */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white font-mplus mb-2">
                  {project.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                {project.tech && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="text-xs px-2 py-1 rounded-md bg-white dark:bg-zinc-900 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* View Link */}
                <div className="flex items-center gap-2 text-sm font-semibold text-orange-600 dark:text-blue-400 mt-auto">
                  <span>View on GitHub</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}

