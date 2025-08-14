import reacrImg from './assets/react.svg'
import './App.css'
import gsap from "gsap"
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from "@studio-freight/lenis"
import { useEffect, useRef } from 'react'

function App() {
    const canvasRef = useRef(null)

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        const lenis = new Lenis()
        lenis.on("scroll", ScrollTrigger.update)
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000)
        })
        gsap.ticker.lagSmoothing(0)

        const canvas = canvasRef.current
        const context = canvas.getContext("2d")

        const setCanvasSize = () => {
            const pixelRatio = window.devicePixelRatio || 1
            canvas.width = window.innerWidth * pixelRatio
            canvas.height = window.innerHeight * pixelRatio
            canvas.style.width = window.innerWidth + "px"
            canvas.style.height = window.innerHeight + "px"
            context?.scale(pixelRatio, pixelRatio)
        }

        setCanvasSize()
        window.addEventListener('resize', setCanvasSize)

        const frameCount = 66
        const currentFrame = (index) => `./assets/${(index + 1).toString().padStart(2, '0')}.png`

        const images = []
        const videoFrames = { frame: 0 }
        let imagesToLoad = frameCount

        const onLoad = () => {
            imagesToLoad--
            if (imagesToLoad === 0) {
                console.log('All images loaded!')
                render()
                setupScrollTrigger()  // 在所有图片加载完后才初始化ScrollTrigger
            }
        }

        for (let i = 0; i < frameCount; i++) {
            const img = new Image()
            img.onload = onLoad
            img.onerror = onLoad
            img.src = currentFrame(i)
            images.push(img)
        }

        const render = () => {
            const canvasWidth = window.innerWidth
            const canvasHeight = window.innerHeight
            context?.clearRect(0, 0, canvasWidth, canvasHeight)

            const img = images[videoFrames.frame]

            if (img && img.complete && img.naturalWidth > 0) {
                const imageAspect = img.naturalWidth / img.naturalHeight
                const canvasAspect = canvasWidth / canvasHeight

                let drawWidth, drawHeight, drawX, drawY

                if (imageAspect > canvasAspect) {
                    drawHeight = canvasHeight
                    drawWidth = drawHeight * imageAspect
                    drawX = (canvasWidth - drawWidth) / 2
                    drawY = 0
                } else {
                    drawWidth = canvasWidth
                    drawHeight = drawWidth / imageAspect
                    drawX = 0
                    drawY = (canvasHeight - drawHeight) / 2
                }

                context?.drawImage(img, drawX, drawY, drawWidth, drawHeight)
            }
        }

        const setupScrollTrigger = () => {
            ScrollTrigger.create({
                trigger: '.hero',
                start: 'top top',
                end: () => `+=${canvas.height}`, // 动态设置结束位置为画布高度
                pin: true,
                pinSpacing: true,
                scrub: 1,
                onUpdate: (self) => {
                    const progress = self.progress;
                    const animationProgress = Math.min(progress / 0.9, 1);
                    const targetFrame = Math.round(animationProgress * (frameCount - 1));

                    if (videoFrames.frame !== targetFrame) {
                        videoFrames.frame = targetFrame;
                        render();
                    }
                }
            });
        }

        onLoad()  // 确保第一次加载就开始

    }, [])


    return (
        <>
            <nav>
                <div className='nav-links'>
                    <a href="#">Overview</a>
                    <a href="#">Solutions</a>
                    <a href="#">Resources</a>
                </div>
                <div className='logo'>
                    <a href="#"><img src={reacrImg} alt="" />FraNt1c</a>
                </div>
                <div className='nav-buttons'>
                    <div className='btn primary'><a href="#">Live Demo</a></div>
                    <div className='btn secondary'><a href="#">Get Start</a></div>
                </div>
            </nav>
            <section className='hero'>
                <canvas ref={canvasRef}></canvas>
                <div className="hero-content">
                    <div className='header'>
                        <h1>One one none jneon </h1>
                        <p>fsahfhafasf</p>
                        <div className='client-logos'>
                            <div className='client-logo'>
                                <img src={reacrImg} alt="" />
                            </div>
                            <div className='client-logo'>
                                <img src={reacrImg} alt="" />
                            </div>
                            <div className='client-logo'>
                                <img src={reacrImg} alt="" />
                            </div>
                            <div className='client-logo'>
                                <img src={reacrImg} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='hero-img-container'>
                    <div className="hero-img"><img src={reacrImg} alt="" /></div>
                </div>
            </section>
            <section className='outro'>
                <h1>sfsfsfsfsd</h1>
            </section>
        </>
    )
}

export default App
