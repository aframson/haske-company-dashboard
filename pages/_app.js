import '../styles/globals.css'
import '@progress/kendo-theme-default/dist/all.css';
import 'reactjs-popup/dist/index.css';
import React, { useEffect } from 'react';
import StateProvider from '../StateManagement'
import Header from '../components/Header'
import { ProSidebarProvider } from 'react-pro-sidebar';
import Router from "next/router"
import { useRouter } from 'next/router';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { ToastProvider } from 'react-toast-notifications';
import { Offline, Online } from "react-detect-offline";
import UseOffline from '../components/Offline';
NProgress.configure({
  template: `<div  style="height:9px;background:#31a658;" class="bar" role="bar">
                <div class="peg">
                   </div></div><div class="spinner" role="spinner">
                   <div class="spinner-icon"></div></div>`
});

export default function App({ Component, pageProps }) {


  const router = useRouter()

  useEffect(() => {
    const handleStart = (url) => {
      console.log(`Loading: ${url}`)
      NProgress.start()
    }

    const handleStop = () => {
      NProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

  return (
    <StateProvider>
      <Offline>
        <UseOffline />
      </Offline>
      <Online>
        <ToastProvider>
          <ProSidebarProvider>
            <Header />
            <Component {...pageProps} />
          </ProSidebarProvider>
        </ToastProvider>
      </Online>
    </StateProvider>
  )
}
