import Head from "next/head";
import { ReactElement } from "react";
import styles from "../styles/layout.module.css";

export type Props = {
  footer?: {
    year: number;
    author: string;
    link: string;
    copyRight: string;
  };
  mainStyle?: any;
  children: ReactElement;
  title: string;
};

const Layout = ({ children, title, footer, mainStyle}: Props) => {

  return (
    <div className={styles.body}>
      <Head>
        <title>{title}</title>
      
      </Head>
      <main className={mainStyle ?? styles.main}>
        {children}
      </main>
      {footer && (
        <footer className={styles.footer}>
          <p className={styles.footerP}>
            © {footer.year} <a href={footer.link}>{footer.author}</a>
            {" · "}
            {footer.copyRight === "CC" && (
              <a
                href="https://creativecommons.org/licenses/by-nc/4.0/"
                target="_blank"
                rel="noopener"
              >
                CC BY-NC 4.0
              </a>
            )}
            {" · "}
            <a href="rss.xml" target="_blank" title="rss">
              <svg
                className={styles.icon}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 11a9 9 0 0 1 9 9"> </path>
                <path d="M4 4a16 16 0 0 1 16 16"></path>{" "}
                <circle cx="5" cy="19" r="1"></circle>
              </svg>
            </a>
          </p>
        </footer>
      )}
    </div>
  );
};
//TODO: gen href for rss

export default Layout;
