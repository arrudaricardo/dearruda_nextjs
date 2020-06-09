import Head from "next/head";
import { ReactElement } from "react";
import styles from "../styles/layout.module.css";

export type Props = {
  mainStyle?: any;
  children: ReactElement;
  title: string;
};

const Layout = ({ children, title, mainStyle}: Props) => {
  return (
    <div className={styles.body}>
      <Head>
        <title>{title}</title>
      </Head>
      <main className={mainStyle ?? styles.main}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
