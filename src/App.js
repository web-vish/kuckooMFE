import React from 'react';
import './App.scss';

function App() {
  const PostsComponent = React.lazy(() =>
    import("PostExposeComponent/PostExposeComponent")
  )
  const Products = React.lazy(() =>
    import("ProductList/ProductList")
  )
  const UserList = React.lazy(() =>
    import("UserComponent/UserList")
  )

  const NotifyComponent = React.lazy(() => import("NotifyComponent/NotifyComponent"))
  return (
    <div>
      <header>
        <h1>Kuckoo</h1>
        <div>
          <React.Suspense fallback="Loading...">
            <NotifyComponent />
          </React.Suspense>
        </div>
      </header>
      <main>
        <section>
          {PostsComponent &&
            <React.Suspense fallback="Loading...">
              <PostsComponent />
            </React.Suspense>
          }
        </section>
        <section>
          <React.Suspense fallback="Loading...">
            <Products />
          </React.Suspense>
        </section>
      </main>
      <footer>
        <React.Suspense fallback="Loading...">
          <UserList />
        </React.Suspense >
      </footer>
    </div>
  );
}

export default App;
