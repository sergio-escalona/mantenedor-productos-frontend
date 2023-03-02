import {
  Bar,
  Cell,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  LabelList,
} from 'recharts';

const barColors = [
  '#1f78b6',
  '#fe7f0c',
  '#2ea02b',
  '#d42824',
  '#9468b5',
  '#8b5541',
  '#e278c3',
  '#7e7e7e',
  '#bac021',
  '#15bfcd',
  '#55aae2',
  '#ffb576',
  '#65cf61',
  '#e87d75',
  '#c7addd',
  '#bc8c7e',
  '#f4cbe6',
  '#b2b2b2',
  '#e0e362',
  '#57e5e9',
  '#113d58',
  '#ad4d01',
  '#135213',
  '#81151b',
  '#613a83',
  '#4a2d27',
  '#c52b96',
  '#4c4c4c',
  '#676710',
  '#0b6c72',
  '#1f79ae',
  '#ff7f0d',
  '#2d9f31',
];

// Gráfico de barras de productos utilizados
const BarGraph = ({ data, x }) => {
  return (
    <ResponsiveContainer width="100%" aspect={2}>
      <BarChart
        width={600}
        height={300}
        data={data}
        barSize={50}
        margin={{ top: 5, right: 20, bottom: 150, left: 0 }}
      >
        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
        <XAxis dataKey={x} angle={-90} textAnchor="end" interval={0} />
        <YAxis
          tickFormatter={value => value}
          domain={[0, dataMax => Math.ceil(dataMax * 1.1)]}
          allowDecimals={false}
        />
        <Tooltip formatter={value => value} />
        <Bar dataKey="total" fill="#32a4a8">
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={barColors[index % 33]} />
          ))}
          <LabelList dataKey="total" position="top" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarGraph;
