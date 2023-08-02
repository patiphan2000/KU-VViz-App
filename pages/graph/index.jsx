import { useContext } from 'react'
import {CourseDataContext} from '../../contexts/DataContext'

import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

import { KuVViz, GenEDTable } from "ku-vviz"
import { CourseVerification } from "ku-vviz"
import 'ku-vviz/dist/index.css'

import logoImage from '../../public/KU-VViz logo.png'
import {Prompt} from 'next/font/google' 

import exmData from '../../example_data/exm_data1.json'

const prompt = Prompt({
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
  })

export default function GraphPage() {

    const {data, setData} = useContext(CourseDataContext)

    const router = useRouter()

    const setCourseData = (data) => {
        setData(data);
    }

    const redirect = () => {
        router.push('/login')
    }

    const verification = {
        status: false,
        require_subject: [],
        genEd: {
            "กลุ่ม GenED 1": {
                "credit_curr": 6,
                "credit_require": 9,
                "subject_list": [
                    {
                        "subject_code": "00000001",
                        "subject_name_th": "วิชา 1",
                        "subject_name_en": "Subject 1",
                        "credit": 3,
                        "pre_subject": [],
                        "co_subject": ["00000002"],
                        "grouping_data": "1/1"
                    },
                    {
                        "subject_code": "00000003",
                        "subject_name_th": "วิชา 3",
                        "subject_name_en": "Subject 3",
                        "credit": 3,
                        "pre_subject": ["00000001"],
                        "co_subject": [],
                        "grouping_data": "1/2"
                    }
                ]
            },
            "กลุ่ม GenED 2": {
                "credit_curr": 6,
                "credit_require": 5,
                "subject_list": [
                    {
                        "subject_code": "00000002",
                        "subject_name_th": "วิชา 2",
                        "subject_name_en": "Subject 2",
                        "credit": 3,
                        "pre_subject": [],
                        "co_subject": ["00000001"],
                        "grouping_data": "1/1"
                    },
                    {
                        "subject_code": "00000004",
                        "subject_name_th": "วิชา 4",
                        "subject_name_en": "Subject 4",
                        "credit": 3,
                        "pre_subject": ["00000003"],
                        "co_subject": [],
                        "grouping_data": "2/1"
                    }
                ]
            }
        }
    };

    const genEdList = []
    for (let group in verification.genEd) {
    genEdList.push({
        group_name: group,
        credit_curr: parseInt(verification.genEd[group].credit_curr),
        credit_require: parseInt(verification.genEd[group].credit_require),
        subject_list: verification.genEd[group].subject_list
    })
    }

    // console.log(data);

    return (
        <div className={prompt.className}>
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
                >login</div>
                </div>
            </div>
            
            <div style={{color: 'black'}}>
                <KuVViz
                course = {exmData.course}
                stdGrade={exmData.std}
                stdEnroll={exmData.enroll}
                />
                {/* <GenEDTable genEdList={exmData.genEd} /> */}
            </div>

            <div className="genEd_container"
            style={{
            marginTop: (verification.status)? '0': '30px' 
            }}>
            <GenEDTable genEdList={genEdList} />
            </div>
        </div>
    )
}