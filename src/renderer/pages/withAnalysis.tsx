import HeaderBar from '../components/HeaderBar';
import { useSelector } from 'react-redux';
import TextArea from '../components/Textarea';
import { defaultState } from '../store/rootReducer';
import { RootState } from '../store/store';
import withTable from '../components/tables/HOCTable';
import Page from 'renderer/components/layout/Page';
import PageContent from 'renderer/components/layout/PageContent';
import Spacer from 'renderer/components/Spacer';

export default function withAnalysis(
  selector: (state: RootState) => defaultState,
  actions: any,
  TableItems: (props: any) => JSX.Element,
  TableHeaders: (props: any) => JSX.Element,
  Result: () => JSX.Element
) {
  return () => {
    const { id, text } = useSelector(selector);

    const Table: () => JSX.Element = withTable(
      TableItems,
      TableHeaders,
      selector,
      actions
    );

    return (
      <Page>
        <HeaderBar id={id} addToReport={true} printToPDF={true} />
        <PageContent>
          <Table />
          <Result />
          <Spacer height={20} hideInPrint />
          <TextArea text={text} action={actions.changeText} />
        </PageContent>
      </Page>
    );
  };
}
