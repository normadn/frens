import { useState, useEffect } from 'react';
import {
    useEnsAvatar,
    useEnsName,
} from 'wagmi'

const chainId = 5 // 1 for mainnet


type Props = {
    operatorAddress: string
}

export const OperatorWidget = ({ operatorAddress }: Props) => {

    // https://wagmi.sh/docs/hooks/useEnsAvatar
    
    const { data: ensAvatar, isError: isAvatarError, isLoading: isAvatarLoading } = useEnsAvatar({
        // addressOrName: ensName,
        addressOrName: "heeckhau.eth",
        chainId: chainId,
        cacheTime: 1_000,
        onSettled(data, error) {
            console.log('Settled', { data, error })
        }
    })

    const { data: ensName, isError: isEnsNameError, isLoading: isEnsNameLoading } = useEnsName({
        address: operatorAddress,
        chainId: chainId,
        cacheTime: 1_000,
        onSettled(data, error) {
            console.log('Settled', { data, error })
        }
    })


    return (
        <>
            <figure className="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
                <img className="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" src={ensAvatar} alt={ensName} width="384" />
                <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
                    <blockquote>
                        <h1 className="text-lg font-medium text-color:white">
                            Your frens pool operator
                        </h1>
                    </blockquote>
                    <figcaption className="font-medium">
                        <div className="text-sky-500 dark:text-sky-400">
                            {ensName}
                        </div>
                        <div className="text-slate-700 dark:text-slate-500">
                            ({operatorAddress})
                        </div>
                    </figcaption>
                </div>
            </figure>
        </>
    )
};