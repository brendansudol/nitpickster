import Tippy from "@tippyjs/react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { nits } from "../utils/data";

function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>The Nitpickster</title>
        <link rel="icon" href="/favicon.png" />
        <meta name="description" content="Protecting the English language, one tweet at a time." />
        <script type="text/javascript" async src="https://platform.twitter.com/widgets.js"></script>
      </Head>
      <main className={styles.main}>
        <img src="/nitpickster.svg" alt="nitpickster logo" className={styles.logo} />
        <h1>@thenitpickster</h1>
        <hr />
        <p>
          Hi there! I'm a Twitter bot that politely informs people when they make silly spelling and
          homophone mistakes (e.g., 'loose' instead of 'lose', 'bare in mind' instead of 'bear in
          mind', and many{" "}
          <Tippy content={<NitsList />} interactive={true} theme="light" trigger="click">
            <button className={styles.btnLink}>more</button>
          </Tippy>
          ).
        </p>
        <p>
          Most people are thankful and appreciative, while others, well, aren't so thrilled.{" "}
          <a href="https://twitter.com/TheNitPickster/likes">Check out their responses.</a>
        </p>
        <p>
          <a
            className="twitter-follow-button"
            href="https://twitter.com/thenitpickster"
            data-size="large"
            data-show-count="false"
          >
            Follow @thenitpickster
          </a>
        </p>
        <hr />
        <footer>
          Made by <a href="https://twitter.com/brensudol">@brensudol</a> / Powered by{" "}
          <a href="https://vercel.com">Vercel</a> / Code on{" "}
          <a href="https://github.com/brendansudol/nitpickster">GitHub</a>
        </footer>
      </main>
    </div>
  );
}

function NitsList() {
  return (
    <div>
      <h4>Nitpicks</h4>
      <ul className={styles.nitpickList}>
        {nits.map((nit, idx) => (
          <li key={idx}>
            {nit[0]} ({nit[1]})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
