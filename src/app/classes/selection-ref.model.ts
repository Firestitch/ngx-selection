import { Subject } from 'rxjs';
import { MatDialogRef } from '@angular/material';
import { SelectionDialogComponent } from '../components/selection-dialog';


export class SelectionRef {

  public dialogRef: MatDialogRef<SelectionDialogComponent>;

  private actionSubject = new Subject();
  private selectAllSubject = new Subject();
  private cancelSubject = new Subject();

  constructor() {}

  public onSelectAll() {
    return this.selectAllSubject;
  }

  public onAction() {
    return this.actionSubject;
  }

  public onCancel() {
    return this.cancelSubject;
  }

  public action(data) {
    return this.actionSubject.next(data);
  }

  public selectAll(data) {
    return this.selectAllSubject.next(data);
  }

  public cancel() {
    this.dialogRef.close();

    return this.cancelSubject.next();
  }

  public close() {
    this.dialogRef.close();
  }

  public updateSelected(selectedCount: number): void {
    this.dialogRef.componentInstance.updateSelected(selectedCount);
  }

  public updateAllCount(allCount: number): void {
    this.dialogRef.componentInstance.updateAllCount(allCount);
  }
}
