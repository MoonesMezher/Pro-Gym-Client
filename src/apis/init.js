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
            ONE: `/sections/`,
            ALLWITHCOACHES: `/sections/coaches/`,
            ALLWITHUSERS: `/sections/users/`,
        },
        POST: {
            ADD: "/sections/add",
            ADD_COACHES: `/sections/add/coaches/section/`,
            DELETE_COACHES: `/sections/delete/coaches/section/`,
            DELETE_USER: `/sections/delete/user/section/`,
            ADD_USER: `/sections/add/user/section/`
        },
        PUT: {
            UPDATE: `/sections/update/`
        },
        DELETE: {
            SUBS: (id) => `/sections/delete/user/${id}`,
            ONE: `/sections/delete/`
        }
    },
    USERS: {
        GET: {
            ALL: "/users",
            COACH: `/users/coach/`,
            BY_STATE: `/users/state`,
            BY_NAME: "/users/name",
            ONE: `/users/`,
            ME: "/users/me",
            SUPERVISORS: "/users/supervisors"
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
            COACH: `/users/coach/delete/`,
            SUPERVISOR: `/users/supervisor/delete/`
        }
    },
    UPLOADS: {
        POST: {
            UPLOAD: "/uploads"
        }
    },
    RATES: {
        POST: {
            ADD: `/rates/section/`
        },
        DELETE: {
            BY_ADMIN: (id) => `/rates/auth/${id}`,
            ONE: (id) => `/rates/${id}`
        }
    },
    LOGS: {
        GET: {
            ALL: "/logs"
        },
        DELETE: {
            CLEAR: "/logs"
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
            ADD: `/schedules/`
        },
        PUT: {
            UPDATE:`/schedules/`
        },
        DELETE: {
            ONE: `/schedules/`
        }
    }
};

module.exports = API;