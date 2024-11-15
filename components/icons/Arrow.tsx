import * as React from "react"
import { SVGProps } from "react"
const Arrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={158}
    height={116}
    fill="none"
    {...props}
  >
    <path
      stroke="#000"
      strokeDasharray="5.53 5.53"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={1.5}
      strokeOpacity={0.47}
      strokeWidth={2.763}
      d="M123.973 23.269c3.299 18.743.144 37.953-17.146 53.107-15.605 13.677-38.309 17.481-51.161-.467-6.085-8.496-5.563-21.555 5.406-27.88 12.22-7.045 22.408 5.906 22.77 13.472.848 17.672-17.005 35.436-43.22 37.666-31.044 2.64-29.761-20.945-29.562-20.888"
    />
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={1.5}
      strokeOpacity={0.47}
      strokeWidth={2.763}
      d="M147.131 35.688c-2.793-.406-5.049-1.616-7.386-2.738-7.671-3.683-14.329-9.45-16.486-16.144-.871 7.424-5.41 16.846-14.971 20.315"
    />
  </svg>
)
export default Arrow
