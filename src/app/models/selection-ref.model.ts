import { Subject } from "rxjs";

export class SelectionRef {

  private actionSubject = new Subject();
  private selectAllSubject = new Subject();
  private cancelSubject = new Subject();
  public dialogRef;

  constructor() {}

  onSelectAll() {
    return this.selectAllSubject;
  }

  onAction() {
    return this.actionSubject;
  }

  onCancel() {
    return this.cancelSubject;
  }

  action(data) {
    return this.actionSubject.next(data);
  }

  selectAll(data) {
    return this.selectAllSubject.next(data);
  }

  cancel() {
    this.dialogRef.close();
    return this.cancelSubject.next();
  }

  close() {
    this.dialogRef.close();
  }
}