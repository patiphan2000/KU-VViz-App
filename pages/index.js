import { useContext, useEffect } from 'react'
import {CourseDataContext} from '../contexts/DataContext'

import { useRouter } from 'next/router'

import { KuVViz } from "ku-vviz"
import 'ku-vviz/dist/index.css'


export default function Home() {
  
  const {data, setData} = useContext(CourseDataContext)

  const router = useRouter()
  
  useEffect(() => {
    if (data.course.length <= 0) {
      router.push("/login")
    }
  }, [])

  // console.log(data.stdGrade);

  return (
    <div style={{color: 'black'}}>
      <KuVViz
      course = {data.course || []}
      stdGrade={data.stdGrade || []}
      stdEnroll={data.stdEnroll || []}
      />
    </div>
  )
}
