import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useRuntime } from 'vtex.render-runtime'

import { PLATFORM_GOCOMMERCE } from './modules/platformCode'
import gocommerce from './images/gocommerce.svg'
import gocommerceBw from './images/gocommerce-bw.svg'
import vtex from './images/vtex.svg'
import vtexBw from './images/vtex-bw.svg'

const POWERED_BY_ICONS = {
  gocommerce: gocommerce,
  'gocommerce-bw': gocommerceBw,
  vtex,
  'vtex-bw': vtexBw
}

const CSS_HANDLES = ['poweredBy', 'poweredByImage', 'poweredByLink']

function isValidIcon (key: string): key is keyof typeof POWERED_BY_ICONS {
  return key in POWERED_BY_ICONS
}

const getImagePathFromProps = (runtime: ReturnType<typeof useRuntime>, showInColor: boolean) =>
  `${runtime.platform}${showInColor ? '' : '-bw'}`

/**
 * "Powered By VTEX/GoCommerce" image component, used in Footer
 */
const PoweredBy: StorefrontFunctionComponent<PoweredByProps> = ({
  showInColor,
}) => {
  const handles = useCssHandles(CSS_HANDLES)
  const runtime = useRuntime()

  const imagePath = getImagePathFromProps(runtime, showInColor)

  if (!isValidIcon(imagePath)) {
    return null
  }

  const imageSrc = POWERED_BY_ICONS[imagePath]

  if (runtime.platform === PLATFORM_GOCOMMERCE) {
    return (
      <a
        href="https://www.gocommerce.com/?utm_source=store_footer"
        className={handles.poweredByLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className={`${handles.poweredBy} flex items-center w4`}>
          <img
            className={`${handles.poweredByImage} w-100`}
            src={imageSrc}
            alt="GoCommerce"
          />
        </div>
      </a>
    )
  }

  return (
    <div className={`${handles.poweredBy} flex items-center h3 w3`}>
      <img
        className={`${handles.poweredByImage} w-100`}
        src={imageSrc}
        alt="VTEX"
      />
    </div>
  )
}

interface PoweredByProps extends PoweredBySchema {
  logoUrl: string
  imageSrc: string
}

interface PoweredBySchema {
  showInColor: boolean
}

PoweredBy.displayName = 'PoweredBy'

export default PoweredBy
