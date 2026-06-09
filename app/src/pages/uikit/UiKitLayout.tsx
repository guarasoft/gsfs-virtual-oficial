import { Outlet } from 'react-router-dom'
import ReviewBar from '../../components/ReviewBar'
import Sidebar from './Sidebar'
import './uikit.css'

export default function UiKitLayout() {
  return (
    <div className="brand-dark kit-root">
      <ReviewBar crumb="UI Kit · Fase 2" />
      <div className="kit-body">
        <Sidebar />
        <main className="kit-detail">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
