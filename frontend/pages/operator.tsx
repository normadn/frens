import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Navbar from 'components/navbar';
import { InviteFrens } from 'components/inviteFrens';
import { CreatePool } from 'components/createPool';
import { DropKeys } from 'components/dropKeys';
import { DepositProgressBarComponent } from 'components/shared/depositProgressBarComponent';

const Operator: NextPage = () => {
  const [tokenCode, setTokenCode] = useState("abcdef")
  const [step, setStep] = useState(1)

  return (
    <div className="" data-theme="winter">
      <Head>
        <title>frens | operator</title>
        <meta
          name="description"
          content="stake eth via ur trusted degen"
        />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧑‍🤝‍🧑</text></svg>" />
      </Head>

      <Navbar />

      <main className="flex flex-col justify-center items-center min-h-screen -mt-20">
        <DepositProgressBarComponent></DepositProgressBarComponent>
        <div className="w-2/3 flex flex-col items-center border-2 border-sky-500 rounded-md mb-4">
          <h1 className="text-3xl font-bold underline">
            Create Pool
          </h1>
          <div className={`${step == 1 ? "block" : "hidden"}`}>
            <CreatePool setTokenCode={setTokenCode} setStep={setStep} />
          </div>
        </div>

        <div className="w-2/3 flex flex-col items-center border-2 border-sky-500 rounded-md mb-4">
          <h1 className="text-3xl font-bold underline">
            Invite frens
          </h1>
          <div className={`${step == 2 ? "block" : "hidden"}`}>
            <InviteFrens tokenCode={tokenCode} />
          </div>
        </div>

        <div className="w-2/3 flex flex-col items-center border-2 border-sky-500 rounded-md mb-4">
          <h1 className="text-3xl font-bold underline">
            Drop your keys
          </h1>
          <div className={`${step == 2 ? "block" : "hidden"}`}>
            <DropKeys />
          </div>
        </div>
      </main>
    </div >
  );
};

export default Operator;
