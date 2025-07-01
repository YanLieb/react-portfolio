function App() {
  return (
    <div className="home h-screen container flex flex-col justify-between">
      <div className='flex flex-col h-100 self-center flex-1 justify-center text-center'>
        <h1>Yannick Liebnau</h1>
        <h2 className="mb-3">Web Developer</h2>
        <p>NodeJS/React</p>
        <p>Based in Lyon, France</p>
      </div>
      <ul className="self-end text-right">
        <li>Projects</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </div>
  )
}

export default App
