import { Aside } from '@/components/partials/layout/Aside'
import { Footer } from '@/components/partials/layout/Footer'
import { Header } from '@/components/partials/layout/Header'

import { Providers } from '@/redux/Provider'
import type { AppProps } from 'next/app'

import '../styles/globals.scss'
import '../styles/Layout.scss'
import '../styles/Products.scss'
import '../styles/Layout.scss'
import '../styles/Navigation.scss'
import '../styles/ProductPage.scss'
import '../styles/Cart.scss'
import '../styles/Admin.scss'
import '../styles/Signin.scss'
import '../styles/slider.scss'

export default function App({ Component, pageProps: { session, ...pageProps }, }: AppProps) {
  
  return (
      <Providers>
        <Header />
          <main>
            <Aside />
            <Component {...pageProps} />
          </main>
        <Footer />
      </Providers>
  )
}
