import React from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useThreshold } from '../contexts/ThresholdContext';

interface TemperatureChartProps {
  history: number[];
}

export const TemperatureChart: React.FC<TemperatureChartProps> = ({ history }) => {
  const { threshold } = useThreshold();

  return (
    <LineChart
      data={{
        labels: history.length ? history.map((_, index) => (index + 1).toString()) : ["-"],
        datasets: [{ 
          data: history.length ? history : [0],
          color: (opacity = 1) => {
            const currentTemp = history[history.length - 1] || 0;
            return currentTemp > threshold ? `rgba(255, 68, 68, ${opacity})` : `rgba(68, 187, 68, ${opacity})`;
          }
        }],
      }}
      width={Dimensions.get('window').width - 40}
      height={220}
      yAxisSuffix="°C"
      chartConfig={{
        backgroundColor: "#fff",
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        decimalPlaces: 1,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#fafafa"
        }
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
    />
  );
}; 