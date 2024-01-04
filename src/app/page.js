
import GetUser from '../components/GetUser';
import Link from 'next/link'
export default function Home() {


  return (
    <div>
      <GetUser />
      <Link href={'/login'}>
        Login
      </Link>
    </div>
  )
}
