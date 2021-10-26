import { middyfy } from "@libs/lambda";
import { formatJSONResponse } from "@libs/apiGateway";
import { Dynamo } from "../../libs/Dynamo";
import { table_name } from "@libs/constants";
export const getUser = async (event) => {
  // console.log("event", event);
  var params = event.queryStringParameters ;
  //  console.log(params);
   let Limit = Number(params.limit )
   let Tags = params.tags
   
  //  console.log(Tags);
   

  const pets = await Dynamo.findPets(Limit,Tags,table_name).catch((err) => {
    console.log("there is an error from dynamo", err);
    return null;
  });

  if (!pets) {
    return formatJSONResponse({ message: "Failed to get all users" });
  }

  return formatJSONResponse({ message: pets });
};

export const main = middyfy(getUser);
