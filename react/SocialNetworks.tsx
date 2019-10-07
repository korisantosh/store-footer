import React, { Fragment } from 'react'
import { IOMessage } from 'vtex.native-types'
import { useCssHandles } from 'vtex.css-handles'

import SocialNetwork from './components/SocialNetwork'

interface SocialNetworkData {
  url: string
  name: string
}

interface Props {
  title?: string
  socialNetworks: SocialNetworkData[]
  showInColor: boolean
}

const CSS_HANDLES = ['socialNetworksTitle', 'socialNetworksContainer']

const SocialNetworks: StorefrontFunctionComponent<Props> = ({
  title,
  socialNetworks = [],
}) => {
  const handles = useCssHandles(CSS_HANDLES)

  return (
    <Fragment>
      {title && (
        <div className={`${handles.socialNetworksTitle} mb4`}>
          <IOMessage id={title} />
        </div>
      )}
      <div className={`${handles.socialNetworksContainer} nh2 flex`}>
        {socialNetworks.map(socialNetworkData => (
          <SocialNetwork
            key={socialNetworkData.name + socialNetworkData.url}
            {...socialNetworkData}
          />
        ))}
      </div>
    </Fragment>
  )
}

SocialNetworks.schema = {
  title: 'admin/editor.footer.socialNetworks.title',
  description: 'admin/editor.footer.socialNetworks.description',
  type: 'object',
  properties: {
    showInColor: {
      default: false,
      isLayout: true,
      title: 'admin/editor.footer.showSocialNetworksInColor.title',
      type: 'boolean',
    },
  },
}

export default SocialNetworks
