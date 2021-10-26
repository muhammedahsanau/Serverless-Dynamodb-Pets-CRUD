import { middyfy } from "@libs/lambda";
import { formatJSONResponse } from "@libs/apiGateway";
import { Dynamo } from "../../libs/Dynamo";
import { table_name } from "@libs/constants";
export const getUser = async (event) => {
  //getting params object from queryststringParemater
  var params = event.queryStringParameters ;
 

  // storing limit (converting it into number as it is string)
  // and Tages from the params object
   let Limit = Number(params.limit )
   let Tags = params.tags
   
 
   

  const pets = await Dynamo.findPets(Limit,Tags,table_name).catch((err) => {
    console.log("there is an error from dynamo", err);
    return null;
  });
  //if pet is not stored we return a Failed status
  if (!pets) {
    return formatJSONResponse({ message: "Failed to get all users" });
  }
 //passing responce in formatJSONResponse to get 
  // the res with the success status code 
  return formatJSONResponse({ message: pets });
};

export const main = middyfy(getUser);
