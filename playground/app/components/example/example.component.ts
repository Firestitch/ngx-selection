import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';

import { FsMessage } from '@firestitch/message';
import {
  FsSelectionActionSelected,
  FsSelectionDialogConfig,
  SelectionActionType,
  SelectionDialog,
  SelectionRef,
} from '@firestitch/selection';

import { Subject, of } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleComponent implements OnDestroy {

  public selected: any[] = [];
  public selectionRef: SelectionRef = null;
  public disabled = false;
  public config: FsSelectionDialogConfig;

  public items = [
    { name: 'Item 1', id: '1' },
    { name: 'Item 2', id: '2' },
    { name: 'Item 3', id: '3' },
    { name: 'Item 4', id: '4' },
  ];

  private _destroy$ = new Subject();
  private _data = [
    {
      name: 'Red',
      value: 'red',
      image: './assets/red.png',
    },
    {
      name: 'Blue',
      value: 'blue',
      image: './assets/blue.png',
    },
  ];

  constructor(
    private _selectionDialog: SelectionDialog,
    private _message: FsMessage,
  ) { }

  public open() {

    if (this.selectionRef) {
      return;
    }

    this.config = {
      allCount: this.items.length,
      selectedCount: this.selected.length,
      selectAll: true,
      actions: [
        {
          type: SelectionActionType.Autocomplete,
          label: 'Change Color',
          name: 'color',
          placeholder: 'Color',
          disabled: this.disabled,
          values: (keyword) => {
            return of(this._data)
              .pipe(
                map((data) => {
                  return data.filter((item) => {
                    return !keyword || item.name.toLowerCase().indexOf(keyword) >= 0;
                  });
                }),
              );
          },
        },
        {
          type: SelectionActionType.Select,
          label: 'Change Hair Color',
          name: 'hairColor',
          disabled: this.disabled,
          values: of(this._data),
        },
        {
          type: SelectionActionType.Select,
          label: 'Change Status To',
          name: 'status',
          disabled: this.disabled,
          values: [
            {
              name: 'TODO',
              value: '1',
            },
            {
              name: 'Done',
              value: '2',
            },
          ],
        },
        {
          type: SelectionActionType.Action,
          name: 'delete',
          label: 'Delete',
          disabled: this.disabled,
        },
        {
          type: SelectionActionType.Action,
          name: 'long',
          label: 'A very long action label to test the layout',
          disabled: this.disabled,
        },
      ],
    };

    this.selectionRef = this._selectionDialog.open(this.config);
    this._subscribeToSelectionEvents();
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
        label: 'My changed Action',
      },
      {
        type: SelectionActionType.Select,
        label: 'Change Hair Color',
        name: 'hair',
        values: of([
          {
            name: 'Red',
            value: 'red',
          },
          {
            name: 'Blue',
            value: 'blue',
          },
        ]),
      },
    ]);
  }

  public switchDisable(): void {
    this.disabled = !this.disabled;
    this.config.actions
      .forEach((action) => {
        this.selectionRef.actionDisabledSwitch(action.name, this.disabled);
      });
  }

  public resetActions() {
    this.selectionRef.resetActions();
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  private _subscribeToSelectionEvents() {
    this.selectionRef
      .actionSelected$()
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((result: FsSelectionActionSelected) => {
        console.log('Action Selected ', result);
        let message = 'Selected all';

        if (!result.all) {
          message = `Selected ${this.selected.length}`;
        }

        message = `${message} for selection processing ${(result.name)} (${result.value})`;

        this._message.success(message);
        this.selectionRef.close();
      });

    this.selectionRef
      .allSelected$()
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((all) => {
        console.log('All Selected ', all);
        this.selected.splice(0, this.selected.length);
        if (all) {
          this.selected.push(...this.items
            .map((item) => item.id));
        } else {
          this.selected.splice(0, this.selected.length);
        }
      });

    this.selectionRef.destroy$.subscribe(() => {
      this.selected.splice(0, this.selected.length);
      this.selectionRef = null;
    });
  }

}
