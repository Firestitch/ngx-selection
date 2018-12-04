export interface SelectionDialogConfig {
  allCount?: number;
  selectedCount?: number;
  actions?: SelectionDialogConfigAction[];
}

export interface SelectionDialogConfigAction {
  tooltip?: string;
  value?: string;
  icon?: string;
  options?: (SelectionDialogConfigActionOption | SelectionDialogConfigActionOptionMenu)[];
}

export interface SelectionDialogConfigActionOption {
  name: string;
  value: string;
}

export interface SelectionDialogConfigActionOptionMenu {
  name: string;
  options: SelectionDialogConfigActionOption[];
}

export interface SelectionDialogActionCallbackParams {
  name: string;
  value: any;
  all: boolean;
}
