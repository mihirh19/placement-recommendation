'use client';
import { Image } from "@nextui-org/react";
import GetUser from '../components/GetUser';
import styles from '../app/login/page.module.css'

export default function Home() {
  return (
    <div>
      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles.heading}>Connecting Talent with Tomorrow's Opportunities</div>
          <div className={styles.desc}>Your gateway to career success! Explore job opportunities, predict your ideal company match, and gain insights from alumni reviews. Empower your journey with personalized guidance and community-driven wisdom.</div>
        </div>
        <div className={styles.image}>
          <Image id={styles.img1} src="https://images.pexels.com/photos/4064230/pexels-photo-4064230.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"/>
          <Image id={styles.img2} src="https://images.pexels.com/photos/7944038/pexels-photo-7944038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"/>
        </div>
      </div>
      <GetUser />
    </div>
  );
}
