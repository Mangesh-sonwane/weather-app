import Card from './Components/Card';
function App() {
  return (
    <>
      <div className=''>
        <div className='App bg-gradient-to-r from-red-500 to-orange-500'>
          <div className='flex flex-col h-screen  '>
            <header className=' flex gap-10 justify-between items-center text-2xl sm:text-3xl font-semibold p-2 px-10'>
              <h1>
                <span className='text-indigo-100 bg-slate-800/40 p-5 rounded-lg shadow-2xl'>
                  Weather App
                </span>
              </h1>
            </header>
            <Card />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
