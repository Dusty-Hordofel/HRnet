import React, { ReactNode } from 'react'
import Header from './header/Header'

type LayoutProps = {
    children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className='flex flex-col'>
            <Header />
            {children}
        </div>
    )
}

export default Layout