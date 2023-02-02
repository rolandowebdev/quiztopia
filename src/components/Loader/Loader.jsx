import { Oval } from 'react-loader-spinner'

export const Loader = ({ height, width, loaderColor = '#fff' }) => (
  <div className="flex items-center justify-center gap-4">
    <Oval height={height} width={width} color={loaderColor} secondaryColor={loaderColor} />
  </div>
)
