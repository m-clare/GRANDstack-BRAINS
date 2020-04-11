// <<<<<<< HEAD
import React, { useState } from "react";
// =======
// import React, { useState /*, { Component }*/ } from "react";
// >>>>>>> 53613e45cc5999579bb569b91ca1765e4ce075ea
import Chart from "react-apexcharts";

import { Query } from "react-apollo";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Loading from "./Loading";

// <<<<<<< HEAD
// =======
// // function getSorting(order, orderBy) {
// //   return order === "desc"
// //     ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
// //     : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
// // }

// >>>>>>> 53613e45cc5999579bb569b91ca1765e4ce075ea
const GET_STATES_QUERY = gql`
  query statesPaginateQuery($_selectedStates: [String!]) {
    State(filter: { abbreviation_in: $_selectedStates }) {
      abbreviation
      numBridges
    }
  }
`;

export default function BarChartState({ _selectedStates }) {
  // <<<<<<< HEAD
  // =======
  // class BarChartState extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     order: "asc", // sets order of states to be named in list
  //     orderBy: "abbreviation",

  //     // this sets the state for the Apex Chart
  //     options: {
  //       chart: {
  //         // id: "basic-bar",
  //         type: "bar"
  //       },
  //       title: {
  //         text: "Total Bridge Count by State"
  //       },
  //       plotOptions: {
  //         bar: {
  //           // barHeight: '100%',
  //           // distributed: true,
  //           // horizontal: true,
  //           columnWidth: "90%",
  //           dataLabels: {
  //             hideOverflowingLabels: false
  //           }
  //         }
  //       }
  //       // legend: {
  //       //   show:true,
  //       //   position: 'bottom'
  //       // },
  //       //series: [44, 55, 41, 17, 15],
  //       //labels: ["A", "B", "C", "D", "E"]
  //     }
  //   };
  // }
  // >>>>>>> 53613e45cc5999579bb569b91ca1765e4ce075ea

  console.log(_selectedStates);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("abbreviation");
  // <<<<<<< HEAD
  // const categories = [];
  // =======
  //   // const categories = [];
  // >>>>>>> 53613e45cc5999579bb569b91ca1765e4ce075ea

  // const options = useState(options: {
  //       chart: {
  //         // id: "basic-bar",
  //         type: "bar"
  //       },
  //       title: {
  //         text: "Total Bridge Count by State"
  //       },
  //       plotOptions: {
  //         bar: {
  //           // barHeight: '100%',
  //           // distributed: true,
  //           // horizontal: true,
  //           columnWidth: "90%",
  //           dataLabels: {
  //             hideOverflowingLabels: false
  //           }
  //         }
  //       }
  //       // legend: {
  //       //   show:true,
  //       //   position: 'bottom'
  //       // },
  //       //series: [44, 55, 41, 17, 15],
  //       //labels: ["A", "B", "C", "D", "E"]
  //     });

  function getSorting(order, orderBy) {
    return order === "desc"
      ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
      : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
  }

  // <<<<<<< HEAD
  // =======
  //   // const { loading, error, data } = useQuery(GET_STATES_QUERY);

  // >>>>>>> 53613e45cc5999579bb569b91ca1765e4ce075ea
  const { loading, error, data } = useQuery(GET_STATES_QUERY, {
    variables: {
      _selectedStates
    }
  });
  // <<<<<<< HEAD

  //   if (loading) return <Loading />;
  //   if (error) return <p>Error</p>;

  //   data.State.slice().sort(getSorting(order, orderBy)).map(n => {
  //     categories.push(n.abbreviation);
  //   });

  //   const series = [
  //     {
  //       name: "Number of Bridges",
  // =======
  // render() {
  //   const { order, orderBy } = this.state;

  //   return (
  //     <Query
  //       query={gql`
  //         query statesPaginateQuery($selected: [String!]) {
  //           State(filter: { abbreviation_in: $selected }) {
  //             abbreviation
  //             numBridges
  //           }
  //         }
  //       `}
  //       variables={{
  //         selected: this.props.selected
  //       }}
  //     >
  //       {({ loading, error, data }) => {
  // if (loading) return <p>Loading...</p>;
  if (loading) return <Loading />;
  if (error) return <p>Error</p>;

  // window.data = data;

  // const options = {
  //   ...this.state.options,
  //   xaxis: {
  //     categories: data.State.slice()
  //       .sort(getSorting(order, orderBy))
  //       .map(n => {
  //         return n.abbreviation;
  //       })
  //   }
  // };

  // data.State.slice().sort(getSorting(order, orderBy)).map(n => {
  //   categories.push(n.abbreviation);
  // });

  const categories = [
    data.State.slice()
      .sort(getSorting(order, orderBy))
      .map(n => {
        return n.abbreviation;
      })
  ];

  console.log(categories);

  const series = [
    {
      abbreviation: "Number of Bridges",
      // >>>>>>> 53613e45cc5999579bb569b91ca1765e4ce075ea
      data: data.State.slice()
        .sort(getSorting(order, orderBy))
        .map(n => {
          // return n.numBridges.toLocaleString();
          return n.numBridges;
        })
    }
  ];

  // <<<<<<< HEAD
  return (
    <div className="mixed-chart">
      <Chart
        // =======
        //   console.log(series);

        //   return (
        //     <div className="mixed-chart">
        //       <Chart
        //         // options={this.state.options}
        // >>>>>>> 53613e45cc5999579bb569b91ca1765e4ce075ea
        // options={options}
        options={{
          chart: {
            // id: "basic-bar",
            type: "bar"
          },
          title: {
            text: "Total Bridge Count by State"
          },
          plotOptions: {
            bar: {
              // barHeight: '100%',
              // distributed: true,
              // horizontal: true,
              columnWidth: "90%",
              dataLabels: {
                hideOverflowingLabels: false
              }
            }
          },
          xaxis: {
            categories: categories
          }
          // legend: {
          //   show:true,
          //   position: 'bottom'
          // },
          //series: [44, 55, 41, 17, 15],
          //labels: ["A", "B", "C", "D", "E"]
        }}
        // <<<<<<< HEAD
        // =======
        //         // series={this.state.options.series}
        // >>>>>>> 53613e45cc5999579bb569b91ca1765e4ce075ea
        series={series}
        type="bar"
        // width="380"
      />
    </div>
  );
  // <<<<<<< HEAD
  // }
  // =======
  // }}
  // </Query>
  // );
  // }
}

// export default BarChartState;
// >>>>>>> 53613e45cc5999579bb569b91ca1765e4ce075ea
