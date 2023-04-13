import { useContext, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {CourseDataContext} from '../contexts/DataContext'

import { useRouter } from 'next/router'

import { KuVViz, GenEDTable } from "ku-vviz"
import { CourseVerification } from "ku-vviz"
import 'ku-vviz/dist/index.css'

import logoImage from '../public/KU-VViz logo.png'

import {Prompt} from 'next/font/google' 

const prompt = Prompt({
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
  })

export default function Home() {
  
  const {data, setData} = useContext(CourseDataContext)

  const router = useRouter()

  const setCourseData = (data) => {
    setData(data);
  }

  // useEffect(() => {
  //   // const saved_data = window.localStorage.getItem('KU_VVIZ_COURSE_DATA');
  //   // const retr_data = JSON.parse(saved_data);
  //   if (data.course.length > 0) {
  //     setCourseData(retr_data);
  //   }
  // }, [])

  // useEffect(() => {
  //   window.localStorage.setItem('KU_VVIZ_COURSE_DATA', JSON.stringify(data));
  // }, [data])

  useEffect(() => {
    // const saved_data = window.localStorage.getItem('KU_VVIZ_COURSE_DATA');
    if (data.course.length <= 0) {
      router.push("/login")
    }
  }, [])

  const verification = CourseVerification(
    data.course,
    data.stdGrade,
    data.stdEnroll,
    data.gened_and_others
  );

  // console.log(verification.genEd);
  const genEdList = []
  for (let group in verification.genEd) {
    genEdList.push({
      group_name: group,
      credit_curr: parseInt(verification.genEd[group].credit_curr),
      credit_require: parseInt(verification.genEd[group].credit_require),
      subject_list: verification.genEd[group].subject_list
    })
  }

  return (
    <div style={{color: 'black'}}>
      <div className='navbar'>
        <div className='linksec'>
          <Link className='linkE' href="https://docs.google.com/forms/d/e/1FAIpQLSdRrZfZADK8S979FbBHO4jJSU59BT6hV4PW0wR5lN1YmxeeXA/viewform?usp=sf_link" 
          target="_blank">แจ้งปัญหา/กรอกแบบสอบถาม</Link>
          {/* <div className='linkE' style={{textAlign: 'center'}}>แจ้งปัญหา/กรอกแบบสอบถาม</div> */}
        </div>
        <div className='logosec'>
          <div className='logo_container'>
            <Image 
              alt="logo" 
              src={logoImage} 
              width={85} height={50}
              priority={true}
            />
          </div>
        </div>
        <div className='logoutsec'>
          <div 
          className='linkE'
          onClick={() => {
            setCourseData({
              'course': [],
              'stdGrade': [],
              'stdEnroll': [],
              'gened_and_others': []
          })
          router.push("/login");
          }}
          >logout</div>
        </div>
      </div>
      <div style={{height: '50px'}}></div>
      <div className='destop_suggest'>
        *เข้าใช้งานเว็บไซต์ด้วยอุปกรณ์เดสก์ท็อปหรือแล็ปท็อป<br></br>เพื่อประสบการณ์การใช้งานที่ดีที่สุด
      </div>
      <KuVViz
      course = {data.course || []}
      stdGrade={data.stdGrade || []}
      stdEnroll={data.stdEnroll || []}
      />
      <div style={{ 
        display:'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        }}>
        <div className="verification_container">
          <div style={{
          display: 'flex', 
          'justifyContent': 'center', alignItems: 'center', 
          height: '100px', width: '80%', marginTop: '10px', marginBottom: '-25px',
          }}>
            <div style={{
              fontFamily: 'Prompt', 
              fontSize: '1em',
              textAlign: 'center',
              color: 'gray'
              }}>
              *เพื่อการตรวจสอบข้อมูลหน่วยกิตวิชาบูรณาการ(genEd)ที่แม่นยำ
              ผู้ใช้ควรตรวจสอบข้อมูลกับมหาวิทยาลัยโดยตรงอีกครั้ง
            </div>
          </div>
        </div>
        <div className="verification_container" 
        style={{
        visibility: (verification.status)? '':'hidden',
        height: (verification.status)? '':'0',
        opacity: (verification.status)? '100':'0',
        }}>
          <div style={{
          display: 'flex', 
          'justifyContent': 'center', alignItems: 'center', 
          height: '100px', width: '80%', marginTop: '20px', marginBottom: '20px',
          borderRadius: '0.5rem',
          backgroundColor: 'white'
          }}>
            <div style={{
              fontFamily: 'Prompt', 
              fontSize: '1.2em',
              }}>ตรวจสอบเงื่อนไขจบการศึกษา:
              <span style={{
                color: 'green'
              }}> ผ่าน &#9989;</span>
            </div>
          </div>
        </div>
        <div className="genEd_container"
        style={{
          marginTop: (verification.status)? '0': '30px' 
        }}>
          <GenEDTable genEdList={genEdList} />
        </div>
      </div>
    </div>
  )
}
