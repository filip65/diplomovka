import TableStatic from '../../components/TableStatic';
import { sortimentCalculation } from './sortimentCalculation';
import { useAppSelector } from '../../store/hooks';
import { selectSortiment } from './sortimentSlice';
import SectionTitle from '@renderer/components/SectionTitle';
import { Grid, Paper } from '@mui/material';
import Spacer from '@renderer/components/Spacer';
import BarGraph from '@renderer/components/graph/BarGraph';

export default function SortimentResult() {
  const { headers, data } = useAppSelector(selectSortiment);
  const {
    marginGross,
    marginProfit,
    profit,
    rentCost,
    rentIncome,
    allowance,
    totalDirectCosts,
    totalIndirectCosts,
    unitProfit,
    income,
    totalCosts,
    totalProfit,
  } = sortimentCalculation(data as number[][]);

  return (
    <div>
      <Spacer height={40} hideInPrint />

      <SectionTitle className="new-page">Analýza ukazovateľov</SectionTitle>
      <Paper>
        <TableStatic
          corner={'Ekonomické ukazovatele'}
          header={headers.map((h) => h.label)}
          inputs={[
            [
              '(N<sub>p</sub>) - priame náklady (€)',
              `\\(N_{p} = N_{pm} + N_{pmz} + N_{opn}\\)`,
            ],
            [
              '(N<sub>r</sub>) - réžijné náklady (nepriame)',
              `\\(N_{r} = ÚVNV - N_{p}\\)`,
            ],
            [
              '(Z<sub>j</sub>) - zisk jednotkový (€)',
              `\\(Z_{j} = N_{p} - ÚVNV\\)`,
            ],
            [
              '(R<sub>n</sub>) - rentabilita nákladov (%)',
              `\\(R_{n}=\\frac{Z_{j}}{ÚVNV}\\times 100\\)`,
            ],
            [
              '(R<sub>t</sub>) - rentabilita tržieb (%)',
              `\\(R_{t}=\\frac{Z_{j}}{P_{cj}}\\times 100\\)`,
            ],
            [
              '(H<sub>r</sub>) - hrubé rozpätie (€)',
              `\\(H_{r}={P_{cj}} - {N_{p}}\\)`,
            ],
            [
              '(Pú) - príspevok na úhradu (€)',
              `\\(P_{ú}=1-\\frac{N_{p}}{P_{cj}}\\)`,
            ],
            ['(T) - tržby celkové (€)', `\\(T = Z_{j} * Q\\)`],
            ['(NC) - náklady celkové (€)', `\\(NC = N_{p} + N_{r}\\)`],
            ['(Z<sub>c</sub>) - zisk celkový (€)', `\\(Z_{c} = T - NC\\)`],
            ['(ZP) - zisková prirážka (€)', `\\(ZP = P_{cj} - ÚVNV\\)`],
            [
              '(Z) - zisk pri pôvodnej výrobnej štruktúre (€)',
              `\\(Z =((P_{cj} - N_{p}) - (ÚVNV - N_{P})) \\times Q\\)`,
            ],
          ]}
          data={[
            totalDirectCosts,
            totalIndirectCosts,
            unitProfit,
            rentCost,
            rentIncome,
            marginGross,
            allowance,
            income,
            totalCosts,
            totalProfit,
            marginProfit,
            profit,
          ]}
        />
      </Paper>

      <Spacer height={40} hideInPrint />

      <SectionTitle>Dashboarding</SectionTitle>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <BarGraph
            title="UKAZOVATELE SORTIMENTNEJ ANALÝZY"
            height={420}
            labels={['Rentabilita tržieb', 'Rentabilita nákladov']}
            data={headers.map((h, index) => ({
              name: h.label,
              values: [rentIncome[index], rentCost[index]],
            }))}
            showValueInBar={true}
            yAxisLabel="ekonomický ukazovatel (%)"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <BarGraph
            title="HRUBÉ ROZPÄTIE"
            height={420}
            labels={['']}
            data={headers.map((header, index) => ({
              name: header.label,
              values: [marginGross[index]],
            }))}
            showValueInBar
            yAxisLabel="ekonomický ukazovateľ (€)"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <BarGraph
            title="PRÍSPEVOK NA ÚHRADU"
            height={420}
            labels={['']}
            data={headers.map((header, index) => ({
              name: header.label,
              values: [allowance[index]],
            }))}
            showValueInBar
            yAxisLabel="ekonomický ukazovateľ (€)"
          />
        </Grid>
      </Grid>
    </div>
  );
}
