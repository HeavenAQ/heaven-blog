interface Project {
  name: string
  url: string
  description: string
  tech?: string[]
}

const projects: Project[] = [
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
    tech: ['Python', 'Numpy', 'Jupyter Notebook']
  },
  {
    name: 'Hybrid-Images',
    url: 'https://github.com/HeavenAQ/Hybrid-Images',
    description: 'Combine low-freq of one image + high-freq of another to create hybrid illusions.',
    tech: ['Python', 'OpenCV', 'Computational Photography']
  },
  {
    name: 'CS446 Machine Learning Coursework',
    url: 'https://github.com/HeavenAQ/CS446-Machine-Learning',
    description: 'Collection of coursework (homeworks) in ML: perceptron, SVM, regression etc.',
    tech: ['Python', 'PyTorch', 'Scikit-learn']
  },
]

export default function Projects(): JSX.Element {
  return (
    <section>
      <h1 className="mt-12 text-2xl uppercase underline underline-offset-8 dark:decoration-blue-300 decoration-orange-500 tracking-[1px] font-semibold font-mplus">
        Projects
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 my-8">
        {projects.map((p, i) => (
          <a
            key={i}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-white dark:bg-zinc-800 rounded-lg shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-bold">{p.name}</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{p.description}</p>
            {p.tech && (
              <p className="mt-3 text-xs text-blue-500">
                {p.tech.join(' / ')}
              </p>
            )}
            <p className="mt-4 text-xs text-orange-500">View on GitHub →</p>
          </a>
        ))}
      </div>
    </section>
  )
}

