import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
    ${reset};
    a {
        text-decoration-line: none;
        color: inherit;
    }
    h1 {
        font-size: 20px;
        display: block;
        margin-bottom: 10px;
    }
    body,html {
        height:100%;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
`;
