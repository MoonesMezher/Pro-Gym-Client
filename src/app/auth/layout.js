import Auth from "./Auth";

export const metadata = {
    title: "Pro Gym - Auth",
    description: "Pro Gym Auth",
};

export default function AuthLayout({ children }) {    
    return (<Auth>{ children }</Auth>);
}