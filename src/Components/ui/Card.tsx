import React from 'react'
import { CardProps } from '@/types/cardProps.types'

const Card = ({title, paragraph}: CardProps) => {
    return (
        <div className="bg-[#fff] p-4 md:p-6 leading-tight custom-md:max-w-md max-w-xl flex flex-col h-100 rounded-3xl">
            <h2 className="text-[#000]">{title}</h2>
            <div className="border-t-2 border-custom-green my-2"></div>
            <p className="text-[#000]">{paragraph}</p>
        </div>
    )
}

export default Card