import React from "react"

const Remote = React.lazy(
    // @ts-ignore
    ()=>import("remote1/app")
)

export function App() {
    return (
        <div>
            <p>Hello from shell</p>
            <React.Suspense fallback={<h1>Remote loading</h1>}>
                <Remote />
            </React.Suspense>
        </div>
    )
}