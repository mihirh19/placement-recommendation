'use client';
import { Image, Divider } from "@nextui-org/react";
import styles from '../app/login/page.module.css';
import CarouselComponent from "@/components/CarouselComponent";

export default function Home() {
  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className='flex-1 ml-12 max-w-1/2'>
          <div className={'text-3xl font-bold mb-5 text-transparent bg-gradient-to-r from-[#FF7E5F] to-[#F55734] inline-block bg-clip-text py-2 '}>{"Connecting Talent with Tomorrow's Opportunities"}</div>
          <Divider color="white" className={"my-4"} />
          <div className={'text-[#555] text-large'}>Your gateway to career success! Explore job opportunities, predict your ideal company match, and gain insights from alumni reviews. Empower your journey with personalized guidance and community-driven wisdom.</div>
        </div>
        <div className={'max-w-2/5 flex-2 flex-row items-center mr-12 hidden lg:flex'}>
          <Image isBlurred id={styles.img1} src="https://images.pexels.com/photos/4064230/pexels-photo-4064230.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt={"Home Photo 1"} radius={'lg'} loading={'eager'} />
              <Image isBlurred id={styles.img2} src="https://images.pexels.com/photos/7944038/pexels-photo-7944038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt={"Home Photo 2"} radius={'lg'} loading={'eager'} />
        </div>
      </div>
      <div className={'text-3xl font-bold mb-5 text-transparent bg-gradient-to-r from-[#FF7E5F] to-[#F55734] inline-block bg-clip-text ml-11'}>Major Recruiters: </div>
      <br />
      <CarouselComponent />
      <br />
    </div>
  );
}
