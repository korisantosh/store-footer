import React from 'react'
import { useIntl } from 'react-intl'
import { formatIOMessage } from 'vtex.native-types'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'

import facebook from '../images/facebook.svg'
import facebookBw from '../images/facebook-bw.svg'
import instagram from '../images/instagram.svg'
import instagramBw from '../images/instagram-bw.svg'
import linkedin from '../images/linkedin.svg'
import linkedinBw from '../images/linkedin-bw.svg'
import pinterest from '../images/pinterest.svg'
import pinterestBw from '../images/pinterest-bw.svg'
import twitter from '../images/twitter.svg'
import twitterBw from '../images/twitter-bw.svg'
import youtube from '../images/youtube.svg'
import youtubeBw from '../images/youtube-bw.svg'

interface SocialNetworkProps {
  showInColor: boolean
  url: string
  name: string
}

const CSS_HANDLES = ['socialNetworkLink', 'socialNetworkImage'] as const

const SOCIAL_NETWORK_ICONS = {
  facebook,
  'facebook-bw': facebookBw,
  instagram,
  'instagram-bw': instagramBw,
  linkedin,
  'linkedin-bw': linkedinBw,
  pinterest,
  'pinterest-bw': pinterestBw,
  twitter,
  'twitter-bw': twitterBw,
  youtube,
  'youtube-bw': youtubeBw,
}

const getImagePathFromProps = ({ name, showInColor }: Pick<SocialNetworkProps, 'name' | 'showInColor'>) =>
  `${name.toLowerCase()}${showInColor ? '' : '-bw'}`

  function isValidIcon (key: string): key is keyof typeof SOCIAL_NETWORK_ICONS {
    return key in SOCIAL_NETWORK_ICONS
  }

/**
 * Shows an image for an specific social network
 */
const SocialNetwork: React.FC<SocialNetworkProps> = ({
  name,
  showInColor,
  url,
}) => {
  const intl = useIntl()
  const handles = useCssHandles(CSS_HANDLES)

  const normalizedName = String(name).toLowerCase()
  const imagePath = getImagePathFromProps({ name: normalizedName, showInColor })

  if (!isValidIcon(imagePath)) {
    return null
  }

  const imageSrc = SOCIAL_NETWORK_ICONS[imagePath]

  return (
    <a
      href={formatIOMessage({ id: url, intl })}
      target="_blank"
      rel="noopener noreferrer"
      className={`${handles.socialNetworkLink} ${applyModifiers(
        handles.socialNetworkLink,
        normalizedName
      )} c-muted-1 w2 h2 mh2 flex items-center`}
    >
      <img
        className={`${handles.socialNetworkImage} ${applyModifiers(
          handles.socialNetworkImage,
          normalizedName
        )}`}
        src={imageSrc}
        alt={formatIOMessage({ id: name, intl })}
        title={formatIOMessage({ id: name, intl })}
      />
    </a>
  )
}

SocialNetwork.displayName = 'SocialNetwork'


export default SocialNetwork
