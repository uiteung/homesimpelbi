import { CihuyTokRed } from "https://c-craftjs.github.io/link/link.js";
import { CihuyGetCookie } from "https://c-craftjs.github.io/cookies/cookies.js";
const token = CihuyGetCookie("login");

const cookieName = token;
const redirectUrl = "https://euis.ulbi.ac.id";
CihuyTokRed(cookieName, redirectUrl);
