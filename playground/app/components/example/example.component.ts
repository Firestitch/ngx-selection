import { Component } from '@angular/core';
import { BulkDialog } from 'fs-bulk';
import { FsMessage } from '@firestitch/message';
import { BulkDialogConfig } from 'src/app/interfaces';

@Component({
  selector: 'example',
  templateUrl: 'example.component.html'
})
export class ExampleComponent {

  selected: object[] = [];

  items = [
      { name: 'Item 1', id: 1 },
      { name: 'Item 2', id: 2 },
      { name: 'Item 3', id: 3 },
      { name: 'Item 4', id: 4 }
    ];

  constructor(private bulkDialog: BulkDialog,
              private fsMessage: FsMessage) {}

  open() {

    const config: BulkDialogConfig = {
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

    const bulkRef = this.bulkDialog.open(config, this.selected);

    bulkRef.onAction().subscribe((result) => {
      let message = 'Selected all';

      const data = <any>result;
      if (!data.all) {
        message = 'Selected '.concat(this.selected.length.toString());
      }

      message = message.concat(' for bulk processing ').concat(data.name || data.tooltip).concat(' (').concat(data.value).concat(')');
      this.fsMessage.success(message);
      bulkRef.cancel();
    });

    bulkRef.onSelectAll().subscribe((all) => {
      this.selected.splice(0, this.selected.length);
      if (all) {
        this.selected.push(...this.items);
      } else {
        this.selected.splice(0, this.selected.length);
      }
    });

    bulkRef.onCancel().subscribe(() => {
      this.selected.splice(0, this.selected.length);
    });
  }
}
