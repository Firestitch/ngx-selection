import { Component } from '@angular/core';
import { FsMessage } from '@firestitch/message';
import { SelectionDialog } from '@firestitch/selection';
import { SelectionDialogConfig, SelectionActionType } from '@firestitch/selection';


@Component({
  selector: 'example',
  templateUrl: 'example.component.html'
})
export class ExampleComponent {

  selected: object[] = [];
  selectionRef = null;

  items = [
      { name: 'Item 1', id: 1 },
      { name: 'Item 2', id: 2 },
      { name: 'Item 3', id: 3 },
      { name: 'Item 4', id: 4 }
    ];

  constructor(private selectionDialog: SelectionDialog,
              private fsMessage: FsMessage) {}

  public open() {

    if (this.selectionRef) {
      return;
    }

    const config: SelectionDialogConfig = {
      allCount: this.items.length,
      selectedCount: this.selected.length,
      actions: [
        {
          type: SelectionActionType.Action,
          value: 'delete',
          label: 'Delete'
        },
        {
          type: SelectionActionType.Select,
          label: 'Change Status To',
          options: [
            {
              name: 'TODO',
              value: '1'
            },
            {
              name: 'Done',
              value: '2'
            }
          ]
        },
      ]
    };

    this.selectionRef = this.selectionDialog.open(config);
    this.subscribeToSelectionEvents();
  }

  public selectionChange() {
    if (this.selectionRef) {
      this.selectionRef.updateSelected(this.selected.length);
    }
  }

  private subscribeToSelectionEvents() {
    this.selectionRef.actionSelected$().subscribe((result) => {
      let message = 'Selected all';

      const data = <any>result;
      if (!data.all) {
        message = `Selected ${this.selected.length}`;
      }

      message = `${message} for selection processing ${(data.label)} (${data.value})`;

      this.fsMessage.success(message);
      this.selectionRef.cancel();
    });

    this.selectionRef.allSelected$().subscribe((all) => {
      this.selected.splice(0, this.selected.length);
      if (all) {
        this.selected.push(...this.items);
      } else {
        this.selected.splice(0, this.selected.length);
      }
    });

    this.selectionRef.cancelled$().subscribe(() => {
      this.selected.splice(0, this.selected.length);
      this.selectionRef = null;
    });
  }
}
