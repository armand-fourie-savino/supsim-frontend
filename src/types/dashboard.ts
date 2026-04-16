export type Severity = 'danger' | 'warning' | 'success' | 'secondary'
export type TrendDirection = 'up' | 'down' | 'flat'

export interface TileTag {
  label: string
  severity: Severity
}

export interface TileTrend {
  direction: TrendDirection
  text: string
}

export interface TileFooterItem {
  label: string
  value: string | number
}
