import type { AppProps } from 'next/app';

// se o seu globals.css ainda estiver em src/app, mude o caminho para '../app/globals.css'
import '../app/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
