import { useState, useEffect } from 'react';
import {
    useEnsAvatar,
    useEnsName,
    useAccount,
    useSignMessage
} from 'wagmi'

import { Lens } from 'lens-protocol';


const chainId = 5 // 1 for mainnet


type Props = {
    operatorAddress: string
}

export const OperatorWidget = ({ operatorAddress }: Props) => {

    // https://wagmi.sh/docs/hooks/useEnsAvatar


    const { data: ensName, isError: isEnsNameError, isLoading: isEnsNameLoading } = useEnsName({
        address: operatorAddress,
        chainId: chainId,
        cacheTime: 1_000,
        onSettled(data, error) {
            console.log('Settled', { data, error })
        }
    })

    const { data: ensAvatar, isError: isAvatarError, isLoading: isAvatarLoading } = useEnsAvatar({
        addressOrName: ensName,
        // addressOrName: "heeckhau.eth",
        chainId: chainId,
        cacheTime: 1_000,
        onSettled(data, error) {
            console.log('Settled', { data, error })
        }
    })

    const { address } = useAccount()

    const { data, error, isLoading, signMessage } = useSignMessage({
        onSuccess(data, variables) {
            // Verify the signature
            VerifySignature(data);
        },
    });

    const authenticate = async () => {
        // Getting the challenge from the server
        const data = await Lens.getChallenge(address);
        const message = (data as { data: { challenge: { text: string } } }).data.challenge.text;
        // Signing the challenge with the wallet
        signMessage({ message });
    };

    const VerifySignature = async (sign) => {
        // Sending the signature to the server to verify
        const response = await Lens.Authenticate(address, sign);
        console.log(response);

        // {
        //  data: {
        //   authenticate: {
        //    accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjB4YjE5QzI4OTBjZjk0N0FEM2YwYjdkN0U1QTlmZkJjZTM2ZDNmOWJkMiIsInJvbGUiOiJub3JtYWwiLCJpYXQiOjE2NDUxMDQyMzEsImV4cCI6MTY0NTEwNjAzMX0.lwLlo3UBxjNGn5D_W25oh2rg2I_ZS3KVuU9n7dctGIU",
        //    refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjB4YjE5QzI4OTBjZjk0N0FEM2YwYjdkN0U1QTlmZkJjZTM2ZDNmOWJkMiIsInJvbGUiOiJyZWZyZXNoIiwiaWF0IjoxNjQ1MTA0MjMxLCJleHAiOjE2NDUxOTA2MzF9.2Tdts-dLVWgTLXmah8cfzNx7sGLFtMBY7Z9VXcn2ZpE"
        //   }
        // }
    };

    const follow = async () => {
        await authenticate();
    }

    return (
        <div className="w-full md:w-3/5 mt-4">
            <figure className="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
                <img className="w-24 h-24 md:w-48 md:h-auto rounded-full mx-auto" src={ensAvatar} alt={ensName} width="384" />
                <div className="pt-6 pr-8 text-center md:text-left space-y-4">
                    <blockquote>
                        <h1 className="text-lg font-medium text-white">
                            Your frenly pool operator
                        </h1>
                    </blockquote>
                    <figcaption className="font-medium">
                        <div className="text-sky-500 dark:text-sky-400">
                            {ensName}
                        </div>
                        <div className="text-white dark:text-slate-500">
                            ({operatorAddress})
                        </div>
                    </figcaption>
                    {/* <button onClick={follow}>Follow on Lens</button> */}
                    <a href="https://lenster.xyz/u/heeckhau.lens">Follow on Lens</a>
                </div>
            </figure>
        </div>
    )
};