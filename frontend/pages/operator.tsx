import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Navbar from 'components/navbar';
import { useState } from 'react';

const CODE_LENGTH = 9

const Operator: NextPage = () => {
  const [components, setComponents] = useState([])
  return (
    <div className={styles.container} data-theme="winter">
      <Head>
        <title>frens | operator</title>
        <meta
          name="description"
          content="stake eth via ur trusted degen"
        />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧑‍🤝‍🧑</text></svg>" />
      </Head>

      <Navbar />

      <main className={styles.main}>

        <h1 className="text-3xl font-bold underline">
          Invite frens
        </h1>
        <button className="btn" onClick={generateCodeForOperator}>Button</button>
        {components.map((item, i) => (<CodeComponent code={item}/>))}
      </main>

      <footer className={styles.footer}>
        <a href="https://rainbow.me" target="_blank" rel="noopener noreferrer">
          Made with ❤️ by your frens at 🌈
        </a>
      </footer>
    </div>
  );

  function generateCodeForOperator(): void {
    const code = Math.random().toString(36).substring(2, CODE_LENGTH)
    setComponents([code])
  }
};

const CodeComponent = (props) => {
  return (
    <div>
        <h1>{props.code}</h1> 
    </div>
  );
};

export default Operator;
