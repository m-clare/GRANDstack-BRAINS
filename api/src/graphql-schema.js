import { neo4jgraphql } from "neo4j-graphql-js";

export const typeDefs = `
type User {
  id: ID!
  name: String
  friends(first: Int = 10, offset: Int = 0): [User] @relation(name: "FRIENDS", direction: "BOTH")
  reviews(first: Int = 10, offset: Int = 0): [Review] @relation(name: "WROTE", direction: "OUT")
  avgStars: Float @cypher(statement: "MATCH (this)-[:WROTE]->(r:Review) RETURN toFloat(avg(r.stars))")
  numReviews: Int @cypher(statement: "MATCH (this)-[:WROTE]->(r:Review) RETURN COUNT(r)")
}

type Business {
  id: ID!
  name: String
  address: String
  city: String
  state: String
  reviews(first: Int = 10, offset: Int = 0): [Review] @relation(name: "REVIEWS", direction: "IN")
  categories(first: Int = 10, offset: Int =0): [Category] @relation(name: "IN_CATEGORY", direction: "OUT")
}

type Review {
  id: ID!
  stars: Int
  text: String
  business: Business @relation(name: "REVIEWS", direction: "OUT")
  user: User @relation(name: "WROTE", direction: "IN")
}

type Category {
  name: ID!
  businesses(first: Int = 10, offset: Int = 0): [Business] @relation(name: "IN_CATEGORY", direction: "IN")
}

type State {
  id: ID!
  name: String

  bridges: [Bridge] @cypher(statement: "MATCH (this)<-[:OF_STATE]-(:County)<-[:OF_COUNTY]-(:Place)<-[:OF_PLACE]-(bridge:Bridge) RETURN bridge")

  numCounties: Int @cypher(statement: "MATCH (this)<-[:OF_STATE]-(c:County) RETURN count(DISTINCT c)")
  numPlaces: Int @cypher(statement: "MATCH (this)<-[:OF_STATE]-(:County)<-[:OF_COUNTY]-(p:Place) RETURN count(DISTINCT p)")
  numBridges: Int @cypher(statement: "MATCH (this)<-[:OF_STATE]-(:County)<-[:OF_COUNTY]-(:Place)<-[:OF_PLACE]-(b:Bridge) RETURN count(DISTINCT b)")

  county: County @relation(name: "OF_STATE", direction: "IN")
}

type County {
  id: ID!
  name: String

  state: State @relation(name: "OF_STATE", direction: "OUT")
  place: Place @relation(name: "OF_COUNTY", direction: "IN")
}

type Place {
  id: ID!
  name: String

  county: County @relation(name: "OF_COUNTY", direction: "OUT")
  bridge: Bridge @relation(name: "OF_PLACE", direction: "IN")
}

type Bridge {
  id: ID!
  name: String
  latitude_decimal: Float
  longitude_decimal: Float
  yearbuilt: Int

  place: Place @relation(name: "OF_PLACE", direction: "OUT")

}

type Query {
    
  Bridge(id: ID, name: String, yearbuilt: Int): [Bridge]

  usersBySubstring(substring: String, first: Int = 10, offset: Int = 0): [User] @cypher(statement: "MATCH (u:User) WHERE u.name CONTAINS $substring RETURN u")
 
}
`;