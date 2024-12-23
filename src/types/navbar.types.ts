import { StaticImageData } from "next/image";


export type NavbarType = {
    backgroundColor: string;
    logo: StaticImageData;
    showLoginButton: boolean;
    showRegisterButton: boolean;
    loggedEmailCookie?: string;
    firstname?: string | undefined;
    lastname?: string | undefined;
    showInitialBurger?: boolean;
}