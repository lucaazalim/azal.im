# azal.im

Welcome to the source code of my personal website! 👋

The site is organized into the following sections:

- 🏠 **Homepage** – Showcasing my professional experience, education, awards, and projects.
- ✍️ **Blog** – A collection of articles I've written on software development and technology.
- ▶️ **Videos** – A curated list of my favorite YouTube videos across a variety of topics.
- 🎞 **Movies** – A catalog of movies and series I’ve watched in recent years, complete with my personal ratings.
- 🎓 **Academics** – An overview of my academic journey in Software Engineering, including completed courses, individual grades, and GPA.

---

## Technologies

This project is built using the following technologies:

- **Next.js** – A React framework for building server-rendered applications.
- **TypeScript** – A superset of JavaScript that adds static types.
- **Tailwind CSS v4** – A utility-first CSS framework for rapid UI development.
- **Shadcn/ui** – A component library for building beautiful UIs with Tailwind CSS.

In addition, the following libraries are used for specific functionalities:

- **Lucide** – A library for displaying icons.
- **Zod** – A TypeScript-first schema declaration and validation library.
- **TanStack Query** – A powerful data-fetching library for React.
- **React Hook Form** – A library for managing forms in React applications.
- **Shiki** – A library for syntax highlighting.

---

## Directory Structure

The project is organized into the following directories:

```text
app
└── _components
    └── ui
    (home)
    api
    ├── movies
    └── og
    blog
    academics
    movies
    videos
data
├── movies
└── posts
lib
└── ...
public
└── ...
```

| Directory            | Description                                             |
| -------------------- | ------------------------------------------------------- |
| `app`                | Root directory for Next.js application with app router. |
| `app/_components`    | Shared components used across multiple pages.           |
| `app/_components/ui` | Shadcn/UI components.                                   |
| `app/(home)`         | Homepage components and layout.                         |
| `app/api`            | API routes for server-side functionality.               |
| `app/api/movies`     | Endpoint for fetching movies data.                      |
| `app/api/og`         | Open Graph image generation API for the blog.           |
| `app/blog`           | Blog components, pages and layout.                      |
| `app/contact`        | Contact page components and layout.                     |
| `app/cv`             | CV page components and layout.                          |
| `app/academics`      | Academics page components and layout.                   |
| `app/movies`         | Movies page components and layout.                      |
| `app/projects`       | Projects page components and layout.                    |
| `app/videos`         | Videos page components and layout.                      |
| `data`               | Static data files.                                      |
| `data/movies`        | JSON files containing movies and their metadata.        |
| `data/posts`         | MDX files for blog posts.                               |
| `lib`                | Utility functions, types, and helper code.              |
| `public`             | Public static assets like images.                       |

## License

This project is licensed under the [MIT License](./LICENSE).
You are free to use, modify, and distribute this code, provided that **proper credit is given** by linking back to the [original repository](https://github.com/lucaazalim/azal.im).
