export * from './createHistoryEnv'
export * from './parseQueries'
export * from './pushState'
export * from './replaceState'
export * from './types'

export * from '../common/addQueryParameters'
export * from '../common/pathJoin'

import { createHistoryEnv } from './createHistoryEnv'

// ALLOW Overriding Default HREF via node environment variables
const DEFAULT_HREF: string | undefined = process.env.TYPED_HISTORY_HREF || '/'

export const { history, location } = createHistoryEnv(DEFAULT_HREF)
