import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
    return (
        <div className={styles.footer}>
            <Link className={styles.icon_link} target="_blank" href="https://github.com/patiphan2000/KU-VViz-App">
                <FontAwesomeIcon 
                    icon={faGithub} 
                    style={{
                        fontSize: '1.5em', 
                        marginBottom: '20px'
                    }}
                />
            </Link>
            <div style={{fontSize: '0.9em'}}>
                {'เว็บไซต์นี้เป็นส่วนหนึ่งของโครงงานวิชา 01219499 Innovative Software Group Project'}
            </div>
            <div></div>
            <div></div>
        </div>
        // <div style={{fontFamily: 'Prompt', fontSize: '0.9em', textAlign: 'center'}}>
        // {'เว็บไซต์นี้เป็นส่วนหนึ่งของโครงงานวิชา 01219499 Innovative Software Group Project'}
        // </div>
    )
}