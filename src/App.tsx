import { Layout } from "@/components/common/Layout"
import SettingPage from "@/pages/SettingPage"
import { Global } from "@emotion/react"
import { globalStyles } from "./globalStyles"
import ReviewPage from "@/pages/ReviewPage"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Global styles={globalStyles} />
        <Routes>
          <Route path="/" element={<SettingPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}



export default App
