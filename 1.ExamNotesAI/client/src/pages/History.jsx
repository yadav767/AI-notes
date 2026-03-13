import axios from 'axios'
import { useState } from 'react'
import { serverUrl } from '../App'
import { useEffect } from 'react'
import { AnimatePresence, motion } from "motion/react"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { GiHamburgerMenu } from "react-icons/gi";


const History = () => {
  const navigate = useNavigate()
  const { userData } = useSelector((state) => state.user)
  const credits = userData.credits
  const [topics, setTopics] = useState([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)


  useEffect(() => {
    const myNotes = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/notes/getnotes`, { withCredentials: true })
        console.log(response);
        setTopics(Array.isArray(response.data) ? response.data : [])
      } catch (error) {

      }
    }
    myNotes()
  }, [])

  useEffect(()=>{
    if(window.innerWidth>=1024 ){
      setIsSidebarOpen(true)
    }
  },[])

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4 py-6'>

      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='mb-10 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 px-6 py-4 items-center flex justify-between md:items-center gap-4 flex-wrap shadow-[0_20px_45px_rgba(0,0,0,0.6)]'
      >

        <div onClick={() => navigate("/")} className="cursor-pointer">
          <h1 className='text-2xl font-bold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent'>
            ExamNotes AI
          </h1>
          <p className='text-sm text-gray-300 mt-1'>
            AI Powered exam-oriented notes & revision
          </p>
        </div>


        <div className=" mt-2 flex-wrap flex items-center gap-4 ">

          {!isSidebarOpen && <button onClick={() => setIsSidebarOpen(true)} className='lg:hidden text-white text-2xl '>
            <GiHamburgerMenu />
          </button>       }

          <button
            onClick={() => navigate("/pricing")}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm">
            <span className='text-xl '>💎</span>
            <span>{credits}</span>
            <motion.span
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.97 }}
              className='ml-2 h-5 w-5 flex items-center justify-center rounded-full bg-white text-xs font-bold'
              onClick={() => { setShowCredits(!showCredits); setShowProfile(false) }}
            >
              ➕
            </motion.span>
          </button>


        </div>

      </motion.header>

      <div className='grid grid-cols-1 gap-5 lg:grid-cols-4'>
        <AnimatePresence>
          {isSidebarOpen && <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className='fixed lg:static top-0 left-0 z-50 lg:z-auto w-72 lg:w-auto h-full lg:h-[75vh] lg:col-span-1 bg-black/90 lg:bg-black/80 lg:rounded-3xl   border-blur-xl border border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.6)] p-5 overflow-y-auto '
          >
            <button onClick={() => setIsSidebarOpen(false)} className='lg:hidden text-white mb-3 '>
              ⬅️ back
            </button>

            <div onClick={()=>navigate("/notes")} className='mb-3  space-y-1'>
                <button className='w-full px-3 py-2 rounded-lg text-sm text-gray-200 bg-white/10 hover:bg-white/20'>
                  ➕ New Notes
                </button>
            </div>
          </motion.div>}
        </AnimatePresence>
      </div>

    </div>
  )
}

export default History