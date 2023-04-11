import { useContext, useEffect } from 'react'
import {CourseDataContext} from '../contexts/DataContext'

import { useRouter } from 'next/router'

import { KuVViz, GenEDTable } from "ku-vviz"
import { CourseVerification } from "ku-vviz"
import 'ku-vviz/dist/index.css'

import {Prompt} from 'next/font/google' 

const prompt = Prompt({
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
  })

export default function Home() {
  
  const {data, setData} = useContext(CourseDataContext)

  const router = useRouter()

  useEffect(() => {
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

  console.log(verification.genEd);
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
      <KuVViz
      course = {data.course || []}
      stdGrade={data.stdGrade || []}
      stdEnroll={data.stdEnroll || []}
      />
      <div style={{ display:'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{fontFamily: 'Prompt', fontSize: '1.2em'}}>สถานะตรวจจบ: 
          <span style={{
            color: (verification.status)? 'green':'red'
          }}>{(verification.status)? ' ผ่าน':' ไม่ผ่าน'}</span>
        </div>
        <div style={{
          width: '80%', paddingLeft: '15%'
        }}>
          <GenEDTable genEdList={genEdList} />
        </div>
      </div>
    </div>
  )
}
