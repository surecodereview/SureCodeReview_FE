import { Layout } from "@/components/common/Layout"
import SettingPage from "@/pages/SettingPage"
import { Global } from "@emotion/react"
import { globalStyles } from "./globalStyles"
import ReviewPage from "@/pages/ReviewPage"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { RecoilRoot } from "recoil"
import ChoosePage from "./pages/ChoosePage"

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Layout>
          <Global styles={globalStyles} />
          <Routes>
            <Route path="/" element={<ChoosePage />} />
            <Route path="/setting" element={<SettingPage />} />
            <Route path="/review" element={<ReviewPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </RecoilRoot>
    </BrowserRouter>
  )
}



export default App
