import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from './AppLayout'

const Dashboard = () => import('@/features/game/pages/DashboardPage')
const Wallet = () => import('@/features/wallet/pages/WalletPage')
const Tournament = () => import('@/features/tournament/pages/TournamentPage')
const Login = () => import('@/features/auth/pages/LoginPage')
const Celebration = () => import('@/features/game/pages/CelebrationPage')
const Shop = () => import('@/features/game/pages/ShopPage')

import { lazy, Suspense } from 'react'
import { PageLoader } from '@/shared/components/PageLoader'

function lazyPage(loader: () => Promise<{ default: React.ComponentType }>) {
  const Page = lazy(loader)
  return (
    <Suspense fallback={<PageLoader />}>
      <Page />
    </Suspense>
  )
}

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/login" replace /> },
  { path: '/login', element: lazyPage(Login) },
  { path: '/celebracion', element: lazyPage(Celebration) },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: 'reino', element: lazyPage(Dashboard) },
      { path: 'tesoro', element: lazyPage(Wallet) },
      { path: 'torneo', element: lazyPage(Tournament) },
      { path: 'tienda', element: lazyPage(Shop) },
    ],
  },
])
