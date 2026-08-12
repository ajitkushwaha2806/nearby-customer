export const API_ENDPOINTS = {
    MENU: {
        CATEGORIES: (slug) => `/api/${slug}/menu/category`,
        ITEMS: (slug, categoryId) => `/api/${slug}/menu/category/${categoryId}/items`,
    },
    AUTH: {
        LOGIN: "/api/auth/login",
        REGISTER: "/api/auth/register",
    },
};
