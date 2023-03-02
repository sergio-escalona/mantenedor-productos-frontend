import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

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

const PieGraph = ({ data, dataKey }) => {
  const sortableData = [...data];
  sortableData.sort((a, b) => b.count - a.count);

  return (
    <ResponsiveContainer width="50%" height={300} aspect={1}>
      <PieChart width={500} height={300}>
        <Pie
          data={sortableData}
          paddingAngle={2}
          dataKey={dataKey}
          isAnimationActive={false}
        >
          {sortableData.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={barColors[index % 33]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieGraph;
