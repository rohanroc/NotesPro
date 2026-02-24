import { useRef } from "react"
import Cards from "./Cards"


const Foreground = () => {
    const ref = useRef(null);
    return (
        <div ref={ref} className='fixed top-0 left-0 z-40 w-full h-full'>
            <Cards reference={ref} />
        </div>
    )
}

export default Foreground
