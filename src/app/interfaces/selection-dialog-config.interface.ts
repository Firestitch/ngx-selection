import { Observable } from 'rxjs';
import { SelectionActionType } from '../classes/selection-action-type.enum';

export interface FsSelectionDialogConfig {
  allCount?: number;
  selectedCount?: number;
  selectAll?: boolean;
  actions?: FsSelectionDialogConfigAction[];
}

export type FsSelectionDialogConfigValuesFn = () =>
  FsSelectionDialogConfigActionValue[] |
  Observable<FsSelectionDialogConfigActionValue[]>;

export interface FsSelectionDialogConfigAction {
  tooltip?: string;
  name?: string;
  label?: string;
  type?: SelectionActionType,
  values?: FsSelectionDialogConfigValuesFn | ReturnType<FsSelectionDialogConfigValuesFn>;
}

export interface FsSelectionDialogConfigActionValue {
  name: string;
  value: string;
}

export interface FsSelectionDialogActionSelected {
  value: any;
  action: FsSelectionDialogConfigAction;
  all: boolean;
}
