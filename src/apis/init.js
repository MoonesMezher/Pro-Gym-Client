const API = {
    HOME: {
        GET: {
            ALL: "/home",
            ADMIN: "/home/admin"
        }
    },
    SECTIONS: {
        GET: {
            ALL: "/sections",
            ONE: (id) => `/sections/${id}`
        },
        POST: {
            ADD: "/sections/add",
            ADD_COACHES: (id) => `/sections/add/coaches/section/${id}`,
            ADD_USER: (id) => `/sections/add/user/section/${id}`
        },
        PUT: {
            UPDATE: (id) => `/sections/update/${id}`
        },
        DELETE: {
            COACHES: (id) => `/sections/delete/coaches/section/${id}`,
            USER: (id) => `/sections/delete/user/section/${id}`,
            SUBS: (id) => `/sections/delete/user/${id}`,
            ONE: (id) => `/sections/delete/${id}`
        }
    },
    USERS: {
        GET: {
            ALL: "/users",
            COACH: (id) => `/users/coach/${id}`,
            BY_STATE: `/users/state`,
            BY_NAME: "/users/name",
            ONE: (id) => `/users/${id}`,
            ME: "/users/me"
        },
        POST: {
            LOGIN: "/users/login",
            SIGNUP: "/users/signup",
            LOGOUT: "/users/logout",
            ADD_COACH: "/users/coach/add",
            ADD_SUPERVISOR: "/users/supervisor/add",
            REFRESH: "/users/refresh-token"
        },
        PUT: {
            PROFILE: "/users/profile/update",
            STATE: (id) => `/users/state/update/${id}`
        },
        DELETE: {
            COACH: (id) => `/users/coach/delete/${id}`,
            SUPERVISOR: (id) => `/users/supervisor/delete/${id}`
        }
    },
    UPLOADS: {
        POST: {
            UPLOAD: "/uploads"
        }
    },
    RATES: {
        POST: {
            ADD: (id) => `/rates/section/${id}`
        },
        DELETE: {
            BY_ADMIN: (id) => `/rates/auth/${id}`,
            ONE: (id) => `/rates/${id}`
        }
    },
    LOGS: {
        GET: {
            ALL: "/errors"
        }
    },
    HOURS: {
        GET: {
            ALL: "/hours"
        },
        POST: {
            ADD: "/hours"
        },
        DELETE: {
            ONE: (id) => `/hours/${id}`
        }
    },
    SCHEDULES: {
        GET: {
            ALL: "/schedules"
        },
        POST: {
            ADD: (id) => `/schedules/${id}`
        },
        PUT: {
            UPDATE:(id) => `/schedules/${id}`
        },
        DELETE: {
            ONE: (id) => `/schedules/${id}`
        }
    }
};

module.exports = API;