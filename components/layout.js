import Footer from "@/layouts/Footer"

export default function Layout({ children }) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <main>{children}</main>


        {/* <Footer /> */}
      </div>
    )
  }