import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Navbar from 'components/navbar';

const Investor: NextPage = () => {
  return (
    <div className={styles.container} data-theme="winter">
      <Head>
        <title>frens | investor</title>
        <meta
          name="description"
          content="stake eth via ur trusted degen"
        />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧑‍🤝‍🧑</text></svg>"/>
      </Head>

      <Navbar/>

      <main className={styles.main}>

        <h1 className="text-3xl font-bold underline">
          Invest here
        </h1>
        <button className="btn">Button</button>

      </main>

      <footer className={styles.footer}>
        <a href="https://rainbow.me" target="_blank" rel="noopener noreferrer">
          Made with ❤️ by your frens at 🌈
        </a>
      </footer>
    </div>
  );
};

export default Investor;
