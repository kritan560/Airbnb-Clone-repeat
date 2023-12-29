import toast from "react-hot-toast";

export const FAVORITE_ASSIGNED = "Favorited";
export const FAVORITE_REMOVED = "Favorite Removed";
export const FAVORITE_ASSIGNED_ICON = "😍";
export const FAVORITE_REMOVED_ICON = "😢";
export const UNAUTHORIZED = "Opps! Please Login";
export const LOGIN_SUCCESS = "Welcome";
export const RESERVED_SUCCESS = "Successfully Reserved ";
export const LISTING_DELETE = "Listing Deleted";
export const ERROR_MESSAGE = "Something went wrong";
export const DB_SAVED = "Data Saved To DB";
export const NEW_USER = "New User Created";
export const USER_LOGOUT_SUCCESS = "Logout Success";

// success toast
export function SuccessToast(
    theme: string | undefined,
    systemTheme: "dark" | "light" | undefined,
    message: string
) {
    if (theme == "dark") {
        toast.success(message, {
            style: { borderRadius: "10px", background: "#333", color: "#fff" }
        });
    } else if (theme == "light") {
        toast.success(message);
    } else if (theme == "system") {
        if (systemTheme == "dark") {
            toast.error(message, {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff"
                }
            });
        } else if (systemTheme == "light") {
            toast.error(message);
        }
    }
}

// error toast
export function ErrorToast(
    theme: string | undefined,
    systemTheme: "dark" | "light" | undefined,
    message: string
) {
    if (theme == "dark") {
        toast.error(message, {
            style: { borderRadius: "10px", background: "#333", color: "#fff" }
        });
    } else if (theme == "light") {
        toast.error(message);
    } else if (theme == "system") {
        if (systemTheme == "dark") {
            toast.error(message, {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff"
                }
            });
        } else if (systemTheme == "light") {
            toast.error(message);
        }
    }
}

// emoji toast
export function EmojiToast(
    theme: string | undefined,
    systemTheme: "dark" | "light" | undefined,
    message: string,
    emoji: string
) {
    if (theme == "dark") {
        toast.error(message, {
            icon: emoji,
            style: { borderRadius: "10px", background: "#333", color: "#fff" }
        });
    } else if (theme == "light") {
        toast.error(message, { icon: emoji });
    } else if (theme == "system") {
        if (systemTheme == "dark") {
            toast.error(message, {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff"
                }
            });
        } else if (systemTheme == "light") {
            toast.error(message);
        }
    }
}

// export function SuccessToast(){
//     toast.success('helloss')
// }

// export function ErrorToast(){
//     toast.error('error')
// }
