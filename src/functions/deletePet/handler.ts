 
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { Dynamo } from "../../libs/Dynamo";
 
import {table_name} from "@libs/constants";
const deletePet= async (
  event
) => {
  //getting pet id from pathParameters which we passed in the pathParameters
  let {id} = event.pathParameters;
  // the id is a string but we want a number 
  // so we are converting it into numbers
  id = Number(id)
  
  const res = await Dynamo.deletePet(id,table_name).catch((err) => {
    console.log("error in Dynamo delete", err);
    return null;
  });
 

  if (!res) {
    return formatJSONResponse({ message: "Failed to delete the user(${ID})" });
  }

  //passing responce in formatJSONResponse to get 
  // the res with the success status code 
  return formatJSONResponse({ message: res });
};

export const main = middyfy(deletePet);