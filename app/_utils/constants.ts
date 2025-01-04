export const ROUTES = {
    HOME: '/',
    BLOG: '/blog',
    OG: (title: string, description?: string) => {
        return `/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description || '')}`;
    },
}