import { Link as RouterLink } from "react-router-dom";

export default function Link({ children, classes = "", to = "" }) {
    return (
        <RouterLink
            role="menuitem"
            aria-haspopup="false"
            className="flex items-center gap-2 py-4 lg:px-8"
            to={to}
        >
            <span className={classes}>{children}</span>
        </RouterLink>
    );
}