export interface BulkDialogConfig {
  allCount?: number,
  actions?: Array<BulkDialogConfigAction>
}

export interface BulkDialogConfigAction {
  tooltip?: string,
  value?: string,
  icon?: string,
  options?: Array<BulkDialogConfigActionOption | BulkDialogConfigActionOptionMenu>
}

export interface BulkDialogConfigActionOption {
  name: string,
  value: string
}

export interface BulkDialogConfigActionOptionMenu {
  name: string,
  options: Array<BulkDialogConfigActionOption>
}
