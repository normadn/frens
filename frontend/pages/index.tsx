import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Navbar from 'components/navbar';

const Home: NextPage = () => {
  return (
    <div className={styles.container} data-theme="winter">
      <Head>
        <title>frens</title>
        <meta
          name="description"
          content="stake eth via ur trusted degen"
        />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧑‍🤝‍🧑</text></svg>" />
      </Head>

      <Navbar />

      <main>
        <div className="hero min-h-screen -mt-12">
          <div className="hero-content flex-col lg:flex-row">
            <div className="basis-2/5 max-w-sm mr-0 md:mr-20 rounded-lg shadow-2xl" >
              <img src="/frens.png" />
            </div>
            <div className="basis-3/5">
              <h1 className="text-5xl font-bold">Stake with Frens!</h1>
              <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://rainbow.me" target="_blank" rel="noopener noreferrer">
          Made with ❤️ by your frens at 🌈
        </a>
      </footer>
    </div>
  );
};

export default Home;
