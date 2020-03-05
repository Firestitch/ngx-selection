import { Observable } from 'rxjs';
import { SelectionActionType } from '../classes/selection-action-type.enum';

export interface FsSelectionDialogConfig {
  allCount?: number;
  selectedCount?: number;
  selectAll?: boolean;
  actions?: FsSelectionDialogConfigAction[];
}

export interface FsSelectionDialogConfigAction {
  tooltip?: string;
  value?: string;
  label?: string;
  type?: SelectionActionType,
  options?: FsSelectionDialogConfigActionOption[] |
            FsSelectionDialogConfigActionOptionMenu[] |
            Observable<FsSelectionDialogConfigActionOption[]>;
}

export interface FsSelectionDialogConfigActionOption {
  name: string;
  value: string;
}

export interface FsSelectionDialogConfigActionOptionMenu {
  name: string;
  options: FsSelectionDialogConfigActionOption[];
}

export interface FsSelectionDialogActionSelected {
  value: any;
  action: FsSelectionDialogConfigAction;
  all: boolean;
}
