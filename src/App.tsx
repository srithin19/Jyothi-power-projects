import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import { Layout } from './components/layout/layout'
import { HomePage } from './pages/home-page'

const CategoryPage = lazy(() =>
  import('./pages/category-page').then((m) => ({ default: m.CategoryPage })),
)

/*
  Keyed by slug so moving between two category pages remounts the component.

  Without this, React reuses the same instance when only the route param
  changes, so the page's one-shot entrance and reveal animations never re-run.
  The new photographs would render under the global
  `.js-reveal-ready [data-reveal] { opacity: 0 }` rule with nothing left to
  animate them in, and the gallery came up blank.
*/
function CategoryRoute() {
  const { slug } = useParams()
  return <CategoryPage key={slug} />
}

/*
  BrowserRouter rather than HashRouter: the in-page navigation already uses hash
  anchors (#services, #contact) for scrolling, and a hash router would fight
  them for the same part of the URL.

  Deploying to GitHub Pages under a repo subpath needs two things, both handled:
  basename picks up Vite's BASE_URL, and the build copies index.html to 404.html
  so a deep link like /work/high-mast-lights is served the app rather than a
  Pages 404.
*/
export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Layout>
        <Suspense fallback={<div className="min-h-screen" aria-hidden />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/work/:slug" element={<CategoryRoute />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  )
}
