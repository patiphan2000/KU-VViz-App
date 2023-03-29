import '@/styles/globals.css'
import {CourseDataProvider} from '../contexts/DataContext'

export default function App({ Component, pageProps }) {
  return (
    <CourseDataProvider>
      <Component {...pageProps} />
    </CourseDataProvider>
  )
}
