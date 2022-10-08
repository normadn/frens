import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import Navbar from 'components/navbar';
import { useDeposit } from '../hooks/write/useDeposit';
import { StakeFormComponent } from 'components/staker/stakeFormComponent';

const Investor: NextPage = () => {
  const token = useRouter().query["token"]
  let tokenText = undefined
  let stakeForm = undefined
  if (token !== undefined) {
    tokenText = <h1 className="text-3xl">You have joined the pool with code {token}</h1>
    stakeForm = <StakeFormComponent></StakeFormComponent>
  }

  const { write: deposit } = useDeposit({ val: "2" });

  return (
    <div className={styles.container} data-theme="winter">
      <Head>
        <title>frens | investor</title>
        <meta
          name="description"
          content="stake eth via ur trusted degen"
        />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧑‍🤝‍🧑</text></svg>" />
      </Head>
      <Navbar />

      <main className={styles.main}>
        <h1 className="text-3xl font-bold underline">
          Stake now
        </h1>
        {tokenText}
        {stakeForm}
        <br />
        <button className="btn btn-primary" disabled={!deposit} onClick={() => deposit?.()}>
          Deposit
        </button>

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
