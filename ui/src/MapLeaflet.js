import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import "./Map.css";
import { withStyles } from "@material-ui/core/styles";


import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';

import HeatmapLayer from 'react-leaflet-heatmap-layer/lib/HeatmapLayer';

import 'react-leaflet-markercluster/dist/styles.min.css';
import MarkerClusterGroup from 'react-leaflet-markercluster';

import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  root: {
    // width: 700,
    height: 400,
    // maxWidth: 700,
    // marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
    // margin: "auto"
  },
  list: {
    width: 250,
  },
  
});

class MapLeaf extends React.Component {
/*  constructor(props) {
    super(props);

    this.state = {
      lng: -98.5795, // center of US
      lat: 39.8283, //center of US
      zoom: 4,
      right: false,
      bridge_id: null,
      bridge_lat: null,
      bridge_lng: null,
      build_year: null,
      owned_by: null,
      maintained_by: null,

      //name: "AZ",
      name: "",
    };

  }*/
  constructor(props) {
    super(props);

    this.state = {
      lng: -98.5795, // center of US
      lat: 39.8283, //center of US
      zoom: 4,
      right: false,
      bridge_id: null,
      bridge_lat: null,
      bridge_lng: null,
      build_year: null,
      owned_by: null,
      maintained_by: null,

      //name: "AZ",
      //name: "",
    };

  }

  // componentWillReceiveProps(props) {
  //   this.setState({ name: props.name })
  // }

  toggleDrawer = (side, open, bridge) => () => {
    this.setState({
      [side]: open,
      bridge_name: bridge.name,
      bridge_id: bridge.id,
      bridge_lat: bridge.latitude_decimal,
      bridge_lng: bridge.longitude_decimal,
      build_year: bridge.yearbuilt
    });
  };

  render() {

    console.log("name is: " + this.props.name);

    const { classes } = this.props;
    
    const sideList = (
      <div className={classes.list}>
        <List >
          {/*<ListItem >
            <ListItemText >NAME: {this.state.bridge_name}</ListItemText>
          </ListItem>*/}
          <ListItem >
            <ListItemText >LAT: {this.state.bridge_lat}</ListItemText>
          </ListItem>
          <ListItem >
            <ListItemText >LONG: {this.state.bridge_lng}</ListItemText>
          </ListItem>
          <ListItem >
            <ListItemText >Build Year: {this.state.build_year}</ListItemText>
          </ListItem>
          <Divider />
          <ListItem >
            <ListItemText >Owned By: {/*{this.state.build_year}*/}</ListItemText>
          </ListItem>
          <ListItem >
            <ListItemText >Maintained By: {/*{this.state.build_year}*/}</ListItemText>
          </ListItem>
        </List>
      </div>
    );

    const position = [this.state.lat, this.state.lng];

    const myIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow
    });

    const { name } = this.state;
    //const { name } = this.props.name;
    //console.log("MapLeaflet.js: " + this.state.name);

    return (
      <Query
        query={gql`
          query statesPaginateQuery(
            $name: String
          )
          {
            State (name: $name){
              id
              bridges {
                id
                name
                latitude_decimal
                longitude_decimal
                yearbuilt
              }
            }
          }
        `}
        variables={{
          //name: this.state.name
          name: this.props.name
        }}
      >
      {/*<Query
        query={gql`
          {
            Bridge(first: 500) {
              id
              name
              latitude_decimal
              longitude_decimal
              yearbuilt
            }
          }
        `}
      >*/}
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error</p>

          return (

            <div>
              <Map center={position} zoom={this.state.zoom} maxZoom={18} className="absolute top right left bottom" >
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                <MarkerClusterGroup>
                {/*{data.Bridge*/}
                {/*{data.State.bridges
                  .slice()
                  .map(n => {
                    return (
                      
                      <Marker key={n.id} position={[n.latitude_decimal, n.longitude_decimal]} icon={myIcon} onClick={this.toggleDrawer('right', true,n)}>
                      </Marker>
                    
                      
                          );
                          })}*/}
                
                {data.State
                  .slice()
                  .map(b => {
                    return (
                      <div>
                      {b.bridges
                  .slice()
                  .map(n => {
                    return (
                      
                      <Marker key={n.id} position={[n.latitude_decimal, n.longitude_decimal]} icon={myIcon} onClick={this.toggleDrawer('right', true,n)}>
                      </Marker>
                    
                      
                          );
                          })}
                    
                      </div>
                          );
                          })}
                  </MarkerClusterGroup>
              </Map>

              {/*<Map center={position} zoom={this.state.zoom} className="absolute top right left bottom" >
                <HeatmapLayer
                  //blur={10.0}
                  //radius={10.0}
                  fitBoundsOnLoad
                  fitBoundsOnUpdate
                  points={data.Bridge}
                  longitudeExtractor={m => m['longitude_decimal']}
                  latitudeExtractor={m => m['latitude_decimal']}
                  intensityExtractor={m => 5.0} />
                <TileLayer
                  url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
              </Map>*/}

              <Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false, "")}>
                <div
                  tabIndex={0}
                  role="button"
                  onClick={this.toggleDrawer('right', false, "")}
                  onKeyDown={this.toggleDrawer('right', false, "")}
                >
                  <div className={classes.list}>
                  <List>
                    <ListItem>
                      <ListItemText>Bridge Info</ListItemText>
                    </ListItem>
                  </List>
                  <Divider />
                  {sideList}
                  </div>
                </div>
              </Drawer>
            </div>
          );
        }}
      </Query>
  
    );
    
  }
}

MapLeaf.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MapLeaf);
// export default Map;
