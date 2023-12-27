"use client"
import { useEffect, useState } from 'react'
import Image from 'next/image'
import JSConfetti from 'js-confetti'

export default function Home() {

	const [days, setDays] = useState(0)
	const [hours, setHours] = useState(0)
	const [minutes, setMinutes] = useState(0)
	const [seconds, setSeconds] = useState(0)
	const [isToday, setIsToday] = useState(false)

	

	const checkToday = () => {
		const target = new Date("12/31/2023 20:00:00").toDateString()
		const today = new Date().toDateString()
		if(target == today) setIsToday(true)
		// setIsToday(true)
		
	}

	useEffect(() => {
		const jsconfetti = new JSConfetti()
		checkToday()
		const interval = setInterval(() => {
			if(isToday) jsconfetti.addConfetti()
		},1000)
		
	}, [isToday])

	useEffect(() => {
		const target = new Date("12/31/2023 20:00:00")


		const interval = setInterval(() => {	

			const now = new Date()
			const difference = target.getTime() - now.getTime()

			const d = Math.floor(difference / (1000 * 60 * 60 * 24))
			setDays(d)

			const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
			setHours(h)

			const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
			setMinutes(m)

			const s = Math.floor((difference % (1000 * 60)) / 1000)
			setSeconds(s)
		}, 1000)

		return () => clearInterval(interval)
	}, [])
	return (
		<main className='h-screen flex flex-col items-center justify-center bg-amber-50'>
			<canvas id="canvas"></canvas>
				<Image 
				className='absolute top-[22%]'
				src='/logo-anonovo.png'
				width={300}
      			height={500}
				alt=''/>
			<div className='mt-10 w-4/5 h-24 bg-amber-100 rounded-lg flex justify-center gap-2 items-center px-3'>
					<div className=' bg-[#ad8a59] w-1/4 h-3/4 flex flex-col items-center justify-center rounded-md'>
					<p className='text-3xl font-bold text-amber-100'>{days}</p>
					<p className='text-xs font-semibold text-amber-100'>Dias</p>
				</div>
					<div className=' bg-[#ad8a59] w-1/4 h-3/4 flex flex-col items-center justify-center rounded-md'>
					<p className='text-3xl font-bold text-amber-100'>{hours}</p>
					<p className='text-xs font-semibold text-amber-100'>Horas</p>
				</div>
					<div className=' bg-[#ad8a59] w-1/4 h-3/4 flex flex-col items-center justify-center rounded-md'>
					<p className='text-3xl font-bold text-amber-100'>{minutes}</p>
					<p className='text-xs font-semibold text-amber-100'>Minutos</p>
				</div>
					<div className=' bg-[#ad8a59] w-1/4 h-3/4 flex flex-col items-center justify-center rounded-md'>
					<p className='text-3xl font-bold text-amber-100'>{seconds}</p>
					<p className='text-xs font-semibold text-amber-100'>Segundos</p>
				</div>
			</div>
		</main>
		)
	}
