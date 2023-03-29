import { useContext, useState } from 'react'
import {CourseDataContext} from '../../contexts/DataContext'

import { useRouter } from 'next/router'
import axios from 'axios'

import { encodeString } from './encoder'

import {Prompt} from 'next/font/google' 

import styles from './login.module.css'

const prompt = Prompt({
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
  })

export default function LoginPage() {

    const {data, setData} = useContext(CourseDataContext)

    const [usr, setUsr] = useState('')
    const [pwd, setPwd] = useState('')

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
                    <div className={styles.label_left}>Nontri Account</div>
                    <div style={{minWidth: '260px'}}></div>
                    <input 
                    type="text" id="username" name="username" 
                    placeholder='username'
                    style = {{
                        width:"90%",
                        background:"#f5f5f5", 
                        border:"none", 
                        padding:"0.5rem",
                        borderRadius: '0.25rem'
                    }}
                    onChange = {(e) => {setPwd(e.currentTarget.value)}}
                    />
                    <div className={styles.label_left}>Password</div>
                    <input 
                    type="text" id="password" name="password" 
                    placeholder='password'
                    style = {{
                        width:"90%",
                        background:"#f5f5f5", 
                        border:"none", 
                        padding:"0.5rem",
                        borderRadius: '0.25rem'
                    }}
                    onChange = {(e) => {setPwd(e.currentTarget.value)}}
                    />
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