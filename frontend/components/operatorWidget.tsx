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
                </div>
            </figure>
        </div>
    )
};