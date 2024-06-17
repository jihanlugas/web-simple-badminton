import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';



type Props = {
  children: React.ReactNode
}

const Main: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <meta name="theme-color" content={'currentColor'} />
      </Head>
      <main className={''}>
        <header>
          <div className="fixed h-16 w-full flex justify-between items-center shadow bg-primary-500 z-40">
            <div className="p-2 flex text-white items-center">
              <div className="text-2xl px-2">
                <span className=''>{process.env.APP_NAME}</span>
              </div>
            </div>
          </div>
        </header>
        <div className='pt-16'>
          {children}
        </div>
      </main>
    </>
  );
};

export default Main;