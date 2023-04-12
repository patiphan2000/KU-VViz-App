import '@/styles/globals.css'
import Layout from '@/components/layout';

// import Context for course data
import {CourseDataProvider} from '../contexts/DataContext'

// import Font Awesome CSS
import "@fortawesome/fontawesome-svg-core/styles.css"; 
import { config } from "@fortawesome/fontawesome-svg-core";
// Tell Font Awesome to skip adding the CSS automatically 
// since it's already imported above
config.autoAddCss = false; 

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <CourseDataProvider>
        <Component {...pageProps} />
      </CourseDataProvider>
    </Layout>
  )
}
