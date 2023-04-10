import { useContext, useEffect } from 'react'
import {CourseDataContext} from '../contexts/DataContext'

import { useRouter } from 'next/router'

import { KuVViz } from "ku-vviz"
import { CourseVerification } from "ku-vviz"
import 'ku-vviz/dist/index.css'


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
  console.log(verification);

  const listGenEd = [];

  for (let group in verification.genEd) {
    const currGroup = verification.genEd[group];
    // console.log(verification.genEd[group].subject_list)
    const subject_list = verification.genEd[group].subject_list;
    const genGroup = (
      <div style={{
          fontFamily: 'Prompt',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
          maxWidth: '60%'
        }}>
        <div key={group} style={{
          fontFamily: 'Prompt',
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '1.2em',
          marginTop: '15px'
        }}>
          <div>{group}</div>
          <div>{currGroup.credit_require + '/' + currGroup.credit_curr}</div>
        </div>
        <div>
          {subject_list.map((e) => {
            return (
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
              <div>{e.subject_code}</div>
              <div>{e.subject_name_th}</div>
              <div>{e.credit}</div>
            </div>);
          })}
        </div>
      </div>
    )
    listGenEd.push(genGroup);
  }

  return (
    <div style={{color: 'black'}}>
      <KuVViz
      course = {data.course || []}
      stdGrade={data.stdGrade || []}
      stdEnroll={data.stdEnroll || []}
      />
      <div style={{fontFamily: 'Prompt', fontSize: '1.2em'}}>สถานะตรวจจบ: 
        <span style={{
          color: (verification.status)? 'green':'red'
        }}>{(verification.status)? ' ผ่าน':' ไม่ผ่าน'}</span>
      </div>
      <div>{listGenEd.map((e) => {
        return e;
      })}</div>
    </div>
  )
}
