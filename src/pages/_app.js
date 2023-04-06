import "@/styles/globals.css";

// import Font Awesome CSS
import "@fortawesome/fontawesome-svg-core/styles.css";

import { APP_NAME } from "@/config";
import { config } from "@fortawesome/fontawesome-svg-core";
import { DefaultSeo } from "next-seo";
import Layout from "../components/Layout";
// Tell Font Awesome to skip adding the CSS automatically
// since it's already imported above
config.autoAddCss = false;

const App = ({ Component, pageProps }) => {
  return (
    <Layout>
      <DefaultSeo
        openGraph={{
          type: "website",
          locale: "en_US",
          siteName: APP_NAME,
        }}
        twitter={{
          handle: "@NFL_DovKleiman",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
