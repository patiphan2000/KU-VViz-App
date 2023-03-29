import { useContext, useState } from 'react'
import {CourseDataContext} from '../../contexts/DataContext'

import { useRouter } from 'next/router'
import Image from 'next/image'
import axios from 'axios'

import { encodeString } from './encoder'

import {Prompt} from 'next/font/google' 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'

import styles from './login.module.css'

const baseURL = process.env.BASE_URL;

const prompt = Prompt({
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
  })

export default function LoginPage() {

    const {data, setData} = useContext(CourseDataContext)
    const setCourseData = (data) => {
        setData(data);
    }

    const [isLoading, setIsLoading] = useState(false)

    const [usr, setUsr] = useState('');
    const [pwd, setPwd] = useState('');
    const [isShowPwd, setIsShowPwd] = useState(false);

    let router= useRouter()
    // condition base redirecting
    const redirect = () => {
        router.push('/')
    }

    const submit = async () => {

        setIsLoading(true);

        console.log("submit");
        const username = usr;
        const password = pwd;
        // console.log(username, password);
        const encrypUsr = encodeString(username);
        const encrypPwd = encodeString(password);

        console.log("loading");

        // fetch data
        try {
            await axios({
                method: 'post',
                url: baseURL + '/get-all',
                headers: {}, 
                data: {
                    "username": encrypUsr,
                    "password": encrypPwd
                }
              }).then(res => {
                setCourseData({
                    'course': res.data.program_data,
                    'stdGrade': res.data.grades,
                    'stdEnroll': res.data.enroll
                })
            });
        }
        catch {

        }
        redirect();
        setIsLoading(false);
        // setTimeout(()=>{setIsLoading(false);}, 1000);
    }

    return (
        <div className={prompt.className}>
            <div className={(isLoading)? `${styles.global_loader}`:`${styles.global_loader} ${styles.hide}`}>
                <Image className={styles.loader} alt="loading" src="/loading_icon.png" width="250" height="200"/>
            </div>
            <div className={styles.login_container}>
                <div className={styles.login_form}>
                    <Image alt="logo" src="/KU-VViz logo.png" width="250" height={250/(16/9)}/>
                    {/* <h1>KU-VViz</h1> */}
                    <p style={{fontSize: '1.5em'}}>Login</p>
                    <div style={{minWidth: '260px'}}></div>

                    <div className={styles.label_left}>Nontri Account</div>
                    
                    <div className={styles.input_container}>
                        <input 
                        type="text" id="username" name="username" 
                        placeholder='username'
                        className={styles.input_field}
                        onChange = {(e) => {setUsr(e.currentTarget.value)}}
                        />
                    </div>

                    <div className={styles.label_left}>Password</div>
                    
                    <div className={styles.input_container}>
                        <FontAwesomeIcon 
                            icon={faEye} 
                            className={(isShowPwd)? styles.hide:styles.show}
                            onClick = {() => {setIsShowPwd(true)}}
                        />
                        <FontAwesomeIcon 
                            icon={faEyeSlash} 
                            className={(isShowPwd)? styles.show:styles.hide}
                            onClick = {() => {setIsShowPwd(false)}}
                        />
                        <input 
                        type={(isShowPwd)? "text":"password"} id="password" name="password" 
                        placeholder='password'
                        className={styles.input_field}
                        onChange = {(e) => {setPwd(e.currentTarget.value)}}
                        />
                    </div>
                    
                    <div style={{width: '100%', marginTop: '1em'}}>
                        <button 
                        className={`${styles.btn} ${styles.btn_main} ${styles.btn_fullwidth}`} 
                        onClick={() => {
                            submit();
                        }}
                        >
                            Login
                        </button>
                    </div> 
                </div>
            </div>
        </div>
    )
}