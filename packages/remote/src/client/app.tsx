import React, { useState } from "react"
import {square} from "@local/shared-lib"
export default ()=>{
    const [count, setCount] = useState(0)
    return (
        <div>
            <button onClick={()=>setCount(count+1)}>remote count {count} {square(count)}</button>
            Hello from remote
        </div>
    )
}