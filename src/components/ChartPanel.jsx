import {
  Area,
  AreaChart,
  ResponsiveContainer,
  YAxis
} from 'recharts'

function ChartPanel({ history }) {

  return (

    <div className="chart">

      <div className="radar"></div>

      <ResponsiveContainer
        width="100%"
        height={180}
      >

        <AreaChart
          data={history}
        >

          <YAxis
            domain={[
              'dataMin - 5',
              'dataMax + 5'
            ]}
            hide
          />

          <defs>

            <linearGradient
              id="colorUsd"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >

              <stop
                offset="0%"
                stopColor="#22c55e"
                stopOpacity={0.45}
              />

              <stop
                offset="100%"
                stopColor="#22c55e"
                stopOpacity={0}
              />

            </linearGradient>

          </defs>

          <Area
            type="monotone"
            dataKey="value"
            stroke="#22c55e"
            strokeWidth={4}
            fill="url(#colorUsd)"
            dot={false}
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>
  )
}

export default ChartPanel