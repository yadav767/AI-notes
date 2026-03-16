import { useEffect } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser } from '../services/api'
import { motion } from "motion/react"


const PaymentSuccess = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {

        getUser(dispatch)

        const t = setTimeout(() => {
            navigate("/")
        }, 5000)
        return () => clearTimeout(t)
    }, [])

    return (
        <div className='min-h-screen flex flex-col items-center justify-center p-4 gap-4 '>
            <motion.div
                initial={{ scale: 0, rotate: -100 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className='text-green-500 text-6xl'
            >
                <IoMdCheckmarkCircleOutline />
            </motion.div>
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold text-green-600"
            >
                Payment Successfull Credits Added
            </motion.h1>
            <p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0 }}
                transition={{ delay: 0.6 }}
                className="text-gray-500 text-sm"
            >
                Redirecting to home...
            </p>
        </div>
    )
}

export default PaymentSuccess