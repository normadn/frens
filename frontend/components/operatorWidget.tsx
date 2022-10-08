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
        <div className="">
            <div className="">
                <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
                    <blockquote>
                        {!isEnsNameError && !isEnsNameLoading && (
                            <p className="text-lg font-medium">{ensName}</p>
                        )}
                    </blockquote>
                </div>
                {!isAvatarError && !isAvatarLoading && ensAvatar && (
                    <figure className="bg-slate-100 rounded-xl p-8 dark:bg-slate-800">
                        <img className="w-24 h-24 rounded-full mx-auto" width="200" src={ensAvatar} alt="ENS Avatar" />
                    </figure>
                )}
            </div>
        </div>
    )
};