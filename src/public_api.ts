/*
 * Public API Surface of fs-selection
 */

export { FsSelectionModule } from './app/fs-selection.module';

export { SelectionRef } from './app/classes/selection-ref.model';
export { SelectionDialog } from './app/services/selection-dialog.service';

export {
  SelectionDialogConfig,
  SelectionDialogConfigAction,
  SelectionDialogConfigActionOptionMenu,
  SelectionDialogActionCallbackParams,
} from './app/interfaces/selection-dialog-config.interface';
