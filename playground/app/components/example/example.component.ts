import { map } from 'rxjs/operators';
import { Component } from '@angular/core';
import { FsMessage } from '@firestitch/message';
import {
  FsSelectionDialogConfig,
  SelectionActionType,
  SelectionDialog,
  SelectionRef,
  FsSelectionActionSelected
} from '@firestitch/selection';
import { of } from 'rxjs';


@Component({
  selector: 'example',
  templateUrl: 'example.component.html',
  styleUrls: [
    './example.component.scss',
  ]
})
export class ExampleComponent {

  public selected: number[] = [];
  public selectionRef: SelectionRef = null;

  private _data = [
    {
      name: 'Red',
      value: 'red',
      image: './assets/red.png'
    },
    {
      name: 'Blue',
      value: 'blue',
      image: './assets/blue.png'
    }
  ];

  items = [
      { name: 'Item 1', id: 1 },
      { name: 'Item 2', id: 2 },
      { name: 'Item 3', id: 3 },
      { name: 'Item 4', id: 4 }
    ];

  constructor(
    private selectionDialog: SelectionDialog,
    private fsMessage: FsMessage
  ) { }

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
          name: 'delete',
          label: 'Delete'
        },
        {
          type: SelectionActionType.Autocomplete,
          label: 'Change Color',
          name: 'color',
          placeholder: 'Color',
          values: (keyword) => {
            return of(this._data)
              .pipe(
                map((data) => {
                  return data.filter((item) => {
                    return !keyword || item.name.toLowerCase().indexOf(keyword) >= 0;
                  });
                }),
              );
          }
        },
        {
          type: SelectionActionType.Select,
          label: 'Change Hair Color',
          name: 'color',
          values: of(this._data)
        },
        {
          type: SelectionActionType.Select,
          label: 'Change Status To',
          name: 'status',
          values: [
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
        name: 'delete',
        label: 'My changed Action'
      },
      {
        type: SelectionActionType.Select,
        label: 'Change Hair Color',
        name: 'hair',
        values: of([
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
    .subscribe((result: FsSelectionActionSelected) => {
      console.log('Action Selected ', result);
      let message = 'Selected all';

      if (!result.all) {
        message = `Selected ${this.selected.length}`;
      }

      message = `${message} for selection processing ${(result.name)} (${result.value})`;

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
