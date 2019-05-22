import { SelectionActionType } from '../classes/selection-action-type.enum';
import { Observable } from 'rxjs';

export interface SelectionDialogConfig {
  allCount?: number;
  selectedCount?: number;
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
