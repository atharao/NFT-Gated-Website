import { ThirdwebProvider } from "@thirdweb-dev/react";
import Head from "next/head";
import { domainName } from "../../const/yourDetails";
import "../styles/globals.css";

// This is the chain your dApp will work on.
const activeChain = "mumbai";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      activeChain={activeChain}
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      authConfig={{
        domain: domainName,
        authUrl: "/api/auth", 
      }}
    >
      <Head>
        <title>NFT Gated Website</title>
      </Head>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;