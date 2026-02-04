import Router from './Router.jsx'


function App() {
  return (
    <>
        <header>
            <h1>Instagram</h1>
        </header>
        <nav>
            <ul>
                <li><a href={"/"}>Strona główna</a></li>
                <li><a href={"/wpis"}>Wpisy</a></li>
                <li> <a href={"/kategorie"}>Kategorie</a></li>
            </ul>
       </nav>
        <main>
            <Router/>
        </main>

    </>
  )
}

export default App
