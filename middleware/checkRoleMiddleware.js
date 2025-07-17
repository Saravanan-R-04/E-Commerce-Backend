export const checkRoleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        const role = req.user.role;

        if (!allowedRoles.includes(role)) {
            return res.status(403).json({
                success: false,
                message: "You don't have permission to access this resource"
            });
        }
        next(); 
    };
};
