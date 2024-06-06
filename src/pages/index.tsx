import {
  ConnectWallet,
  useContract,
  useContractMetadata,
  useUser,
} from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getUser } from "../../auth.config";
import { contractAddress } from "../../const/yourDetails";
import { Header } from "../components/Header";
import styles from "../styles/Home.module.css";
import checkBalance from "../util/checkBalance";
import Head from "next/head";
import PhotoGallery from "../components/PhotoGallery";

// Updated list with DSA course images and YouTube links
const dsaCourses = [
  { img: "1.png", link: "https://www.youtube.com/watch?v=yRpLlJmRo2w&list=PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop" },
  { img: "1.png", link: "https://www.youtube.com/watch?v=LusTv0RlnSU&list=PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop&index=2" },
  { img: "1.png", link: "https://www.youtube.com/watch?v=I5srDu75h_M&list=PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop&index=3" },
  { img: "1.png", link: "https://www.youtube.com/watch?v=0r1SfRoLuzU&list=PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop&index=4" },
  { img: "1.png", link: "https://www.youtube.com/watch?v=0r1SfRoLuzU&list=PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop&index=5" },
  { img: "1.png", link: "https://www.youtube.com/watch?v=0r1SfRoLuzU&list=PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop&index=6" },
  { img: "1.png", link: "https://www.youtube.com/watch?v=0r1SfRoLuzU&list=PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop&index=7" },
  { img: "1.png", link: "https://www.youtube.com/watch?v=0r1SfRoLuzU&list=PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop&index=8" },
  { img: "1.png", link: "https://www.youtube.com/watch?v=0r1SfRoLuzU&list=PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop&index=9" },
  { img: "1.png", link: "https://www.youtube.com/watch?v=0r1SfRoLuzU&list=PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop&index=10" },
  { img: "1.png", link: "https://www.youtube.com/watch?v=0r1SfRoLuzU&list=PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop&index=11" },
  { img: "1.png", link: "https://www.youtube.com/watch?v=0r1SfRoLuzU&list=PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop&index=12" },
  { img: "1.png", link: "https://www.youtube.com/watch?v=0r1SfRoLuzU&list=PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop&index=13" },
  { img: "1.png", link: "https://www.youtube.com/watch?v=0r1SfRoLuzU&list=PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop&index=14" },
  { img: "1.png", link: "https://www.youtube.com/watch?v=0r1SfRoLuzU&list=PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop&index=15" },
  { img: "1.png", link: "https://www.youtube.com/watch?v=0r1SfRoLuzU&list=PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop&index=16" },
  { img: "1.png", link: "https://www.youtube.com/watch?v=0r1SfRoLuzU&list=PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop&index=17" },
  { img: "1.png", link: "https://www.youtube.com/watch?v=0r1SfRoLuzU&list=PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop&index=18" },
  { img: "1.png", link: "https://www.youtube.com/watch?v=0r1SfRoLuzU&list=PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop&index=19" },
  { img: "1.png", link: "https://www.youtube.com/watch?v=0r1SfRoLuzU&list=PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop&index=20" },
  { img: "1.png", link: "https://www.youtube.com/watch?v=0r1SfRoLuzU&list=PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop&index=21" },
  { img: "1.png", link: "https://www.youtube.com/watch?v=0r1SfRoLuzU&list=PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop&index=22" },
  { img: "1.png", link: "https://www.youtube.com/watch?v=0r1SfRoLuzU&list=PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop&index=23" },
  { img: "1.png", link: "https://www.youtube.com/watch?v=0r1SfRoLuzU&list=PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop&index=24" },
  { img: "1.png", link: "https://www.youtube.com/watch?v=0r1SfRoLuzU&list=PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop&index=25" },
  { img: "1.png", link: "https://www.youtube.com/watch?v=0r1SfRoLuzU&list=PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop&index=26" },
  { img: "1.png", link: "https://www.youtube.com/watch?v=0r1SfRoLuzU&list=PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop&index=27" },
  { img: "1.png", link: "https://www.youtube.com/watch?v=0r1SfRoLuzU&list=PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop&index=28" },
  { img: "1.png", link: "https://www.youtube.com/watch?v=0r1SfRoLuzU&list=PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop&index=29" },
  { img: "1.png", link: "https://www.youtube.com/watch?v=0r1SfRoLuzU&list=PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop&index=30" },
];

export default function Home() {
  const { isLoggedIn, isLoading } = useUser();
  const router = useRouter();
  const { contract } = useContract(contractAddress);
  const { data: contractMetadata, isLoading: contractLoading } =
    useContractMetadata(contract);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/login");
    }
  }, [isLoading, isLoggedIn, router]);

  return (
    <div className={styles.container}>
      <Head>
        <title>DSA Courses - E-Learners Platform</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <h1 className={styles.h1}>Premium DSA Content Unlocked</h1>
      
      <div className={styles.gallerySpacing}>
        <PhotoGallery courses={dsaCourses} /> {/* Pass courses as props */}
      </div>    
    </div>
  );
}

// This gets called on every request
export async function getServerSideProps(context) {
  const user = await getUser(context.req);

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const secretKey = process.env.TW_SECRET_KEY;
  if (!secretKey) {
    console.error("Missing env var: TW_SECRET_KEY");
    throw new Error("Missing env var: TW_SECRET_KEY");
  }

  const PRIVATE_KEY = process.env.THIRDWEB_AUTH_PRIVATE_KEY;
  if (!PRIVATE_KEY) {
    throw new Error("You need to add an PRIVATE_KEY environment variable.");
  }

  const sdk = ThirdwebSDK.fromPrivateKey(PRIVATE_KEY, "mumbai", { secretKey });

  const hasNft = await checkBalance(sdk, user.address);
  if (!hasNft) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { props: {} };
}
