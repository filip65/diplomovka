import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useSnackbar } from './SnackbarProvider';
import { useAppSelector } from '@renderer/store/hooks';
import { selectEconomic } from '@renderer/pages/economic/economicSlice';
import { selectStructure } from '@renderer/pages/structure/structureSlice';
import { selectCVP } from '@renderer/pages/cvp/cvpSlice';
import { selectSortiment } from '@renderer/pages/sortiment/sortimentSlice';
import { selectIndex } from '@renderer/pages/index/indexSlice';
import { selectPareto } from '@renderer/pages/pareto/paretoSlice';
import { selectEvaluation } from '@renderer/pages/report/evaluationSlice';
import { selectVariation } from '@renderer/pages/variation/variationSlice';
import { selectTax } from '@renderer/pages/tax/taxSlice';
import { selectTrend } from '@renderer/pages/trend/trendSlice';

type SaveContextProps = {
  save: VoidFunction;
  saveButtonDisabled: boolean;
  resetPath: VoidFunction;
};

const SaveContext = createContext<SaveContextProps | null>(null);

type Props = PropsWithChildren;

const SaveDataProvider: React.FC<Props> = ({ children }) => {
  const economic = useAppSelector(selectEconomic);
  const structure = useAppSelector(selectStructure);
  const cvp = useAppSelector(selectCVP);
  const sortiment = useAppSelector(selectSortiment);
  const chain = useAppSelector(selectIndex);
  const pareto = useAppSelector(selectPareto);
  const variation = useAppSelector(selectVariation);
  const tax = useAppSelector(selectTax);
  const trend = useAppSelector(selectTrend);

  const { tasks } = useAppSelector(selectEvaluation);

  const [path, setPath] = useState<string | undefined>(undefined);
  const [oldData, setOldData] = useState<any>(null);
  const { open } = useSnackbar();

  const onceSaved = !!path;

  const dataChanged = useMemo(() => {
    const oldString = JSON.stringify(oldData);
    const newString = JSON.stringify({
      economic,
      sortiment,
      structure,
      chain,
      cvp,
      pareto,
      variation,
      tax,
      trend,
      tasks,
    });

    return oldString !== newString && onceSaved;
  }, [
    oldData,
    economic,
    sortiment,
    structure,
    chain,
    cvp,
    pareto,
    variation,
    tax,
    tasks,
    trend,
    onceSaved,
  ]);

  const save = async () => {
    let tempPath;

    if (!onceSaved) {
      tempPath = await window.electron.chooseFilePath();

      setPath(tempPath);
    } else {
      tempPath = path;
    }

    const newData = {
      economic,
      sortiment,
      structure,
      chain,
      cvp,
      pareto,
      variation,
      tax,
      trend,
      tasks,
    };

    const json = JSON.stringify({
      path: tempPath,
      data: newData,
    });

    const isSaved = await window.electron.saveProject(json);
    if (isSaved) {
      setOldData(newData);
      open('Súbor bol uložený.');
    } else {
      open('Súbor sa nepodarilo uložiť.');
    }
  };

  const resetPath = () => {
    setPath(undefined);
  };

  return (
    <SaveContext.Provider
      value={{
        save,
        saveButtonDisabled: !onceSaved ? false : !dataChanged,
        resetPath,
      }}
    >
      {children}
    </SaveContext.Provider>
  );
};

export default SaveDataProvider;

export const useDataSave = () => {
  const context = useContext(SaveContext);
  if (!context) {
    throw new Error('useDataSave must be used within a SaveDataProvider');
  }
  return context;
};
