import React from "react";
import { Text, View } from "react-native";
import { VictoryPie } from "victory-native";

export default function BuyingPowerAndHoldings(props) {
  const { job } = props;

  // Create an array of objects for each asset in the job object if job.assets is not null
  const data =
    job?.assets &&
    Object.entries(job?.assets).map(([key, value]) => ({
      x: key,
      y: value.holdings,
      holdings: value.holdings,
      shares: value.shares,
    }));

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingBottom: "2%",
        }}
      >
        <Text>Available buying power:</Text>
        <Text>${job?.buying_power}</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>Money invested in assets:</Text>
        <Text>${job?.holdings}</Text>
      </View>
      <View
        style={{
          alignItems: "center",
        }}
      >
        {data?.length >= 1 ? (
          <VictoryPie
            colorScale={["tomato", "navy", "gold", "cyan", "orange"]}
            data={data}
            height={315}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onPress: (evt, pressedProps) => {
                    const { datum } = pressedProps;
                    return [
                      {
                        target: "labels",
                        mutation: (props) => {
                          return props.text ===
                            `$${datum.holdings}\n(${datum.shares} shares)`
                            ? null
                            : {
                                text: `$${datum.holdings}\n(${datum.shares} shares)`,
                              };
                        },
                      },
                    ];
                  },
                },
              },
            ]}
          ></VictoryPie>
        ) : null}
      </View>
    </View>
  );
}
