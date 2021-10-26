 
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { Dynamo } from "../../libs/Dynamo";
 
import {table_name} from "@libs/constants";
const deletePet= async (
  event
) => {
  let {id} = event.pathParameters;
  
  id = Number(id)
  
  const res = await Dynamo.deletePet(id,table_name).catch((err) => {
    console.log("error in Dynamo delete", err);
    return null;
  });
 

  if (!res) {
    return formatJSONResponse({ message: "Failed to delete the user(${ID})" });
  }

  return formatJSONResponse({ message: res });
};

export const main = middyfy(deletePet);