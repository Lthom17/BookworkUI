import { createContext, useContext, useState } from "react";
//import materialize from "materialize-css";
import { jwtDecode } from "jwt-decode";

const authContext = createContext();

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return (
        <authContext.Provider value={auth}>
          {children}
        </authContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(authContext);
}

export function useProvideAuth() {

    const [user, setUser] = useState(undefined);
    const [errors, setErrors] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (userName, userPassword) => {

        setIsLoading(true);
        fetch("http://localhost:8080/api/security/authenticate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userName,
                userPassword,
            }),
        }).then((response) => {
            setIsLoading(false);
            if (response.status === 200) {
                const { jwt_token } = response.json();

                setUser({ user: jwtDecode(jwt_token) });

                localStorage.setItem("token", jwt_token);

              //  materialize.toast({ html: 'Login Successful', classes: 'rounded' });
            } else {
                // TODO: HANDLE ERRORS WITH SNACKBAR
                if (response.status === 400 || response.status === 403) {
                    setErrors(response.json());
                    //materialize.toast({ html: 'User does not exist.', classes: 'rounded' });
                } else {
                    setErrors(response.json());
                    //materialize.toast({ html: "We are experiencing technical difficulties. Please try again later.", classes: 'rounded' });
                }
            }
        })
    };



    return {
        user,
        isLoading,
        errors,
        handleLogin,

    }

};
