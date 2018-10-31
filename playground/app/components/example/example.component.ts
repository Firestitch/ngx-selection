import { Component } from '@angular/core';
import { SelectionDialog } from 'fs-selection';
import { FsMessage } from '@firestitch/message';
import { SelectionDialogConfig } from 'src/app/interfaces';

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

  open() {

    if (this.selectionRef) {
      return;
    }

    const config: SelectionDialogConfig = {
      allCount: this.items.length,
      actions: [
        {
          tooltip: 'Delete',
          value: 'delete',
          icon: 'delete'
        },
        {
          icon: 'more_vert',
          options: [
            {
              name: 'Move to Section',
              value: 'move',
              options: [
                {
                  name: 'Section A',
                  value: 'sectiona'
                },
                {
                  name: 'Section B',
                  value: 'sectionb'
                },
                {
                  name: 'Section C',
                  value: 'sectionc'
                }
              ]
            },
            {
              name: 'Archive',
              value: 'archive',
            }
          ]
        }
      ]
    }

    this.selectionRef = this.selectionDialog.open(config, this.selected);

    this.selectionRef.onAction().subscribe((result) => {
      let message = 'Selected all';

      const data = <any>result;
      if (!data.all) {
        message = 'Selected '.concat(this.selected.length.toString());
      }

      message = message.concat(' for selection processing ').concat(data.name || data.tooltip).concat(' (').concat(data.value).concat(')');
      this.fsMessage.success(message);
      this.selectionRef.cancel();
    });

    this.selectionRef.onSelectAll().subscribe((all) => {
      this.selected.splice(0, this.selected.length);
      if (all) {
        this.selected.push(...this.items);
      } else {
        this.selected.splice(0, this.selected.length);
      }
    });

    this.selectionRef.onCancel().subscribe(() => {
      this.selected.splice(0, this.selected.length);
      this.selectionRef = null;
    });
  }
}
