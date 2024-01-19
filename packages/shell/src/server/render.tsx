import React from "react"
import { renderToPipeableStream } from "react-dom/server";
import type { NextFunction, Request, Response } from "express"
import { App } from "../client/app";
export function render(request: Request, response: Response, next: NextFunction) {
    const { pipe } = renderToPipeableStream(<html>
        <head>
            {/* <script crossOrigin="" src="https://unpkg.com/react@18/umd/react.development.js"></script>
            <script crossOrigin="" src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script> */}
            <script src="/client/main.js"></script>
        </head>
        <div id="shell">
            <App />
        </div>
    </html>,

        {
            onShellError() {
                response.status(400)
                response.setHeader("context-type", "text/html")
                response.send("Error")
            },
            onAllReady() {
                response.setHeader("context-type", "text/html")
                pipe(response)
            }
        }

    )
}