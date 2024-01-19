import React, { useState } from "react"
import {square} from "@local/shared-lib"

const Remote = React.lazy(
    // @ts-ignore
    ()=>import("remote1/app")
)

export function App() {
    const [count, setCount] = useState(0)
    return (
        <div>
            <button onClick={()=>setCount(count+1)}>Shell Button {count} {square(count)}</button>
            <p>Hello from shell</p>
            <React.Suspense fallback={<h1>Remote loading</h1>}>
                <Remote />
            </React.Suspense>
        </div>
    )
}