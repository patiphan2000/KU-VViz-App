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

  console.log(CourseVerification(
    data.course,
    data.stdGrade,
    data.stdEnroll,
    data.gened_and_others
  ));

  return (
    <div style={{color: 'black'}}>
      <KuVViz
      course = {data.course || []}
      stdGrade={data.stdGrade || []}
      stdEnroll={data.stdEnroll || []}
      />
      <div>{2}</div>
    </div>
  )
}
