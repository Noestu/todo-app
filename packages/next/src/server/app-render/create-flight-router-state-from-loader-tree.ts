import { LoaderTree } from '../lib/app-dir-module'
import { FlightRouterState, Segment } from './types'
import { GetDynamicParamFromSegment } from './index'
import { PAGE_SEGMENT_KEY } from '../../shared/lib/constants'

export function addSearchParamsIfPageSegment(
  segment: Segment,
  searchParams: any
) {
  const isPageSegment = segment === PAGE_SEGMENT_KEY

  if (isPageSegment) {
    const stringifiedQuery = JSON.stringify(searchParams)
    return stringifiedQuery !== '{}'
      ? segment + '?' + stringifiedQuery
      : segment
  }

  return segment
}

export function createFlightRouterStateFromLoaderTree(
  [segment, parallelRoutes, { layout }]: LoaderTree,
  getDynamicParamFromSegment: GetDynamicParamFromSegment,
  searchParams: any,
  rootLayoutIncluded = false
): FlightRouterState {
  const dynamicParam = getDynamicParamFromSegment(segment)
  const treeSegment = dynamicParam ? dynamicParam.treeSegment : segment

  const segmentTree: FlightRouterState = [
    addSearchParamsIfPageSegment(treeSegment, searchParams),
    {},
  ]

  if (!rootLayoutIncluded && typeof layout !== 'undefined') {
    rootLayoutIncluded = true
    segmentTree[4] = true
  }

  segmentTree[1] = Object.keys(parallelRoutes).reduce(
    (existingValue, currentValue) => {
      existingValue[currentValue] = createFlightRouterStateFromLoaderTree(
        parallelRoutes[currentValue],
        getDynamicParamFromSegment,
        searchParams,
        rootLayoutIncluded
      )
      return existingValue
    },
    {} as FlightRouterState[1]
  )

  return segmentTree
}
