const getRedirect = (role) => {
    switch(role) {
        case "user":
            return("/profile");
        case "admin":
        case "supervisor": // Combined same destination
            return("/admin");
        case "coach":
            return("/coach");
        default:
            // Optional: handle unknown roles
            return("#")
    }
}

export default getRedirect