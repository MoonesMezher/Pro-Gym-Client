export const ROLES = {
    USER: 'user',
    COACH: 'coach',
    SUPERVISOR: 'supervisor',
    ADMIN: 'admin'
};

export const ROLE_PERMISSIONS = {
    [ROLES.USER]: ['/', '/profile'],
    [ROLES.COACH]: ['/', "/coach"],
    [ROLES.SUPERVISOR]: ["/", '/admin'],
    [ROLES.ADMIN]: ["/", '/admin']
};
