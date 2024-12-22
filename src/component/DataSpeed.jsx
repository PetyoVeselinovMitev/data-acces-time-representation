import { useEffect, useRef, useState } from 'react'
import './DataSpeed.css'

export default function DataSpeed() {
    const [value, setValue] = useState(100000000)
    const [l1cache, setL1cache] = useState(1)
    const [l2cache, setL2cache] = useState(4)
    const [l3cache, setL3cache] = useState(40)
    const [ram, setRam] = useState(80)
    const [isSliding, setIsSliding] = useState(false)
    const slideTimeout = useRef(null)

    const handleChange = (event) => {
        const newValue = parseInt(event.target.value, 10)
        setValue(newValue)
        setIsSliding(true)

        if (slideTimeout.current) {
            clearTimeout(slideTimeout.current)
        }

        slideTimeout.current = setTimeout(() => {
            setIsSliding(false)
        }, 300)
    }

    useEffect(() => {
        setL1cache((value / 1000000) * 1)
        setL2cache((value / 1000000) * 4)
        setL3cache((value / 1000000) * 40)
        setRam((value / 1000000) * 80)
    }, [value])

    return (
        <>
            <div className="dataSpeedContainer">
                <h2>Data access times</h2>
                <input
                    type="range"
                    min="100000000"
                    max="1000000000"
                    step="10000000"
                    value={value}
                    onChange={handleChange}
                />
                <p>{value.toLocaleString()} times slower than real time</p>
                <div className='animationCointainer'>
                    <div className='CPU'>
                        <h2>CPU</h2>
                    </div>
                    <div className='dotsContainer'>
                        <div className='dotBox'>
                            <div className='dotl1' style={{
                                animation: isSliding
                                    ? 'none'
                                    : ` moveDots ${l1cache}ms infinite linear`
                            }}></div>
                        </div>
                        <div className='dotBox'>
                            <div className='dotl2' style={{
                                animation: isSliding
                                    ? 'none'
                                    : ` moveDots ${l2cache}ms infinite linear`
                            }}></div>
                        </div>
                        <div className='dotBox'>
                            <div className='dotl3' style={{
                                animation: isSliding
                                    ? 'none'
                                    : ` moveDots ${l3cache}ms infinite linear`
                            }}></div>
                        </div>
                        <div className='dotBox'>
                            <div className='ram' style={{
                                animation: isSliding
                                    ? 'none'
                                    : ` moveDots ${ram}ms infinite linear`
                            }}></div>
                        </div>
                    </div>
                    <div className='componentsContainer'>
                        <h2>{'L1 cache (1ns)'}</h2>
                        <h2>{'L2 cache (4ns)'}</h2>
                        <h2>{'L3 cache (40ns)'}</h2>
                        <h2>{'RAM (80ns)'}</h2>
                    </div>
                </div>
            </div>
        </>

    )
}