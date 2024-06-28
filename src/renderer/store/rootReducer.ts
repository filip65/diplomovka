import { PayloadAction } from '@reduxjs/toolkit';

export interface defaultState {
  id: number;
  title: string;
  corner: string;
  headers: string[];
  data: number[][];
  items: string[];
  values: string[];
  text: string;
  accounts: string[];
  sortable: boolean;
  hasAnalytic: boolean;
  dynRows?: boolean;
  dynCols?: boolean;
}

export interface dataOnIndex {
  data: string;
  index: number;
}

export interface dataOnCords {
  data: number;
  row: number;
  col: number;
}

export const rootReducer = {
  setHeadersOnIndex: (
    state: { headers: string[] },
    action: PayloadAction<dataOnIndex>
  ) => {
    state.headers[action.payload.index] = action.payload.data;
  },
  setItemsOnIndex: (
    state: { items: string[] },
    action: PayloadAction<dataOnIndex>
  ) => {
    state.items[action.payload.index] = action.payload.data;
  },
  setValuesOnIndex: (
    state: { values: string[] },
    action: PayloadAction<dataOnIndex>
  ) => {
    state.values[action.payload.index] = action.payload.data;
  },
  setDataOnIndex: (
    state: { data: number[][] },
    action: PayloadAction<dataOnCords>
  ) => {
    state.data[action.payload.row][action.payload.col] = isNaN(
      action.payload.data
    )
      ? 0
      : action.payload.data;
  },
  addColumn: (state: { headers: string[]; data: number[][] }): void => {
    state.headers.push('');
    state.data.map((rowData: any) => {
      rowData.push(0);
    });
  },
  addRow: (state: {
    items: string[];
    data: number[][];
    accounts: string[];
  }) => {
    state.items.push('');
    state.accounts.push('');
    let arr: any[] = [];
    for (let i = 0; i < state.data[0].length; i++) {
      arr.push(0);
    }
    state.data.push(arr);
  },
  deleteRow: (
    state: { items: string[]; data: number[][] },
    action: PayloadAction<number>
  ) => {
    if (state.items.length === 1) return;
    state.items.splice(action.payload, 1);
    state.data.splice(action.payload, 1);
  },
  deleteColumn: (
    state: { headers: string[]; data: number[][] },
    action: PayloadAction<number>
  ) => {
    if (state.headers.length === 1) return;
    state.data.map((rowData: number[]) => {
      rowData.splice(action.payload, 1);
    });
    state.headers.splice(action.payload, 1);
  },
  changeText: (state: { text: string }, action: PayloadAction<string>) => {
    state.text = action.payload;
  },
};

export const changeAccount = {
  changeAccount: (
    state: { accounts: string[] },
    action: PayloadAction<dataOnIndex>
  ) => {
    state.accounts[action.payload.index] = action.payload.data;
  },
};

export const openProject = {
  openProject: (
    state: {
      headers: string[];
      data: number[][];
      items: string[];
      values: string[];
      text: string;
    },
    action: PayloadAction<defaultState>
  ) => {
    state.headers = action.payload.headers;
    state.data = action.payload.data;
    state.items = action.payload.items;
    state.values = action.payload.values;
    state.text = action.payload.text;
  },
};
