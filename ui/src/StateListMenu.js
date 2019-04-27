import React from "react";

import { Query } from "react-apollo";
import gql from "graphql-tag";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

// import Radio from "@material-ui/core/Radio";
//import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
//import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

import Divider from "@material-ui/core/Divider";

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

class StateListMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: "asc",
      orderBy: "name",
      name: null,
      selectedStates: [],
      // selected: []
      selected: this.props.selected,
      numSelected: this.props.numSelected
    };
  }

  handleChange = name => event => {
    this.props.triggerParentUpdate("name", name);
    this.setState({ selectedValue: event.target.value });
  };

  handleClick = (event, name) => {
    //const { selected, numSelected } = this.state;
    // const { selected } = this.state;
    const { selected } = this.props;
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
    this.setState({ numSelected: newSelected.length });
    this.props.triggerParentUpdate("selected", newSelected);
    this.props.triggerParentUpdate("numSelected", newSelected.length);
    console.log("select: newSelected: " + newSelected);
    console.log("select: numSelected: " + newSelected.length);
  };

  handleSelectAllClick = (event, data) => {
    // const { numSelected } = this.state;

    let newSelected = [];

    if (event.target.checked) {
      newSelected = data.map(n => n.name);
      console.log("selecte all: newSelected: " + newSelected);
      this.setState({ selected: newSelected });
      this.setState(state => ({ numSelected: state.selected.length }));
      this.props.triggerParentUpdate(state => ({
        numSelected: state.selected.length
      }));
      this.props.triggerParentUpdate("selected", newSelected);
      return;
    }
    this.setState({ selected: [] });
    this.setState(state => ({ numSelected: state.selected.length }));
    this.props.triggerParentUpdate(state => ({ selected: state.selected }));
  };

  isSelected = name => this.state.selected.indexOf(name) !== -1;

  render() {
    const { order, orderBy } = this.state;
    // const { selected } = this.props;
    // const { onSelectAllClick, numSelected, rowCount } = this.state;

    const { numSelected } = this.state;
    // const { numSelected } = this.props;

    return (
      <Query
        query={gql`
          {
            State {
              id
              name
            }
          }
        `}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error</p>;

          const rowCount = Object.keys(data.State).length;

          return (
            <div>
              <List>
                <ListItem>
                  <ListItemText>States</ListItemText>
                </ListItem>
                <ListItem>
                  <Checkbox
                    disabled // disable to prevent app from crashing by letting them select all
                    // need to update query/load so that don't need to reload/requery all according to filters
                    indeterminate={numSelected > 0 && numSelected < rowCount}
                    checked={numSelected === rowCount}
                    //selected={numSelected === rowCount}
                    //onChange={onSelectAllClick}
                    //  onChange={this.handleSelectAllClick}
                    onChange={event =>
                      this.handleSelectAllClick(event, Object(data.State))
                    }
                    //onSelectAllClick={this.handleSelectAllClick}
                  />
                  <ListItemText>Select All</ListItemText>
                </ListItem>
                <Divider />
                {data.State.slice()
                  .sort(getSorting(order, orderBy))
                  .map(n => {
                    // const isSelected = this.isSelected(n.id);
                    const isSelected = this.isSelected(n.name);
                    return (
                      //{/*<ListItem key={n.id}>*/}
                      <ListItem key={n.name}>
                        <Checkbox
                          // checked={this.state.checked}
                          //    checked={this.state[n.name]}
                          checked={isSelected}
                          //checked={this.props[n.name]}
                          // onChange={this.handleChange('checked')}
                          onChange={this.handleChange(n.name)}
                          // value="checked"
                          value={n.name}
                          selected={isSelected} // is this actually needed? - test removal
                          // onClick={event => this.handleClick(event, n.id)}
                          onClick={event => this.handleClick(event, n.name)}
                        />
                        {/*<Radio
                          checked={this.state.selectedValue === n.name}
                          onChange={this.handleChange(n.name)}
                          value={n.name}
                        />*/}
                        <ListItemText>{n.name}</ListItemText>
                      </ListItem>
                    );
                  })}
              </List>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default StateListMenu;
// export default withStyles(styles)(StateListMenu);
