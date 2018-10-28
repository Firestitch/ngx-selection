import { Component } from '@angular/core';
import { FsComponentService } from 'fs-bulk';
import { FsMessage } from '@firestitch/message';

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

  constructor(private fsComponentService: FsComponentService,
              private fsMessage: FsMessage) {}

  open() {

    const config = {
      actions: [
        {
          tooltip: 'Delete',
          value: 'delete',
          icon: 'delete'
        },
        {
          icon: 'more_vert',
          actions: [
            {
              name: 'Move to Section',
              value: 'move',
              actions: [
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

    const bulkRef = this.fsComponentService.open(config, this.selected);

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
