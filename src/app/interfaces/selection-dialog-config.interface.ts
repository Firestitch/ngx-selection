import { Observable } from 'rxjs';
import { SelectionActionType } from '../classes/selection-action-type.enum';

export interface SelectionDialogConfig {
  allCount?: number;
  selectedCount?: number;
  selectAll?: boolean;
  actions?: SelectionDialogConfigAction[];
}

export interface SelectionDialogConfigAction {
  tooltip?: string;
  value?: string;
  label?: string;
  type?: SelectionActionType,
  options?: SelectionDialogConfigActionOption[] |
            SelectionDialogConfigActionOptionMenu[] |
            Observable<SelectionDialogConfigActionOption[]>;
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
  label: string;
  value: any;
  all: boolean;
}
