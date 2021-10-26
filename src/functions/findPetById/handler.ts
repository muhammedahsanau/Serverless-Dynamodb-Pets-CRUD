 
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { Dynamo } from "../../libs/Dynamo";
 
import { table_name } from "@libs/constants";

const findPetById = async (
  event
) => {
  // getting id from path parameters
  let {id} = event.pathParameters;
  // converting id{string} into number
  id = Number(id)
  
  
  const pet = await Dynamo.findPetById(id, table_name).catch((err) => {
    console.log("error in Dynamo get", err);
    return null;
  });

  if (!pet) {
    return formatJSONResponse({ message: "the uer is not present in the table" });
  }
 //passing responce in formatJSONResponse to get 
  // the res with the success status code 
  return formatJSONResponse({ message: pet });
};

export const main = middyfy(findPetById);
