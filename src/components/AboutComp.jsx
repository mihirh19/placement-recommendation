import React from 'react'
import '../app/globals.css'

const AboutComp = () => {
  return (
        <>
            <header className='about-header'>
                <h1>DHARMSINH DESAI UNIVERSITY - Placements</h1>
                <p>Your Gateway to Career Success</p>
            </header>

            <section className='about-container'>
                <h2>About Us</h2>

                <p>
                    We are dedicated to providing a revolutionary platform for students to shape their careers.
                    Our mission is to bridge the gap between academia and the professional world, offering personalized insights and guidance
                    to empower students in making informed decisions about their future.
                </p>

                <h3>Our Mission</h3>
                <p>
                    We aim to revolutionize the placement experience by offering innovative solutions that consider
                    students' skills, Competitive Programming (CP) rank, Cumulative Performance Index (CPI), and project experiences to predict
                    the companies where they are likely to excel.
                </p>

                <h3>What Sets Us Apart</h3>
                <ul>
                    <li><strong>Placement Predictions:</strong> Leverage advanced algorithms that consider your skills, Competitive Programming (CP) rank, Cumulative Performance Index (CPI), and project experiences to predict the companies where you are likely to excel.</li>
                    <li><strong>Ongoing Recruitment Details:</strong>Stay up-to-date with the latest recruitment drives, both on-campus and off-campus. Access detailed information about participating companies, eligibility criteria, and application deadlines.</li>
                    <li><strong>Personalized Career Guidance:</strong> Receive personalized recommendations and career guidance based on your academic performance, technical skills, and extracurricular achievements. Our platform aims to be your virtual mentor, providing insights tailored to your unique profile.</li>
                    <li><strong>Seamless Registration:</strong> Simplify the application process by allowing seamless registration for upcoming placement drives. Submit your details efficiently and showcase your potential to prospective employers.</li>
                    <li><strong>Off-Campus Opportunities:</strong> Explore a wide array of off-campus opportunities beyond your academic institution. Discover placements that align with your aspirations, whether they are in your hometown or across the globe.</li>
                </ul>

                <h3>Join Us Today</h3>
                <p>
                    Register today to unlock a world of opportunities, gain valuable insights, and step confidently into the professional realm.
                    Let us be your trusted companion on your journey to career success.
                </p>
            </section>
        </>
  )
}

export default AboutComp