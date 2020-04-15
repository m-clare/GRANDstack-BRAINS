import React, { useState } from "react";
import Chart from "react-apexcharts";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Loading from "./Loading";

// IDEA: update to use image fill with State flags
// https://apexcharts.com/react-chart-demos/pie-charts/pie-with-image/

const GET_STATE_QUERY = gql`
  query statesParginateQuery($_selectedStates: [String!]) {
    State(filter: { abbreviation_in: $_selectedStates }) {
      #State {
      abbreviation
      numBridges
    }
  }
`;

export default function DonutChartState({ _selectedStates }) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("abbreviation");
  const labels = [];
  const series = [];

  function getSorting(order, orderBy) {
    return order === "desc"
      ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
      : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
  }

  const { loading, error, data } = useQuery(GET_STATE_QUERY, {
    variables: {
      _selectedStates
    }
  });

  if (loading) return "Loading...";
  if (error) return `Error ${error.message}`;

  data.State.slice()
    .sort(getSorting(order, orderBy))
    .map(n => {
      labels.push(n.abbreviation);
    });

  data.State.slice()
    .sort(getSorting(order, orderBy))
    .map(n => {
      series.push(n.numBridges);
    });

  return (
    <div className="donut">
      <Chart
        // options={options}
        options={{
          legend: {
            show: true,
            position: "bottom"
          },
          title: {
            text: "Total Bridge Count by State"
          },
          labels: labels
        }}
        series={series}
        type="donut"
      />
    </div>
  );
}
