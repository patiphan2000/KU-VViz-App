import { useContext, useState } from 'react'
import {CourseDataContext} from '../../contexts/DataContext'

import { useRouter } from 'next/router'
import axios from 'axios'

import { encodeString } from './encoder'

import {Prompt} from 'next/font/google' 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'

import styles from './login.module.css'

const prompt = Prompt({
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
  })

export default function LoginPage() {

    const {data, setData} = useContext(CourseDataContext)

    const [usr, setUsr] = useState('');
    const [pwd, setPwd] = useState('');
    const [isShowPwd, setIsShowPwd] = useState(false);

    let router= useRouter()
    // condition base redirecting
    const redirect = () => {
        router.push('/')
    }

    const submit = () => {
        console.log("submit");
        const username = usr;
        const password = pwd;
        const encrypPwd = encodeString(password.toString("base64"));

        // fetch data
        axios.post('');

        redirect();
    }

    return (
        <div className={prompt.className}>
            <div className={styles.login_container}>
                <div className={styles.login_form}>
                    <h1>KU-VViz</h1>
                    <p style={{fontSize: '1.5em'}}>Login</p>
                    <div style={{minWidth: '260px'}}></div>

                    <div className={styles.label_left}>Nontri Account</div>
                    
                    <div className={styles.input_container}>
                        <input 
                        type="text" id="username" name="username" 
                        placeholder='username'
                        className={styles.input_field}
                        onChange = {(e) => {setPwd(e.currentTarget.value)}}
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