import { useAppDispatch, useAppSelector } from '../../store/hooks';
import PDFTable from './PDFTable';
import Title from '../Title';
import {
  Autocomplete,
  Box,
  Grid,
  Paper,
  SortDirection,
  styled,
  TextField,
} from '@mui/material';
import {
  ActionCellBottom,
  ActionCellBottomRight,
  ActionCellRight,
  DataTable,
  TableBody,
  TableCell,
  TableRow,
} from './Table';
import TableActionButton from './TableActionButton';
import { useError } from '../providers/ErrorProvider';
import { DefaultState, HeaderType } from '@renderer/store/rootReducer';
import { RootSelectors } from '@renderer/store/store';

const TableWrapper = styled(Box)`
  overflow-x: auto;
`;

export default function withTable(
  TableInput: (props: any) => JSX.Element,
  TableDataHeader: (props: any) => JSX.Element,
  selectors: RootSelectors,
  actions: any,
) {
  return () => {
    const dispatch = useAppDispatch();
    const { openError } = useError();

    const headers = useAppSelector(selectors.headers);
    const data = useAppSelector(selectors.data);
    const dynRows = useAppSelector(selectors.dynRows);
    const dynCols = useAppSelector(selectors.dynCols);

    const deleteRow = (row: number) => {
      dispatch(actions.deleteRow(row));
    };

    const deleteColumn = (col: number) => {
      dispatch(actions.deleteColumn(col));
    };

    const handleChangeData = function (
      value: string,
      row: number,
      col: number,
      cellType?: HeaderType,
    ) {
      if (cellType === HeaderType.SELECT) {
        dispatch(
          actions.setDataOnIndex({
            data: value,
            row,
            col,
            type: HeaderType.SELECT,
          }),
        );
      } else if (cellType === HeaderType.STRING) {
        dispatch(
          actions.setDataOnIndex({
            data: value,
            row,
            col,
            type: HeaderType.STRING,
          }),
        );
      } else {
        if (value.startsWith('0') && !value.startsWith('0.'))
          value = value.slice(1);

        dispatch(
          actions.setDataOnIndex({
            data: Math.abs(Math.round(parseFloat(value) * 100) / 100),
            row,
            col,
          }),
        );
      }
    };

    const sortByYear = (sortDirection: SortDirection) => {
      try {
        dispatch(actions.sortTableByYear(sortDirection));
      } catch (error: any) {
        openError(error);
      }
    };

    const sortByItemNumber = (sortDirection: SortDirection) => {
      dispatch(actions.sortTableByItemNumber(sortDirection));
    };

    return (
      <>
        <Title
          onSortYear={actions.sortTableByYear ? sortByYear : undefined}
          onSortItems={
            actions.sortTableByItemNumber ? sortByItemNumber : undefined
          }
        />
        <Paper className="hideInPrint">
          <Grid container>
            <Grid xs={4} item>
              <TableInput selectors={selectors} actions={actions} />
            </Grid>
            <Grid xs={8} item>
              <TableWrapper>
                <DataTable>
                  <TableDataHeader selectors={selectors} actions={actions} />
                  <TableBody>
                    {data.map((rowData, row) => (
                      <TableRow key={row}>
                        {rowData.map((value, col) => (
                          <TableCell key={row + ':' + col}>
                            {headers[col].type === HeaderType.NUMBER ||
                            headers[col].type === HeaderType.STRING ? (
                              <TextField
                                defaultValue={value}
                                onBlur={(e) =>
                                  handleChangeData(
                                    e.target.value ?? '',
                                    row,
                                    col,
                                    headers[col].type,
                                  )
                                }
                                onWheel={(event) => event.currentTarget.blur()}
                                sx={{
                                  position: 'absolute',
                                  inset: 0,

                                  '& .MuiOutlinedInput-root': {
                                    borderRadius: '0',
                                    '& fieldset': {
                                      border: 'none',
                                    },
                                  },

                                  input: {
                                    height: '48px',
                                    padding: 0,
                                    textAlign: 'center',
                                  },
                                }}
                              />
                            ) : (
                              <Autocomplete
                                value={headers[col].options?.find(
                                  (option) => option.value === value.toString(),
                                )}
                                options={headers[col].options ?? []}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => (
                                  <TextField {...params} />
                                )}
                                clearIcon={false}
                                onChange={(e, value) => {
                                  handleChangeData(
                                    value?.value ?? '',
                                    row,
                                    col,
                                    headers[col].type,
                                  );
                                }}
                                sx={{
                                  position: 'absolute',
                                  inset: 0,

                                  '.MuiOutlinedInput-root': {
                                    borderRadius: '0',
                                    height: '48px',
                                    paddingRight: '36px !important',

                                    fieldset: {
                                      border: 'none',
                                      height: '48px',
                                    },
                                  },

                                  input: {
                                    height: `${48 - 18}px !important`,
                                    padding: '0px !important',
                                  },
                                }}
                              />
                            )}
                          </TableCell>
                        ))}
                        {dynRows && (
                          <ActionCellRight>
                            <TableActionButton
                              buttonType="delete"
                              onClick={() => deleteRow(row)}
                            />
                          </ActionCellRight>
                        )}
                      </TableRow>
                    ))}
                    <TableRow>
                      {data[0].map((_value, col) => {
                        return (
                          <ActionCellBottom key={col}>
                            {dynCols && (
                              <TableActionButton
                                buttonType="delete"
                                onClick={() => deleteColumn(col)}
                              />
                            )}
                          </ActionCellBottom>
                        );
                      })}
                      <ActionCellBottomRight></ActionCellBottomRight>
                    </TableRow>
                  </TableBody>
                </DataTable>
              </TableWrapper>
            </Grid>
          </Grid>
        </Paper>

        {/* <PDFTable selector={selector} /> */}
      </>
    );
  };
}
