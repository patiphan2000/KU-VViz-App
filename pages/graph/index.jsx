import { useContext } from 'react'
import {CourseDataContext} from '../../contexts/DataContext'

import { useRouter } from 'next/router'

import { KuVViz } from "ku-vviz"
import 'ku-vviz/dist/index.css'

import exmData from '../../example_data/exm_data1.json'

export default function GraphPage() {

    const {data, setData} = useContext(CourseDataContext)

    const redirect = () => {
        router.push('/login')
    }

    return (
        <div style={{color: 'black'}}>
            <KuVViz
            course = {exmData.course}
            stdGrade={exmData.std}
            stdEnroll={exmData.enroll}
            />
        </div>
    )
}