import { Component } from '@angular/core';
import { FsMessage } from '@firestitch/message';
import { SelectionDialog, SelectionRef } from '@firestitch/selection';
import { FsSelectionDialogConfig, SelectionActionType } from '@firestitch/selection';
import { of } from 'rxjs';


@Component({
  selector: 'example',
  templateUrl: 'example.component.html',
  styleUrls: [
    './example.component.scss',
  ]
})
export class ExampleComponent {

  selected: number[] = [];
  selectionRef: SelectionRef = null;

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

    const config: FsSelectionDialogConfig = {
      allCount: this.items.length,
      selectedCount: this.selected.length,
      selectAll: true,
      actions: [
        {
          type: SelectionActionType.Action,
          value: 'delete',
          label: 'Delete'
        },
        {
          type: SelectionActionType.Select,
          label: 'Change Color',
          value: 'color',
          options: of([
            {
              name: 'Red',
              value: 'red'
            },
            {
              name: 'Blue',
              value: 'blue'
            }
          ])
        },
        {
          type: SelectionActionType.Select,
          label: 'Change Status To',
          value: 'status',
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
        }
      ],
    };

    this.selectionRef = this.selectionDialog.open(config);
    this.subscribeToSelectionEvents();
  }

  public selectionChange() {
    if (this.selectionRef) {
      this.selectionRef.updateSelected(this.selected.length);
    }
  }

  public changeActions() {
    this.selectionRef.updateActions([
      {
        type: SelectionActionType.Action,
        value: 'delete',
        label: 'My changed Action'
      },
      {
        type: SelectionActionType.Select,
        label: 'Change Hair Color',
        value: 'hair',
        options: of([
          {
            name: 'Red',
            value: 'red'
          },
          {
            name: 'Blue',
            value: 'blue'
          }
        ])
      },
    ])
  }

  public resetActions() {
    this.selectionRef.resetActions();
  }

  private subscribeToSelectionEvents() {
    this.selectionRef.actionSelected$()
    .subscribe((result) => {
      console.log('Action Selected ', result);
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
      console.log('All Selected ', all);
      this.selected.splice(0, this.selected.length);
      if (all) {
        this.selected.push(...this.items.map((item) => item.id));
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
