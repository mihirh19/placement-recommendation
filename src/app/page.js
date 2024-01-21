'use client';
import { Image, Divider } from "@nextui-org/react";
import GetUser from '../components/GetUser';
import styles from '../app/login/page.module.css';
import CarouselComponent from "@/components/CarouselComponent";

export default function Home() {
  return (
    <div>
      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles.heading}>{"Connecting Talent with Tomorrow's Opportunities"}</div>
          <Divider color="white" className={"my-4"} />
          <div className={styles.desc}>Your gateway to career success! Explore job opportunities, predict your ideal company match, and gain insights from alumni reviews. Empower your journey with personalized guidance and community-driven wisdom.</div>
        </div>
        <div className={styles.image}>
          <Image isBlurred id={styles.img1} src="https://images.pexels.com/photos/4064230/pexels-photo-4064230.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt={"Home Photo 1"} radius={'lg'} loading={'eager'} />
          <Image isBlurred id={styles.img2} src="https://images.pexels.com/photos/7944038/pexels-photo-7944038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt={"Home Photo 2"} radius={'lg'} loading={'eager'} />
        </div>
      </div>
      <div className={styles.heading} style={{ fontSize: "x-large", marginLeft: '5rem' }}>Major Recruiters: </div>
      <br />
      <CarouselComponent />
      <br />

      <GetUser />
    </div>
  );
}
