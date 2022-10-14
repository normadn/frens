import type { NextPage } from 'next';
import Link from 'next/link'
import Head from 'next/head';
import Navbar from 'components/navbar';
import Footer from 'components/footer';

const Home: NextPage = () => {
  return (
    <div className="bg-gradient-to-r from-cyan-400 to-blue-300" data-theme="winter">
      <Head>
        <title>frens</title>
        <meta
          name="description"
          content="stake eth via ur trusted degen fren"
        />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧑‍🤝‍🧑</text></svg>" />
      </Head>

      <Navbar />

      <main>
        <div className="hero min-h-screen -mt-12">
          <div className="hero-content flex-col lg:flex-row">
            <img src="/frens.png" className="hidden md:block basis-2/5 max-w-sm mr-0 md:mr-20 rounded-lg shadow-2xl"/>
            <div className="basis-3/5">
              <h1 className="text-5xl font-bold text-white">Stake with Frens!</h1>
              <p className="text-xl py-6 text-white">Spin up a staking pool so ur frens can stake via their favorite crypto degen</p>
              <Link href="/operator">
                <a className="btn btn-primary text-white bg-gradient-to-r from-pink-500 to-violet-500">Get Started</a>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer/>
    </div>
  );
};

export default Home;
