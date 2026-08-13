export const API_ENDPOINTS = {
    MENU: {
        CATEGORIES: (slug) => `/api/${slug}/menu/category`,
        ITEMS: (slug, categoryId) => `/api/${slug}/menu/category/${categoryId}/items`,
    },
    AUTH: {
        LOGIN: (slug) => `/api/${slug}/auth/login`,
        REGISTER: (slug) => `/api/${slug}/auth/register`,
        ME: (slug) => `/api/${slug}/auth/me`,
        LOGOUT: (slug) => `/api/${slug}/auth/logout`,
    },
};
