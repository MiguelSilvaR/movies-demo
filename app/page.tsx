import styles from "./page.module.css";
import Pagination from "@/components/pagination/Pagination";

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's already imported

export default function Home() {
  return (
    <main className={styles.main}>
      <Pagination/> 
    </main>
  );
}
