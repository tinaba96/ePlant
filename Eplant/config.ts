import React from 'react'
import { type View } from './View'

export type EplantConfig = {
  readonly genericViews: View[]
  readonly userViews: View[]
  readonly views: View[]
  readonly tabHeight: number
  readonly rootPath: string

  readonly defaultSpecies: string
  readonly defaultView: string
}

export const Config = React.createContext<EplantConfig>({
  genericViews: [],
  userViews: [],
  views: [],
  tabHeight: 48,
  rootPath: '',

  defaultSpecies: '',
  defaultView: '',
})

export const useConfig = () => React.useContext(Config)
