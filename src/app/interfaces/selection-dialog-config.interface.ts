import { Observable } from 'rxjs';
import { SelectionActionType } from '../classes/selection-action-type.enum';

export interface FsSelectionDialogConfig {
  allCount?: number;
  selectedCount?: number;
  selectAll?: boolean;
  actions?: FsSelectionDialogConfigAction[];
}

export type FsSelectionDialogConfigValuesFn = (data?: any) =>
  FsSelectionDialogConfigActionValue[] |
  Observable<FsSelectionDialogConfigActionValue[]>;

export interface FsSelectionDialogConfigAction {
  tooltip?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  type?: SelectionActionType,
  values?: FsSelectionDialogConfigValuesFn | ReturnType<FsSelectionDialogConfigValuesFn>;
}

export interface FsSelectionDialogConfigActionValue {
  name: string;
  value: string;
}

export interface FsSelectionActionSelected {
  value: any;
  name: string;
  action: FsSelectionDialogConfigAction;
  all: boolean;
}
